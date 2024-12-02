import React from 'react'
import { HiHome } from "react-icons/hi";
import { AiFillProduct } from "react-icons/ai";
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {

    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    return (
        <div className='relative z-10'>
            <div
                id="sidebar"
                className={`lg:block ${isOpen ? 'block' : 'hidden'} bg-white w-64 h-screen fixed rounded-none border-none`}
            >
                <div className="p-4 space-y-4">
                    <Link
                        to="/admin/dashboard"
                        aria-label="dashboard"
                        className={`relative px-4 py-3 flex items-center space-x-4 rounded-lg ${isActive("/admin/dashboard")
                                ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400"
                                : "text-gray-500 group"
                            }`}
                    >
                        <HiHome className={`text-2xl ${isActive("/admin/dashboard") ? "text-white" : "text-black"}`} />
                        <span className={`${isActive("/admin/dashboard") ? "font-medium" : ""}`}>Dashboard</span>
                    </Link>
                    <Link
                        to="/admin/dashboard/addproducts"
                        className={`px-4 py-3 flex items-center space-x-4 rounded-lg ${isActive("/admin/dashboard/addproducts")
                                ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400"
                                : "text-gray-500 group"
                            }`}
                    >
                        <AiFillProduct className={`text-2xl ${isActive("/admin/dashboard/addproducts") ? "text-white" : "text-black"}`} />
                        <span className={`${isActive("/admin/dashboard/addproducts") ? "font-medium" : ""}`}>Add Products</span>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Sidebar