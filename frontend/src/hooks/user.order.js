import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { decodeToken, fetchOrderDetails } from '../api/Checkout';

export const userOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');

        if (!token) {
          toast.error('Please login to view orders');
          navigate('/login');
          return;
        }

        const decodedToken = decodeToken(token);
        if (!decodedToken?.id) {
          toast.error('Invalid session');
          navigate('/login');
          return;
        }

        const orders = await fetchOrderDetails(token);
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