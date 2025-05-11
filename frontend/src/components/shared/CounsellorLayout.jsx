import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar';

const CounsellorLayout = () => {
  return (
    <> 
      <Outlet />
    </>
  )
}

export default CounsellorLayout;
