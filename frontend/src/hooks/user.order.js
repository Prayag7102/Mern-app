import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchOrderDetails } from '../api/Checkout';

export const userOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const orders = await fetchOrderDetails();
        setOrders(orders.length > 0 ? orders : []);
        if (orders.length === 0) toast.info('No orders');
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getOrderDetails();
  }, [navigate]);

  return { orders, loading };
};