import { useEffect } from 'react';
import { removeFromCart, updateCartItem } from '../api/cart';
import { toast } from 'react-toastify';
import { useCarts } from '../context/cart.context';

export const useCart = (updateSubtotal) => {
  const { cart, setCartItem, loading1, error } = useCarts();

  const handleRemoveItem = async (cartItemId, productId) => {
    try {
      await removeFromCart(cartItemId, productId);
      setCartItem(prev => prev.filter(item => item._id !== cartItemId));
      toast.success('Product removed from cart!', { theme: 'dark', draggable: true });
    } catch (error) {
      toast.error('Failed to remove product from cart.', { theme: 'dark', draggable: true });
    }
  };

  const handleQuantityChange = async (cartItemId, productId, change) => {
    const updatedCartItems = [...cart];
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
        updatedCartItems[itemIndex].size
      );
      setCartItem(updatedCartItems);
    } catch (error) {
      toast.error('Failed to update product quantity.', { theme: 'dark', draggable: true });
    }
  };

  useEffect(() => {
    const subtotal = cart.reduce((total, item) => 
      total + item.product.discountedPrice * item.quantity, 0);
    updateSubtotal(subtotal);
  }, [cart, updateSubtotal]);

  return {
    cartItems: cart,
    loading: loading1,
    error,
    handleRemoveItem,
    handleQuantityChange
  };
};
