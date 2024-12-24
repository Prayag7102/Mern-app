const express = require("express");
const { verifyToken, protect } = require("../middleware/authMiddleware");
const { createCheckout, getCheckoutById, getAllOrders } = require("../controllers/checkoutController");

const router = express.Router();

// Route to create a new checkout
router.post("/", verifyToken, createCheckout);
router.get("/orders", verifyToken, getCheckoutById);
router.get("/all", protect, getAllOrders);

module.exports = router;