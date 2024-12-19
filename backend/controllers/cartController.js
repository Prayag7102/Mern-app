const Cart = require('../models/Cart');
const Product = require('../models/Product');

const getCartItems = async (req, res) => {
  try {
    const userId = req.user.id; 
    const cart = await Cart.findOne({ user: userId }).populate('products.product');

    if (!cart) {
      return res.status(404).json({ message: 'Cart is empty.' });
    }
    res.status(200).json({ cartItems: cart.products });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};

const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity, color, size } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
    }

    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId && 
                item.color === (color || product.colors[0]) &&
                item.size === (size || product.sizes[0])
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity || 1;
    } else {
      cart.products.push({ 
        product: productId, 
        quantity: quantity || 1,
        color: color || product.colors[0],
        size: size || product.sizes[0]
      });
    }

    await cart.save();
    const populatedCart = await Cart.findById(cart._id).populate('products.product');
    res.status(200).json({ 
      message: 'Product added to cart successfully.',
      cart: populatedCart,
      totalPrice: populatedCart.totalPrice 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

const removeFromCart = async (req, res) => {
  const userId = req.user.id; 
  const { productId } = req.params; 

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }

    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart.' });
    }

    cart.products.splice(productIndex, 1);
    await cart.save();

    res.status(200).json({ message: 'Product removed from cart successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};

const updateCartItem = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;
  const { quantity, color, size } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }

    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart.' });
    }

    cart.products[productIndex].quantity = quantity;
    if (color) cart.products[productIndex].color = color;
    if (size) cart.products[productIndex].size = size;
    
    await cart.save();
    const populatedCart = await Cart.findById(cart._id).populate('products.product');

    res.status(200).json({ 
      message: 'Cart item updated successfully.',
      cart: populatedCart,
      totalPrice: populatedCart.totalPrice
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = {
  addToCart, 
  getCartItems,
  removeFromCart,
  updateCartItem
};
