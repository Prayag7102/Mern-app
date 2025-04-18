import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../api/axios';
import { addToCart } from '../api/cart';
import { useUser } from '../context/user.context';
import { useCarts } from '../context/cart.context';

export const useProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);


  const {user} = useUser();
  const {fetchCartItems} = useCarts();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get(`/products/${id}`);
      setProduct(response.data);
      setSelectedColor(response.data.colors[0]);
      setSelectedSize(response.data.sizes[0] || null);
    } catch (error) {
      toast.error('Error fetching product details.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('You need to be logged in to add items to the cart.');
      return;
    }

    if (!selectedColor) {
      toast.error('Please select both color and size');
      return;
    }

    try {
      await addToCart(product._id, quantity, selectedColor, selectedSize);

      toast.success('Product added to cart successfully!', { theme: 'dark' });
      await fetchCartItems(); 
    } catch (error) {
      toast.error(typeof error === 'string' ? error : 'Failed to add product to cart.');
    }
  };

  const handleColorSelect = (color) => setSelectedColor(color);
  const handleSizeSelect = (size) => setSelectedSize(size);
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product?.stock) {
      setQuantity(value);
    }
  };

  return {
    product,
    setProduct,
    selectedColor,
    selectedSize,
    quantity,
    loading,
    handleColorSelect,
    handleSizeSelect,
    handleQuantityChange,
    handleAddToCart,
    refreshProduct: fetchProduct,
  };
}; 