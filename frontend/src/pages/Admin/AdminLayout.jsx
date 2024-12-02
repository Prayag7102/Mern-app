import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import Nav from './admin-components/Nav';
import Sidebar from './admin-components/Sidebar';
export default function AdminLayout() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className=" bg-zinc-100 w-full">
      <div className='w-full'>
        <Nav onToggleSidebar={toggleSidebar} />
      </div>
      <div className="lg:flex lg:gap-40">
        <div className='lg:w-[10%]'>
          <Sidebar isOpen={isSidebarOpen} />
        </div>
        <div className='lg:w-[90%] md:w-full sm:w-full px-5'>
          <Outlet/>
         
        </div>
      </div>
    </div>
  )
}
