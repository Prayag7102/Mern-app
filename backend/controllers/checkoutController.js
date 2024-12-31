const Product = require("../models/Product");
const Checkout = require('../models/Checkout.model');
const Razorpay = require("razorpay");
const crypto = require('crypto');

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create a new checkout
const createCheckout = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    const { userId: requestUserId, products, address, paymentMethod } = req.body;

    if (userId !== requestUserId) {
      return res.status(403).json({ message: "User ID mismatch." });
    }

    let totalPrice = 0;
    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product with ID ${item.productId} not found.` });
      }
      if (product.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: `Insufficient stock for product: ${product.name}.` });
      }
      const price = product.discountedPrice || product.price;
      totalPrice += price * item.quantity;
    }

    // Create Razorpay order first
    const options = {
      amount: totalPrice * 100, // Amount in paise
      currency: "INR",
      receipt: `receipt_order_${userId}`, // Use userId or any unique identifier
      payment_capture: 1 // Auto capture payment
    };

    const order = await razorpayInstance.orders.create(options); // Create order in Razorpay

    // Now create the checkout document
    const checkout = await Checkout.create({
      userId,
      products: products.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        color: item.color,
        size: item.size
      })),
      totalPrice,
      address: {
        fullName: address.fullName,
        phone: address.phone,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        city: address.city,
        state: address.state,
        pinCode: address.pinCode
      },
      paymentMethod,
      status: "Pending",
      razorpayOrderId: order.id // Store the Razorpay order ID here
    });

    console.log("Checkout created:", checkout);

    // Update product stock
    for (const item of products) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity },
      });
    }

    return res.status(201).json({ message: "Checkout successful.", checkout });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Get checkout details
const getCheckoutById = async (req, res) => {
  try {
    const userId = req.user.id;
    const checkouts = await Checkout.find({ userId })
      .populate({
        path: "products.productId",
        select: "name image price discountedPrice colors sizes"
      })
      .sort({ createdAt: -1 });

    if (!checkouts || checkouts.length === 0) {
      return res.status(404).json({ error: "No orders found for this user" });
    }
    res.status(200).json({ checkouts });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve order details", details: error.message });
  }
};


const getAllOrders = async (req, res) => {
  try {
    const orders = await Checkout.find()
      .populate({
        path: 'products.productId',
        select: 'name image price discountedPrice'
      })
      .populate({
        path: 'userId',
        select: 'name email'
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders", details: error.message });
  }
};

const verifyPayment = async (req, res) => {
  const { orderId, paymentId, signature } = req.body;

  // Log the orderId being used for verification
  console.log("Verifying payment for orderId:", orderId);

  // Construct the expected signature
  const body = orderId + "|" + paymentId;
  const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                                   .update(body.toString())
                                   .digest('hex');

  // Verify the signature
  if (expectedSignature === signature) {
    // Payment is verified
    try {
      // Find the checkout document using the Razorpay order ID
      const checkout = await Checkout.findOne({ razorpayOrderId: orderId.trim() }); // Use findOne to retrieve the checkout

      if (!checkout) {
        return res.status(404).json({ message: "Checkout not found." });
      }

      // Update the checkout status
      checkout.status = 'Completed'; // Update the status to 'Completed'
      await checkout.save(); // Save the updated checkout

      console.log("Checkout found and updated:", checkout); // Log the found and updated checkout

      return res.status(200).json({ message: "Payment verified successfully.", checkout });
    } catch (error) {
      console.error("Error updating checkout status:", error);
      return res.status(500).json({ message: "Failed to update checkout status.", details: error.message });
    }
  } else {
    // Payment verification failed
    return res.status(400).json({ message: "Payment verification failed." });
  }
};

module.exports = { getCheckoutById, createCheckout, getAllOrders, verifyPayment };
