import React, { useContext, useState } from 'react'
import logo from "../../assets/finalProject assets/logo.svg";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { TokenContext } from '../Context/TokenContextProvider';
import {  useLocation } from 'react-router-dom';



export default function Navbar() {
  const location = useLocation();
const isRegisterPage = location.pathname === "/Register";
// const isloginPage = location.pathname === "/";
// const isLoginPage = location.pathname === "/Login"&&"/login"&&"/"&&"/ForgotPassword"&&"/verifyResetCode"&&"/ResetPassword"&&"/ChangeUserAccount"&&"/ChangeUserPassword";


const hiddenPaths = [
  "/",
  "/login",
  "/Login",
  "/ForgotPassword",
  "/verifyResetCode",
  "/ResetPassword",
  "/ChangeUserAccount",
  "/ChangeUserPassword",
];

const isLoginPage = hiddenPaths.includes(location.pathname);


 const [register, setregister] = useState(<Link to="/Register"><span >Register</span></Link>)
//  const [register, setregister] = useState(<Link to="/Register"><span >Register</span></Link>)
 let logoutNav=  useNavigate()

 let{token,setToken,setlogedUser,logedUser}= useContext(TokenContext)

 function logOut() {
  setToken(null)
  localStorage.removeItem("token")
  setlogedUser(false)
logoutNav("/Login")

 }
  return (
<nav className='navbar bg-slate-500 py-4  w-full fixed  top-0 overflow-auto z-[999] theme '>

  <div className=" container  ">

  <div className="navContent flex gap-3  ">

     <div className="navImg flex sm:items-center xs:items-center" >
    
    <Link to="/home"> <img src={logo} alt="logo"  /></Link>
   </div>

   <div className="navLinks flex items-center gap-3 font-semibold">
   {  !isLoginPage&&!isRegisterPage?
    <>
      <Link  to="/Home">Home</Link>
      <Link   to="/Products">Products</Link>
      <Link   to="/Cart">Cart</Link>
      <Link   to="/categories">categories</Link>
      <Link   to="/Brands">Brands</Link>
      <Link   to="/WishList">WishList</Link>
    </>:null
   }
   </div>

   <div className="navIcons ms-auto flex items-center gap-3">
    <i className='fab fa-facebook'></i>
    <i className='fab fa-youtube'></i>
    <i className='fab fa-tiktok'></i>
    <i className='fab fa-twitter'></i>
    <i className='fab fa-instagram'></i>
    <i className='fab fa-github'></i>
   </div>

   <div className="navspans flex  gap-3">
   
  {!isLoginPage && !isRegisterPage ?  (
    <>
      
      <span className='cursor-pointer underline' onClick={logOut}>Log out</span>
    </>
  ) : null}
 
{!isRegisterPage && (
  <Link  className='underline' to="/Register">
    <span>Register</span>
  </Link>
)}
{/* {!isloginPage && (
<>
      <Link to="/Home">Home</Link>
      <Link to="/Products">Products</Link>
      <Link to="/Cart">Cart</Link>
      <Link to="/categories">categories</Link>
      <Link to="/Brands">Brands</Link>
    </>
)} */}



       
    
     
    
    
   </div>


  </div>
  </div>
</nav>


  )
}
