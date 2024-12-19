import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getCartItems } from '../api/cart';
import { toast } from 'react-toastify'
import Loading from '../components/LoaderSpinner'


const Checkout = () => {
  const location = useLocation();
  const { cartItems, subtotal, shippingCost, total } = location.state || {}; 

  const [userCart, setUserCart] = useState(cartItems);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      setLoading(true);
      getCartItems()
        .then((items) => {
          setUserCart(items);
        })
        .catch((error) => {
          toast.error('Error fetching cart items:', error);
        })
        .finally(() => setLoading(false));
    }
  }, [cartItems]);

  if (loading) {
    return <Loading/>;
  }

  if (!userCart || userCart.length === 0) {
    return <div>No cart items found. Please add items to your cart.</div>;
  }

  return (
    <div className="h-auto bg-gray-100 lg:p-20 md:p-12 sm:p-5 xxs:p-3">
      <Link to="/profile/cart" className='bg-blue-400 px-3 py-1 rounded text-white font-bold'>Back To Cart</Link>
      <h1 className="mb-10 text-center text-2xl font-bold">Checkout</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          <div>
            {userCart.map((item) => (
              <div
                key={item.product._id}
                className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
              >
                <img
                  src={item.product.image ? `http://localhost:5000/uploads/${item.product.image}` : '/path/to/default-image.jpg'}
                  alt={item.product.name}
                  className="w-full rounded-lg sm:w-40"
                />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">{item.product.name}</h2>
                    <p className="mt-1 text-xs text-gray-700">{item.product.description}</p>
                    <p className="mt-1 text-xs font-bold text-blue-900">{item.color}</p>
                    <p className="mt-1 text-xs font-bold text-blue-900">{item.size}</p>
                  </div>
                  <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-100">
                      <input
                        className="h-8 w-8 border bg-white text-center text-xs outline-none"
                        type="number"
                        value={item.quantity}
                        min={1}
                        readOnly
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="text-sm">Rs. {item.discountedPrice}</p>
                        <p className="text-lg mt-3">Total: Rs.{item.product.discountedPrice * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <hr className="my-6" />
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Shipping Address</h2>
            <div className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name</label>
                <input id="fullName" type="text" className="mt-2 p-3 border border-gray-300 rounded-lg" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="address" className="text-sm font-medium text-gray-700">Address</label>
                <input id="address" type="text" className="mt-2 p-3 border border-gray-300 rounded-lg" />
              </div>
            </div>
          </div>

          <hr className="my-6" />

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Payment Method</h2>
            <div>
              <select className="p-3 border border-gray-300 rounded-lg">
                <option value="COD">Cash on Delivery</option>
                <option value="UPI">UPI</option>
                <option value="Card">Credit/Debit Card</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">Rs.{subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">Rs.{shippingCost.toFixed(2)}</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">Rs.{total.toFixed(2)}</p>
              <p className="text-sm text-gray-700">including GST</p>
            </div>
          </div>
          <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
