import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import Nav from './admin-components/Nav';
import Sidebar from './admin-components/Sidebar';
export default function AdminLayout() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="  h-auto w-full">
      <div className='w-full'>
        <Nav onToggleSidebar={toggleSidebar} />
      </div>
      <div className="lg:flex ">
        <div className='sm:w-[25%] md:w-[18%] relative top-0 left-0'>
          <Sidebar isOpen={isSidebarOpen} />
        </div>
        <div className='bg-zinc-100 overflow-hidden  md:w-full sm:w-full lg:px-5 sm:px-2'>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}
