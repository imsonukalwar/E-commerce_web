import Sidebar from '@/components/Sidebar'

import React from 'react'
import { Outlet } from 'react-router-dom'

const DashBoard = () => {
  return (
    <div className='flex'>
    <Sidebar/>
    <Outlet/>
    </div>
  )
}

export default DashBoard
