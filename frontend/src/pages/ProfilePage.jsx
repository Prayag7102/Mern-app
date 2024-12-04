

import React from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import { toast } from 'react-toastify';

export default function ProfilePage() {
  const navigate = useNavigate();


  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    toast.success("Logged out successfully!",{
      theme:'dark',
      draggable:true
    });
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div className='h-[100vh] w-full bg-zinc-500'>
        <Header />
        <h1 className='text-4xl text-center text-white'> Welcome, {username ? username : 'User'}!</h1>

        <button
          onClick={handleLogout}
          className='rounded-md py-3 px-4 bg-red-600 text-white'
        >
          Log Out
        </button>
    </div>
  );
}
