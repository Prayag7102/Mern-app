const express = require("express");
const { verifyToken, protect } = require("../middleware/authMiddleware");
const { createCheckout, getCheckoutById, getAllOrders, verifyPayment } = require("../controllers/checkoutController");
const Razorpay = require("razorpay"); 
const Checkout = require("../models/Checkout.model");

const router = express.Router();


const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, 
  key_secret: process.env.RAZORPAY_KEY_SECRET 
});


router.post("/", verifyToken, createCheckout);
router.get("/orders", verifyToken, getCheckoutById);
router.get("/all", protect, getAllOrders);


router.post("/razorpay/order", verifyToken, async (req, res) => {
  const { amount, currency, receipt } = req.body;

  const options = {
    amount, 
    currency,
    receipt,
    payment_capture: 1 
  };

  try {
    const order = await razorpayInstance.orders.create(options);
    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create Razorpay order." });
  }
});

router.post("/verify-payment", verifyToken, verifyPayment);

router.put("/:razorpayOrderId", verifyToken, async (req, res) => {
  const { razorpayOrderId } = req.params;
  const { status } = req.body;

  try {
    const updatedCheckout = await Checkout.findOneAndUpdate(
      { razorpayOrderId: razorpayOrderId },
      { status },
      { new: true }
    );
    if (!updatedCheckout) {
      return res.status(404).json({ message: "Checkout not found." });
    }
    res.status(200).json({ message: "Checkout status updated.", updatedCheckout });
  } catch (error) {
    res.status(500).json({ message: "Failed to update checkout status.", details: error.message });
  }
});

module.exports = router;