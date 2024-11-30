import React from 'react'
import { FaUser,FaBell ,FaBars  } from "react-icons/fa";

const Nav = ({ onToggleSidebar }) => {
    return (
        <div>
            <nav className="bg-white border-b border-gray-300">
                <div className="flex justify-between items-center px-9">
                    <button onClick={onToggleSidebar}   className="lg:hidden">
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
                        <button>
                            <span className='text-2xl text-cyan-500 '><FaBell  /></span>
                        </button>
                        <button>
                            <span className='text-2xl text-cyan-500'><FaUser /></span>
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Nav