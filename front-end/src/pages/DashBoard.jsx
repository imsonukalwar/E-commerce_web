import Sidebar from '@/components/Sidebar'

import React from 'react'
import { Outlet } from 'react-router-dom'


const DashBoard = () => {
  return (
    <div className="flex min-h-screen bg-blue-50">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 md:ml-[280px] ml-0">

        <main
          className="
            mt-16
            p-4 md:p-6
            min-h-[calc(100vh-64px)]
            overflow-y-auto
            bg-gray-50

            pb-20 md:pb-6
          "
        >
          <Outlet />
        </main>

      </div>

    </div>
  );
};


export default DashBoard;
