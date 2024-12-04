const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addProduct = async (req, res) => {
  const { name, description, price, discountedPrice, stock } = req.body;
  const image = req.file ? req.file.filename : null; 
  if (!image) {
    return res.status(400).json({ message: "Image is required." });
  }
  const product = new Product({
    name,
    description,
    price,
    discountedPrice,
    stock,
    image,
  });

  try {
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
  const updates = req.body;

  let image = req.file ? req.file.filename : null;
  if (image) {
    updates.image = image; 
  }

  try {
    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getProducts, addProduct, deleteProduct, updateProduct };
