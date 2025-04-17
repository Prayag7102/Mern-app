import React from 'react'
import ProductsCard from './ProductsCard'
import SwiperBanner from './SwiperBanner'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getProducts } from '../api/products';
import { addToCart } from '../api/cart';
import { toast } from 'react-toastify';
import Loading from '../components/LoaderSpinner';
import { useUser } from '../context/user.context';
import { useCarts } from '../context/cart.context';


export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useUser();
  const { fetchCartItems  } = useCarts();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
  
        setProducts(productsData);
      } catch (error) {
        toast.error("Error fetching products:", error.message || error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    
    if (!user) {
      toast.error('You need to be logged in to add items to the cart.');
      return;
    }
    try {
      await addToCart(product.id, 1); 
      await fetchCartItems();
      toast.success("Product Add To Cart Successfully!",{
        theme:'dark',
        draggable:true
      })
    } catch (error) {
      toast.error('Error adding to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading/>;
  }
  return (
    <>
      <SwiperBanner/>
      <ProductsCard handleAddToCart={handleAddToCart} products={products} navigate={navigate}/>
    </>
  )
}
