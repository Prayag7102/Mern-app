
import axiosInstance from "./axios";

export const getCartItems = async () => {
    try {
        const response = await axiosInstance.get('/cart/getCartItem', {
            withCredentials: true
        });

        return response.data.cartItems;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};


export const addToCart = async (productId, quantity = 1, color, size) => {
  
    try {
        const response = await axiosInstance.post('/cart/cart', 
            {
                productId,
                quantity,
                color,
                size
            },
            {
              headers: {
                  'Content-Type': 'application/json',
              },
              withCredentials: true
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


export const removeFromCart = async (cartItemId, productId) => {
    try {
      const response = await axiosInstance.delete(
        `/cart/remove/${cartItemId}/${productId}`,
        {
          withCredentials: true
        }
      );
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  };
  
export const updateCartItem = async (cartItemId, productId, quantity, color, size) => {
    try {
      const response = await axiosInstance.patch(
        `/cart/update/${cartItemId}/${productId}`,
        { 
          quantity,
          color,
          size 
        },
        {
          withCredentials: true
        }
      );
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  };