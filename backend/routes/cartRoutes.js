const express = require('express');
const { addToCart,getCartItems  } = require('../controllers/cartController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Add product to cart
router.post('/cart',verifyToken, addToCart);
router.get('/getCartItem',verifyToken, getCartItems);

module.exports = router;
