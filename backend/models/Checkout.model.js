const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        color: {
          type: String,
          required: false,
          default: function() {
            return this.product.colors[0];
          }
        },
        size: {
          type: String,
          required: false,
          default: function() {
            return this.product.sizes[0];
          }
        }
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    address: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      addressLine1: { type: String, required: true },
      addressLine2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pinCode: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "UPI", "NetBanking", "Card"],
      default: "COD",
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Pending",
    },
    razorpayOrderId: { // Add this field to store Razorpay order ID
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model('checkoutmodel', checkoutSchema);
