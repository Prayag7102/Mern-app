import { useState, useEffect } from 'react';
import { getAllOrders } from '../api/Checkout';

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

 

  useEffect(() => {
    const total = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    setTotalAmount(total);
  }, [orders]);

  const fetchOrders = async () => {
    try {
      const response = await getAllOrders();
      setOrders(response.orders || []);
      setError(null);
    } catch (error) {
      setError(error.response?.data.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  return { orders, loading, error, totalAmount };
};