import React from 'react'
import {  FaBars } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Nav = ({ onToggleSidebar }) => {


    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem("adminToken");
      toast.success("logout successfully!",{
        theme:'dark',
        draggable:true
      })
      navigate("/admin/login");
    };
    return (
        <div>
            <nav className="bg-white border-b border-gray-300">
                <div className="flex justify-between items-center px-9">
                    <button onClick={onToggleSidebar} className="lg:hidden">
                        <FaBars className='text-cyan-500 text-2xl' />
                    </button>
                    <div className="ml-1">
                        <img
                            src="https://www.emprenderconactitud.com/img/POC%20WCS%20(1).png"
                            alt="logo"
                            className="h-20 w-28"
                        />
                    </div>
                    <div className="space-x-4">
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 text-white py-2 px-6 rounded-lg mt-6"
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