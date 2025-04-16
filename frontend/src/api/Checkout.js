import axiosInstance from './axios';

export const createCheckout = async (checkoutData) => {
  try {
    const response = await axiosInstance.post('/checkout', checkoutData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials:true
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const initiateRazorpayPayment = async (orderData) => {
  try {
    const response = await axiosInstance.post('/checkout/razorpay/order', orderData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials:true
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


  export const getAllOrders = async () => {
    try {
      const response = await axiosInstance.get('/checkout/all', {
        withCredentials:true
      });
      return response;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

  export const fetchOrderDetails = async () => {
    try {
      const response = await axiosInstance.get('/checkout/orders', {
        withCredentials:true
      });
      return response.data.checkouts || [];
    } catch (error) {
      if (error.response?.status === 404) {
        return [];
      }
      throw new Error('Error fetching orders');
    }
  };
