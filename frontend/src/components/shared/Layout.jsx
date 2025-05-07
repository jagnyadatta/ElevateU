import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const Layout = () => {
  return (
    <>
      <div className="fixed w-full top-5 flex justify-center z-50">
        <Navbar />
      </div>
      <Outlet />
    </>
  )
}

export default Layout
