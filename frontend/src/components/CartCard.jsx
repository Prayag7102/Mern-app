import React, { useState, useEffect } from 'react';
import { getCartItems, removeFromCart, updateCartItem } from '../api/cart';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const CartCard = ({ updateSubtotal }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCartItems();
        const validItems = data.filter(item => item.product && item.product._id);
        setCartItems(validItems);
      } catch (error) {
        toast.error('Error fetching cart.', { theme: 'dark', draggable: true });
      }
    };

    fetchCart();
  }, []);
  const handleRemoveItem = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.warning('You must be logged in to remove products from your cart.', {
        theme: 'dark',
        draggable: true
      });
      return;
    }

    try {
      await removeFromCart(productId, token);
      setCartItems(cartItems.filter(item => item.product._id !== productId));
      toast.success('Product removed from cart!', { theme: 'dark', draggable: true });
    } catch (error) {
      toast.error('Failed to remove product from cart.', { theme: 'dark', draggable: true });
    }
  };

  const handleQuantityChange = async (productId, change) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.warning('You must be logged in to change the quantity.', {
        theme: 'dark',
        draggable: true
      });
      return;
    }

    const updatedCartItems = [...cartItems];
    const itemIndex = updatedCartItems.findIndex(item => item.product._id === productId);

    if (itemIndex === -1) return;

    const newQuantity = updatedCartItems[itemIndex].quantity + change;
    if (newQuantity < 1) return;

    updatedCartItems[itemIndex].quantity = newQuantity;

    try {
      await updateCartItem(productId, newQuantity, token);
      setCartItems(updatedCartItems);
    } catch (error) {
      toast.error('Failed to update product quantity.', {
        theme: 'dark',
        draggable: true
      });
    }
  };

  useEffect(() => {
    const subtotal = cartItems.reduce((total, item) => {
      return total + item.product.discountedPrice * item.quantity;
    }, 0);
    updateSubtotal(subtotal); 
  }, [cartItems, updateSubtotal]);
  
  if (cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div>
      {cartItems.map((item) => (
        <div
          key={item.product._id}
          className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
        >
          <Link to={`/products/${item.product._id}`}>
            <img
              src={item.product.image ? `http://localhost:5000/uploads/${item.product.image}` : '/path/to/default-image.jpg'}
              alt={item.product.name}
              className="w-full rounded-lg sm:w-40"
            />
          </Link>
          <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div className="mt-5 sm:mt-0">
              <h2 className="text-lg font-bold text-gray-900">{item.product.name}</h2>
              <p className="mt-1 text-xs text-gray-700">{item.product.description}</p>
            </div>
            <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
              <div className="flex items-center border-gray-100">
                <button
                  onClick={() => handleQuantityChange(item.product._id, -1)}
                  className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                >
                  -
                </button>
                <input
                  className="h-8 w-8 border bg-white text-center text-xs outline-none"
                  type="number"
                  value={item.quantity}
                  min={1}
                  readOnly
                />
                <button
                  onClick={() => handleQuantityChange(item.product._id, 1)}
                  className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                >
                  +
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <div>
                  <p className="text-sm">Rs. {item.product.discountedPrice}</p>
                  <p className="text-lg mt-3">Total: Rs.{item.product.discountedPrice * item.quantity}</p>
                </div>
                <div>
                  <button
                    onClick={() => handleRemoveItem(item.product._id)}
                    className="remove_btn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  </div>
                </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartCard;
