import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import OrderHistory from '../components/OrderHistory';
import ProfileInfo from '../components/ProfileInfo';
import { userOrders } from '../hooks/user.order';
import axiosInstance from '../api/axios';
import { useUser } from '../context/user.context';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { orders, loading } = userOrders();
  const {user, setUser} = useUser();
  const [activeTab, setActiveTab] = useState('profile');

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/users/logout", {}, { withCredentials: true });
      toast.success("Logged out successfully!");
      setUser(null);
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed!");
      console.error(error);
    }
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
            <p className="text-2xl">{user?.name || 'User'}</p>
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
          <OrderHistory orders={orders} loading={loading} navigate={navigate} />
        ) : (
          <ProfileInfo user={user} />
        )}
      </div>
    </div>
  );
}