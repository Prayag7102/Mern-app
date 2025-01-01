const Product = require("../models/Product");
const Checkout = require('../models/Checkout.model');
const Razorpay = require("razorpay");
const crypto = require('crypto');

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

const createCheckout = async (req, res) => {
  try {
    const userId = req.user.id;
    const { products, address, paymentMethod, totalPrice } = req.body;


    const options = {
      amount: totalPrice * 100, 
      currency: "INR",
      receipt: `receipt_order_${userId}`, 
      payment_capture: 1 
    };

    const order = await razorpayInstance.orders.create(options); 
    const checkout = await Checkout.create({
      userId,
      products: products.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        color: item.color,
        size: item.size
      })),
      totalPrice,
      address,
      paymentMethod,
      status: "Pending",
      razorpayOrderId: order.id 
    });
    return res.status(201).json({ message: "Checkout successful.", checkout: { ...checkout._doc, razorpayOrderId: order.id } });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};


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
  const body = orderId + "|" + paymentId;
  const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                                   .update(body.toString())
                                   .digest('hex');


  if (expectedSignature === signature) {
    try {
      const checkout = await Checkout.findOne({ razorpayOrderId: orderId.trim() }); 

      if (!checkout) {
        return res.status(404).json({ message: "Checkout not found." });
      }
      checkout.status = 'Completed'; 
      await checkout.save(); 

      return res.status(200).json({ message: "Payment verified successfully.", checkout });
    } catch (error) {
      return res.status(500).json({ message: "Failed to update checkout status.", details: error.message });
    }
  } else {
    return res.status(400).json({ message: "Payment verification failed." });
  }
};

module.exports = { getCheckoutById, createCheckout, getAllOrders, verifyPayment };
