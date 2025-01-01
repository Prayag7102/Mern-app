const express = require("express");
const { verifyToken, protect } = require("../middleware/authMiddleware");
const { createCheckout, getCheckoutById, getAllOrders, verifyPayment } = require("../controllers/checkoutController");
const crypto = require("crypto"); // Import crypto for verification
const Razorpay = require("razorpay"); 
const Checkout = require("../models/Checkout.model");

const router = express.Router();

// Initialize Razorpay instance
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Ensure you have this in your environment variables
  key_secret: process.env.RAZORPAY_KEY_SECRET // Ensure you have this in your environment variables
});

// Route to create a new checkout
router.post("/", verifyToken, createCheckout);
router.get("/orders", verifyToken, getCheckoutById);
router.get("/all", protect, getAllOrders);

// Route to create Razorpay order
router.post("/razorpay/order", verifyToken, async (req, res) => {
  const { amount, currency, receipt } = req.body;

  const options = {
    amount, // Amount in paise
    currency,
    receipt,
    payment_capture: 1 // Auto capture payment
  };

  try {
    const order = await razorpayInstance.orders.create(options);
    return res.status(201).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create Razorpay order." });
  }
});

// Route to verify payment
router.post("/verify-payment", verifyToken, verifyPayment);

router.put("/:id", verifyToken, async (req, res) => {
  const { razorpayOrderId } = req.params;
  const { status } = req.body;

  try {
    console.log("Updating checkout with razorpayOrderId:", razorpayOrderId);
    const updatedCheckout = await Checkout.findOneAndUpdate(
      { razorpayOrderId: razorpayOrderId },
      { status },
      { new: true }
    );
    console.log(updatedCheckout);
    if (!updatedCheckout) {
      return res.status(404).json({ message: "Checkout not found." });
    }
    res.status(200).json({ message: "Checkout status updated.", updatedCheckout });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update checkout status.", details: error.message });
  }
});

module.exports = router;