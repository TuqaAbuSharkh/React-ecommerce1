import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Component/user/Footer/Footer.jsx'
import Navbar from './Component/user/Navbar/Navbar.jsx'

export default function Root() {
  return (
    <>
    <Navbar />
    <Outlet />
    <Footer />
    </>
  )
}
