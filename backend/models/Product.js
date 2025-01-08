const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountedPrice: { type: Number, required: true },
  stock: { type: Number, default: 0, require:true },
  image: { type: String },
  otherImages:[{type:String}],
  categories: [{ type: String, required: true }],
  tags: [{ type: String }],
  brand: { type: String, required:true },
  rating: { type: Number, default: 0 },
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      rating: { type: Number, required: true, min: 1, max: 5 },
      comment: { type: String, required: true },
      date: { type: Date, default: Date.now },
    },
  ],
  colors: [{ type:String }],
  sizes: [String],
  features: [String],
  details: { type: String },
  specifications: {
    weight: { type: String },
    dimensions: { type: String },
    material: { type: String },
    other: { type: String },
  },
  status: { type: String, default: "active" },
  createdAt: { type: Date, default: Date.now },
});

productSchema.virtual("imageUrl").get(function() {
  return this.image
    ? `http://localhost:5000/uploads/${this.image}`
    : 'http://localhost:5000/uploads/1733290002876-31MZVlSW1KL._SY445_SX342_QL70_FMwebp_.webp';
});

productSchema.virtual("otherImagesUrls").get(function() {
  return this.otherImages && this.otherImages.length > 0
    ? this.otherImages.map(image => `http://localhost:5000/uploads/${image}`)
    : [
        'http://localhost:5000/uploads/1733290002876-31MZVlSW1KL._SY445_SX342_QL70_FMwebp_.webp'
      ];
});

module.exports = mongoose.model("Product", productSchema);
