import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { addToCart } from '../api/cart';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${id}`);
        setProduct(response.data);
        console.log(response)
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]); 

  const handleAddToCart = async (product) => {
    try {
      const data = await addToCart(product._id, 1); 
      toast.success("Product Add To Cart Successfully!",{
        theme:'dark',
        draggable:true
      })
    } catch (error) {
      toast.error('Error adding to cart:', error);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-12">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="flex justify-center">
          <img
            src={`http://localhost:5000/uploads/${product.image}`}
            alt={product.name}
            className="w-full max-w-lg object-cover"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="text-xl text-gray-600">{product.categories}</p>
          <p className="text-2xl font-semibold text-red-600">Rs.{product.price}</p>
          <p className='stroke-lime-100'>Rs.{product.discountedPrice}</p>

          {/* Product Description */}
          <p className="text-gray-700">{product.description}</p>
          <p className='text-gray-700'>{product.details}</p>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              className="w-16 p-2 border rounded-md"
              defaultValue={1}
              min={1}
            />
            <button onClick={()=>handleAddToCart(product)} className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
