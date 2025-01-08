require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db'); 
const Product = require('../models/Product'); 

const setProductInactive = async () => {
  try {
    await connectDB(); 

    
    const products = await Product.find().limit(2); 
    if (products.length > 1) {
      const secondProduct = products[1];
      secondProduct.status = "inactive";
      await secondProduct.save();
      console.log(`Product with ID ${secondProduct._id} set to inactive.`);
    } else {
      console.log("Less than two products found.");
    }
  } catch (error) {
    console.error("Error updating product status:", error);
  } finally {
    mongoose.connection.close();
  }
};

setProductInactive();