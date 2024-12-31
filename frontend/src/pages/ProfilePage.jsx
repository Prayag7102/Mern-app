import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { decodeToken } from '../api/Checkout';
import axiosInstance from '../api/axios';
import Loading from '../components/LoaderSpinner';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const username = localStorage.getItem("username");
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          toast.error('Please login to view orders');
          navigate('/login');
          return;
        }
        const decodedToken = decodeToken(token);
        if (!decodedToken?.id) {
          toast.error('Invalid session');
          navigate('/login');
          return;
        }

        const response = await axiosInstance.get('/checkout/orders');
        if (response.data.checkouts && response.data.checkouts.length > 0) {
          setOrders(response.data.checkouts);
          
        } else {
          setOrders([]);
          toast.info("No orders");
        }
      } catch (error) {
        if (error.response?.status === 404) {
          setOrders([]);
          toast.info("No orders found");
        } else {
          toast.error("Error fetching orders");
        }
      } finally {
        setLoading(false);
      }
    };
    //if (activeTab === 'orders' && orders.length === 0) {
      fetchOrderDetails();
    //}
  }, [ navigate, orders.length]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      <div className="bg-white shadow-xl pb-8">
        <div className="w-full h-[250px]">
          <img
            src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
            className="w-full h-full rounded-tl-lg rounded-tr-lg object-cover"
            alt="Profile Background"
          />
        </div>
        
        <div className="flex flex-col items-center -mt-20">
          <img
            src="https://avatar.iran.liara.run/public/boy?username=Ash"
            className="w-40 border-4 border-white rounded-full"
            alt="Profile"
          />
          <div className="flex items-center space-x-2 mt-2">
            <p className="text-2xl">{username || 'User'}</p>
            <span className="bg-blue-500 rounded-full p-1" title="Verified">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-white h-2.5 w-2.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={4}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 mx-2 rounded-t-lg ${
              activeTab === 'profile'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 mx-2 rounded-t-lg ${
              activeTab === 'orders'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Orders
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 mx-2 rounded-t-lg bg-red-500 text-white"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'orders' ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Order History</h2>
            
            {loading ? (
              <Loading />
            ) : orders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No orders found</p>
                <button
                  onClick={() => navigate('/')}
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order, orderIndex) => (
                  <div key={orderIndex} className="border rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Order #{order._id.slice(-6)}</p>
                        <p className="text-sm text-gray-500">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{order.totalPrice.toFixed(2)}</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                          order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-4 mt-6">
                      {order.products.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4 border-b pb-4">
                          <img
                            src={`http://localhost:5000/uploads/${item.productId.image}`}
                            alt={item.productId.name}
                            className="w-20 h-20 object-cover rounded"
                            onError={(e) => {
                              e.target.src = '/placeholder-image.jpg';
                            }}
                          />
                          <div className="flex-grow">
                            <h3 className="font-medium">{item.productId.name}</h3>
                            <p className="text-sm text-gray-500">
                              Quantity: {item.quantity}
                            </p>
                            <p className='text-xs text-black'><span className='font-bold'>Color:</span> {item.color}</p>
                            <p className='text-xs text-black'><span className='font-bold'>Size:</span> {item.size}</p>
                            <p className="text-sm font-medium">
                              Price: ₹{(item.productId.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-4 border-t">
                      <h4 className="font-medium mb-2">Delivery Address</h4>
                      <div className="text-sm text-gray-600">
                        <p className="font-medium">{order.address.fullName}</p>
                        <p>{order.address.addressLine1}</p>
                        {order.address.addressLine2 && <p>{order.address.addressLine2}</p>}
                        <p>{order.address.city}, {order.address.state} {order.address.pinCode}</p>
                        <p>Phone: {order.address.phone}</p>
                      </div>
                    </div>

                    {/* Payment Details */}
                    <div className="mt-6 pt-4 border-t">
                      <h4 className="font-medium mb-2">Payment Information</h4>
                      <div className="text-sm text-gray-600">
                        <p>Method: {order.paymentMethod}</p>
                        <p className="mt-2 font-medium">Total Amount: ₹{order.totalPrice.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
            <div className="space-y-4">
              <p className="text-gray-600">Username: {username}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}