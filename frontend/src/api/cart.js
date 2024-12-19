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

        return response.data.cartItems;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};


export const addToCart = async (cartItem) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('You must be logged in to add products to your cart!');
    }

    try {
        const response = await axiosInstance.post('/cart/cart', 
            cartItem,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else if (error.request) {
            throw new Error('No response received from server');
        } else {
            throw new Error('Error setting up request');
        }
    }
};


export const removeFromCart = async (productId, token) => {
    try {
      const response = await axiosInstance.delete(
        `/cart/remove/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  };
  
  export const updateCartItem = async (productId, quantity, color, size, token) => {
    try {
      const response = await axiosInstance.patch(
        `/cart/update/${productId}`,
        { 
          quantity,
          color,
          size 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  };