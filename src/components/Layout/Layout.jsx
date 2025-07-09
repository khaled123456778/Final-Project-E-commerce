import React from 'react'
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';
import { Outlet } from 'react-router-dom';
import Register from '../Register/Register';

export default function Layout() {
  return (
  <>
  <Navbar/>
<div className=" pt-16 container">
    <Outlet/> 
</div>
  
<Footer/>
  
</>
  )
}

