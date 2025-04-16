import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getCartItems } from '../api/cart';
import { toast } from 'react-toastify'
import Loading from '../components/LoaderSpinner'
import axiosInstance from '../api/axios';
import { createCheckout, initiateRazorpayPayment } from '../api/Checkout';
import { Input } from 'antd';

import { useUser } from '../context/user.context'


const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, subtotal, shippingCost, total } = location.state || {};

  const [userCart, setUserCart] = useState(cartItems);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pinCode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [submitted, setSubmitted] = useState(false);

  const {user} = useUser();


  console.log(userId);
  

  useEffect(() => {
    
    if (!user) {
      toast.error('Please login to continue');
      navigate('/login');
      return;
    }

    try {
      setUserId(user._id);
    } catch (error) {
      toast.error('Session error. Please login again');
      navigate('/login');
    }
  }, [navigate]);

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

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!userId) {
        toast.error('Please login to continue');
        navigate('/login');
        return;
      }

      setLoading(true);
      setSubmitted(true);

      const inputFields = ['fullName', 'phone', 'addressLine1', 'city', 'state', 'pinCode'];
      inputFields.forEach(field => {
        document.querySelector(`input[name="${field}"]`).classList.remove('border-red-500');
      });

      let hasError = false;
      inputFields.forEach(field => {
        if (!address[field]) {
          hasError = true;
        }
      });

      if (hasError) {
        inputFields.forEach(field => {
          if (!address[field]) {
            document.querySelector(`input[name="${field}"]`).classList.add('border-red-500');
          }
        });
        toast.error('Please fill all required fields');
        return;
      }

      const checkoutData = {
        userId: userId,
        products: userCart.map(item => ({
          productId: item.product._id,
          quantity: item.quantity,
          color: item.color,
          size: item.size
        })),
        address,
        paymentMethod,
        totalPrice: total,
      };

      const checkoutResponse = await createCheckout(checkoutData);

    
      if (!checkoutResponse.checkout) {
        toast.error('Checkout object is missing in the response.');
        return;
      }

      const razorpayOrderId = checkoutResponse.checkout.razorpayOrderId; 
      if (!razorpayOrderId) {
        toast.error('Razorpay Order ID is missing.');
        return;
      }
      if (paymentMethod === 'COD') {
        toast.success('Order placed successfully with Cash on Delivery!');
        const token = localStorage.getItem('token');
        await axiosInstance.put(`/checkout/${razorpayOrderId}`, { status: 'Pending' },{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        navigate('/order-success', { state: { orderId: checkoutResponse.checkout._id } }); // Redirect to success page
        return;
      }
      const orderData = {
        amount: total * 100, 
        currency: "INR",
        receipt: `receipt_order_${checkoutResponse.checkout._id}`,
      };

      const razorpayResponse = await initiateRazorpayPayment(orderData);
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
        amount: razorpayResponse.amount,
        currency: razorpayResponse.currency,
        name: "Ecommerce",
        order_id: razorpayOrderId, 
        handler: async function (response) {
         
          const paymentData = {
            orderId: razorpayOrderId, 
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          };
          const token = localStorage.getItem('token');
          const verifyResponse = await axiosInstance.post('/checkout/verify-payment', paymentData,{
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if (verifyResponse.status === 200) {
            toast.success('Payment successful!');
            await axiosInstance.put(`/checkout/${razorpayOrderId}`, { status: 'Completed' },{
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            navigate('/order-success', { state: { orderId: checkoutResponse.checkout._id } }); 
          } else {
            toast.error('Payment verification failed.');
          }
        },
        prefill: {
          name: address.fullName,
          email: '', 
          contact: address.phone,
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error('Payment verification failed.');
    } finally {
      setLoading(false);
    }
  };


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
                key={item._id}
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
                    <p className="mt-1 font-bold flex items-center gap-2 text-xs text-blue-900">
                      Color:
                      <span
                        className="inline-block w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                        aria-label={`Color: ${item.color}`}
                      />
                    </p>
                    <p className="mt-1 text-xs f text-blue-900">Size: {item.size}</p>
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
                        <p className="text-sm">Rs. {item.product.discountedPrice}</p>
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
            <label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name *</label>
            <Input
              name="fullName"
              value={address.fullName}
              onChange={handleAddressChange}
              className={`mt-2 ${submitted && !address.fullName ? 'border-red-500' : ''}`}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number *</label>
            <Input
              name="phone"
              value={address.phone}
              onChange={handleAddressChange}
              className={`mt-2 ${submitted && !address.phone ? 'border-red-500' : ''}`}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="addressLine1" className="text-sm font-medium text-gray-700">Address Line 1 *</label>
            <Input
              name="addressLine1"
              value={address.addressLine1}
              onChange={handleAddressChange}
              className={`mt-2 ${submitted && !address.addressLine1 ? 'border-red-500' : ''}`}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="city" className="text-sm font-medium text-gray-700">City *</label>
            <Input
              name="city"
              value={address.city}
              onChange={handleAddressChange}
              className={`mt-2 ${submitted && !address.city ? 'border-red-500' : ''}`}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="state" className="text-sm font-medium text-gray-700">State *</label>
            <Input
              name="state"
              value={address.state}
              onChange={handleAddressChange}
              className={`mt-2 ${submitted && !address.state ? 'border-red-500' : ''}`}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="pinCode" className="text-sm font-medium text-gray-700">PIN Code *</label>
            <Input
              name="pinCode"
              value={address.pinCode}
              onChange={handleAddressChange}
              className={`mt-2 ${submitted && !address.pinCode ? 'border-red-500' : ''}`}
              required
            />
          </div>
        </div>
          </div>

          <hr className="my-6" />

          <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Payment Method</h2>
          <div>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg w-full"
            >
              <option value="COD">Cash on Delivery</option>
              <option value="UPI">Razor Pay</option>
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
          <img className='mt-2' src='https://cdn.dribbble.com/users/70521/screenshots/3278384/dribbbble.gif' />
          <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Processing...' : 'Confirm Order'}
        </button>
        
        </div>
      </div>
      
      
    </div>
  );
};

export default Checkout;
