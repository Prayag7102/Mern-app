import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/products';
import { addToCart } from '../api/cart';
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../components/LoaderSpinner';

const ProductsCard = ({products,handleAddToCart,navigate}) => {
  return (
    <div className='mb-5 mt-5 '>
      <h1 className='text-3xl text-center mb-5 text-blue-700 font-semibold'>
        New Products
      </h1>
      <div className="flex flex-wrap justify-center gap-5 items-center px-3">
        {products.length === 0 ? (
          <div className="col-span-full text-center p-5 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl text-gray-700 font-semibold">
              No Products Available
            </h2>
            <p className="text-gray-500 mt-2">
              It seems like there are no products available right now. Please check back later.
            </p>
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
            >
              <Link to={`/products/${product._id}`} className="relative mx-3 mt-3 h-64 overflow-hidden rounded-xl" >
                <img
                  className="object-cover h-64 w-full"
                  src={product.image ? `http://localhost:5000/uploads/${product.image}` : "https://via.placeholder.com/150"}
                  alt="product image"
                />
                {product.discount && (
                  <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                    {product.discount}% OFF
                  </span>
                )}
              </Link>
              <div className="mt-4 px-3 pb-5">
                <a href="#">
                  <h5 className="text-xl tracking-tight text-slate-900">{product.name}</h5>
                  <h6 className='text-sm text-blue-900 font-semibold'>{product.brand}</h6>
                </a>
                <div className="mt-2 mb-5 flex items-center justify-between">
                  <p>
                    <span className="text-3xl font-bold text-slate-900">Rs.{product.discountedPrice}</span>
                    <span className="text-sm text-slate-900 line-through">Rs.{product.price}</span>
                  </p>
                </div>
                <div className='flex flex-wrap gap-3 xxs:justify-center xs:items-center'>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-5 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Add to cart
                  </button>
                  <button onClick={()=> navigate(`/products/${product._id}`)}  className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                      View Details 
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductsCard;
