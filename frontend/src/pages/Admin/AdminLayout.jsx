import React from 'react'
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the admin token from localStorage
    localStorage.removeItem("adminToken");
    toast.success("logout successfully!")
    navigate("/admin/login");
  };
  return (
    <div className="h-screen w-full bg-zinc-500">
      <div className="flex justify-center items-center">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-2 px-6 rounded-lg mt-6"
        >
          Log Out
        </button>
      </div>
    </div>
  )
}
