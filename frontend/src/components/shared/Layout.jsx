import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const Layout = () => {
  return (
    <>
      <div className="fixed top-5 flex justify-center w-full z-50">
        <Navbar />
      </div>
      <Outlet />
    </>
  )
}

export default Layout
