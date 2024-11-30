import React from 'react'
import { HiHome } from "react-icons/hi";
import { AiFillProduct } from "react-icons/ai";

const Sidebar = ({ isOpen }) => {
    return (
        <div>
            <div
                id="sidebar"
                className={`lg:block ${isOpen ? 'block' : 'hidden'} bg-white w-64 h-screen fixed rounded-none border-none`}
            >
                <div className="p-4 space-y-4">
                    <a
                        href="#"
                        aria-label="dashboard"
                        className="relative px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-sky-600 to-cyan-400"
                    >
                        <HiHome  className='text-white text-2xl'/>
                        <span className="-mr-1 font-medium">Dashboard</span>
                    </a>
                    <a
                        href="#"
                        className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group"
                    >
                        <AiFillProduct  className='text-black text-2xl'/>
                        <span>Add Products</span>
                    </a>
                </div>
            </div>

        </div>
    )
}

export default Sidebar