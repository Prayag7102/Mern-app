import React from 'react'
import Header from '../components/Header'
import ProductsCard from './ProductsCard'
import SwiperBanner from './SwiperBanner'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getProducts } from '../api/products';
import { addToCart } from '../api/cart';
import { toast } from 'react-toastify';
import Loading from '../components/LoaderSpinner';


export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        const filteredData = productsData.map((data) => ({
          id: data._id,
          name: data.name,
          image: data.image,
          discountedPrice: data.discountedPrice,
          price: data.price,
          brand: data.brand,
        }));
  
        setProducts(filteredData);
      } catch (error) {
        toast.error("Error fetching products:", error.message || error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product._id, 1); 
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
