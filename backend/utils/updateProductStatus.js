require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db'); // Adjust the path as necessary
const Product = require('../models/Product'); // Adjust the path as necessary

const updateProductsStatus = async () => {
  try {
    await connectDB(); // Use your existing connection logic
    await Product.updateMany({ status: { $exists: false } }, { $set: { status: "active" } });
    console.log("Updated products to have active status.");
  } catch (error) {
    console.error("Error updating products:", error);
  } finally {
    mongoose.connection.close();
  }
};

updateProductsStatus()