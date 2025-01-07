import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const OrderSuccess = () => {
    const location = useLocation();
    const { orderId } = location.state || {};
  return (
    <div>
       <div className='flex items-center justify-center flex-col'>
            <img src='https://cdn.dribbble.com/users/2185205/screenshots/7886140/media/90211520c82920dcaf6aea7604aeb029.gif' />
            <h1 className='text-center text-3xl text-blue-600'>Your order #{orderId?.slice(-6)} has been plased successfully.</h1>
        <p className='text-center text-lg text-gray-700 mt-4'>Thank you for your purchase! Want to buy more?</p>
        <Link to="/" className='mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600'>
            Continue Shopping
        </Link>
       </div>

    </div>
  )
}

export default OrderSuccess