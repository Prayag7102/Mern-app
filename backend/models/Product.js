const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountedPrice: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  image: { type: String }, 
});

productSchema.virtual("imageUrl").get(function() {
  return this.image ? `http://localhost:5000/uploads/${this.image}` : null;  // Generate the full URL
});

module.exports = mongoose.model("Product", productSchema);
