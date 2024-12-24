import { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    const total = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    setTotalAmount(total);
  }, [orders]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('admintoken');
      const response = await axiosInstance.get('/checkout/all', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOrders(response.data.orders || []);
      setError(null);
    } catch (error) {
      setError(error.response?.data.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  return { orders, loading, error, totalAmount };
};