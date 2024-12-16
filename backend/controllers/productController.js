const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("reviews.user", "name _id"); 
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("reviews.user", "name _id");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addProduct = async (req, res) => {

  const {
    name,
    description,
    price,
    discountedPrice,
    stock,
    categories,
    tags,
    brand,
    colors,
    sizes,
    features,
    details,
    specifications,
  } = req.body;

  const image = req.files?.image?.[0]?.filename || null;

  if (!image) {
    return res.status(400).json({ message: "Main image is required." });
  }

  // Extract otherImages filenames
  const otherImages = req.files?.otherImages?.map((file) => file.filename) || [];

  try {
    const product = new Product({
      name,
      description,
      price,
      discountedPrice,
      stock,
      image,
      otherImages, // Save filenames in the array
      categories,
      tags,
      brand,
      colors,
      sizes,
      features,
      details,
      specifications,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
    res.status(500).json({ message: "Error creating product" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updates = { ...req.body };

  try {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid product ID format." });
    }

    if (req.files && req.files.image) {
      const image = req.files.image[0].filename;
      updates.image = `${image}`;
    }

    if (req.files && req.files.otherImages) {
      const otherImages = req.files.otherImages.map((file) => `/uploads/${file.filename}`);
      updates.otherImages = otherImages;
    }

    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    updates.reviews = existingProduct.reviews;

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Failed to update product.", error: error.message });
  }
};


const addReview = async (req, res) => {
  const { id } = req.params; // Product ID
  const { rating, comment } = req.body; // Get rating and comment from request body

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const review = {
      user: req.user.id, // Use the user ID from the token
      rating,
      comment,
      date: new Date(),
    };

    product.reviews.push(review);
    const totalReviews = product.reviews.length;
    const totalRating = product.reviews.reduce((sum, r) => sum + r.rating, 0);
    let averageRating = totalRating / totalReviews;
    product.rating = averageRating.toFixed(2);

    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const editReview = async (req, res) => {
  const { id, reviewId } = req.params; // Product ID and Review ID
  const { rating, comment } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const review = product.reviews.id(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only edit your own reviews." });
    }

    review.rating = rating;
    review.comment = comment;
    review.date = new Date();

    // Recalculate the overall rating
    const totalReviews = product.reviews.length;
    const totalRating = product.reviews.reduce((sum, r) => sum + r.rating, 0);
    product.rating = totalRating / totalReviews;

    await product.save();

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteReview = async (req, res) => {
  const { id, reviewId } = req.params; 

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const review = product.reviews.id(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only delete your own reviews." });
    }

    product.reviews.pull(reviewId);
    const totalReviews = product.reviews.length;
    const totalRating = product.reviews.reduce((sum, r) => sum + r.rating, 0);
    product.rating = totalReviews > 0 ? totalRating / totalReviews : 0;

    await product.save();

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getProducts, addProduct, deleteProduct, updateProduct, addReview,deleteReview,editReview,getProductById };
