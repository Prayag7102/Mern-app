import React from 'react'
import {  FaBars } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAdmin } from '../../../context/admin.context';
import axiosInstance from '../../../api/axios';

const Nav = ({ onToggleSidebar }) => {

    const {admin, setAdmin} = useAdmin();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
          await axiosInstance.post("/admin/logout", {}, { withCredentials: true });
          toast.success("Logged out successfully!");
          setAdmin(null);
          navigate("/admin/login");
        } catch (error) {
          toast.error("Logout failed!");
          console.error(error);
        }
      };
    return (
        <div>
            <nav className="bg-white border-b border-gray-300">
                <div className="flex justify-between items-center px-9">
                    <button onClick={onToggleSidebar} className="lg:hidden">
                        <FaBars className='text-cyan-500 text-2xl' />
                    </button>
                    <div className="ml-1">
                        <h4 className='text-2xl font-bold '>{admin.username}</h4>
                    </div>
                    <div className="space-x-4">
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 text-white py-2 px-6 rounded-lg mt-3 mb-3"
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Nav