import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getCartItems } from '../api/cart';
import { toast } from 'react-toastify'
import Loading from '../components/LoaderSpinner'
import axiosInstance from '../api/axios';
import { createCheckout, initiateRazorpayPayment } from '../api/Checkout';


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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to continue');
      navigate('/login');
      return;
    }

    try {
      // Decode token
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decodedToken = JSON.parse(window.atob(base64));
      
      if (!decodedToken.id) {
        toast.error('Invalid session. Please login again');
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }

      setUserId(decodedToken.id);
    } catch (error) {
      toast.error('Session error. Please login again');
      localStorage.removeItem('token');
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
      
      // Validation checks
      if (!address.fullName || !address.phone || !address.addressLine1 || 
          !address.city || !address.state || !address.pinCode) {
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

      const response = await createCheckout(checkoutData);
      console.log("Response from createCheckout:", response); // Log the response

      // Ensure the response contains the checkout object
      if (!response.checkout) {
        toast.error('Checkout object is missing in the response.');
        return;
      }

      // Access the generated razorpayOrderId
      const razorpayOrderId = response.checkout.razorpayOrderId; // Get the generated razorpayOrderId

      // Initiate Razorpay payment
      const orderData = {
        amount: total * 100, // Amount in paise
        currency: "INR",
        receipt: `receipt_order_${response.checkout._id}`,
      };

      const razorpayResponse = await initiateRazorpayPayment(orderData);
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Your Razorpay key ID
        amount: razorpayResponse.amount,
        currency: razorpayResponse.currency,
        name: "Ecommerce",
        order_id: razorpayOrderId, // Use the generated razorpayOrderId
        handler: async function (response) {
          // Prepare payment data using the generated razorpayOrderId
          const paymentData = {
            orderId: razorpayOrderId, // Use the generated razorpayOrderId
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          };

          // Send payment data for verification
          const verifyResponse = await axiosInstance.post('/checkout/verify-payment', paymentData);
          if (verifyResponse.status === 200) {
            toast.success('Payment successful!');
            // Update the checkout status to completed
            await axiosInstance.put(`/checkout/${razorpayOrderId}`, { status: 'Completed' });
            navigate('/order-success', { state: { orderId: razorpayOrderId } }); // Use the correct order ID
          } else {
            toast.error('Payment verification failed.');
          }
        },
        prefill: {
          name: address.fullName,
          email: '', // Add email if available
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
                    <p className="mt-1 text-xs f text-blue-900">Color: {item.color}</p>
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
            <input
              name="fullName"
              value={address.fullName}
              onChange={handleAddressChange}
              className="mt-2 p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number *</label>
            <input
              name="phone"
              value={address.phone}
              onChange={handleAddressChange}
              className="mt-2 p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="addressLine1" className="text-sm font-medium text-gray-700">Address Line 1 *</label>
            <input
              name="addressLine1"
              value={address.addressLine1}
              onChange={handleAddressChange}
              className="mt-2 p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="city" className="text-sm font-medium text-gray-700">City *</label>
            <input
              name="city"
              value={address.city}
              onChange={handleAddressChange}
              className="mt-2 p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="state" className="text-sm font-medium text-gray-700">State *</label>
            <input
              name="state"
              value={address.state}
              onChange={handleAddressChange}
              className="mt-2 p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="pinCode" className="text-sm font-medium text-gray-700">PIN Code *</label>
            <input
              name="pinCode"
              value={address.pinCode}
              onChange={handleAddressChange}
              className="mt-2 p-3 border border-gray-300 rounded-lg"
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
