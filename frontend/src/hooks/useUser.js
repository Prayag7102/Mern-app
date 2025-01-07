import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getUserFromToken } from '../utils/HelperFunction';

export const useUser = () => {
  const [user, setUser] = useState({});
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchUser = async () => {
      try {
        const userData = await getUserFromToken(token);
        setUser(userData);
      } catch (error) {
        toast.error('Error fetching user:', error);
      }
    };
    if (token) {
      fetchUser();
    }
  }, []);

  return user;
}; 