import React from 'react'
import ProductsCard from './ProductsCard'
import SwiperBanner from './SwiperBanner'
import { useNavigate } from 'react-router-dom'
import { addToCart } from '../api/cart';
import { toast } from 'react-toastify';
import Loading from '../components/LoaderSpinner';
import { useUser } from '../context/user.context';
import { useCarts } from '../context/cart.context';
import { useProducts } from '../context/product.context';


export default function HomePage() {


  const {products , loading1} = useProducts();

  
  const { user } = useUser();
  const { fetchCartItems  } = useCarts();
  const navigate = useNavigate();

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
    }
  };

  if (loading1) {
    return <Loading/>;
  }
  return (
    <>
      <SwiperBanner/>
      <ProductsCard handleAddToCart={handleAddToCart} products={products} navigate={navigate}/>
    </>
  )
}
