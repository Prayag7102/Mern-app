const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const { createCheckout, getCheckoutById } = require("../controllers/checkoutController");

const router = express.Router();

// Route to create a new checkout
router.post("/", verifyToken, createCheckout);
router.get("/orders", verifyToken, getCheckoutById);

module.exports = router;