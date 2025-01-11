import { useState, useEffect } from 'react';
import { getCartItems, removeFromCart, updateCartItem } from '../api/cart';
import { toast } from 'react-toastify';

export const useCart = (updateSubtotal) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const data = await getCartItems();
      const validItems = data.filter(item => item.product && item.product._id);
      setCartItems(validItems);
    } catch (error) {
      toast.error('Error fetching cart.', { theme: 'dark', draggable: true });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (cartItemId, productId) => {
    const token = localStorage.getItem('token');
    if (!checkAuth(token)) return;

    try {
      await removeFromCart(cartItemId, productId, token);
      setCartItems(cartItems.filter(item => item._id !== cartItemId));
      toast.success('Product removed from cart!', { theme: 'dark', draggable: true });
    } catch (error) {
      toast.error('Failed to remove product from cart.', { theme: 'dark', draggable: true });
    }
  };

  const handleQuantityChange = async (cartItemId, productId, change) => {
    const token = localStorage.getItem('token');
    if (!checkAuth(token)) return;

    const updatedCartItems = [...cartItems];
    const itemIndex = updatedCartItems.findIndex(item => item._id === cartItemId);
    if (itemIndex === -1) return;

    const newQuantity = updatedCartItems[itemIndex].quantity + change;
    if (newQuantity < 1) return;

    updatedCartItems[itemIndex].quantity = newQuantity;

    try {
      await updateCartItem(
        cartItemId,
        productId, 
        newQuantity,
        updatedCartItems[itemIndex].color,
        updatedCartItems[itemIndex].size,
        token
      );
      setCartItems(updatedCartItems);
    } catch (error) {
      toast.error('Failed to update product quantity.', { theme: 'dark', draggable: true });
    }
  };

  const checkAuth = (token) => {
    if (!token) {
      toast.warning('You must be logged in to perform this action.', {
        theme: 'dark',
        draggable: true
      });
      return false;
    }
    return true;
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    const subtotal = cartItems.reduce((total, item) => 
      total + item.product.discountedPrice * item.quantity, 0);
    updateSubtotal(subtotal);
  }, [cartItems, updateSubtotal]);

  return { cartItems, loading, handleRemoveItem, handleQuantityChange };
}; 