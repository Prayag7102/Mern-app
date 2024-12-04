const Cart = require('../models/Cart');
const Product = require('../models/Product');



const getCartItems = async (req, res) => {
  try {
    const userId = req.user.id; // Get the user ID from the request's user (assumes middleware added)

    // Find the cart for the logged-in user
    const cart = await Cart.findOne({ user: userId }).populate('products.product');

    if (!cart) {
      return res.status(404).json({ message: 'Cart is empty.' });
    }

    // Return the cart data along with populated product information
    res.status(200).json({ cartItems: cart.products });
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

const addToCart = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
    }

    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity || 1;
    } else {
      cart.products.push({ product: productId, quantity: quantity || 1 });
    }

    await cart.save();
    res.status(200).json({ message: 'Product added to cart successfully.', cart });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = {
  addToCart, 
  getCartItems
};
