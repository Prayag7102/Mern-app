

import axiosInstance from "./axios";

export const getCartItems = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('You need to be logged in to view your cart.');
    }

    const response = await axiosInstance.get('/cart/getCartItem', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.cartItems;  // Return the cart items
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
