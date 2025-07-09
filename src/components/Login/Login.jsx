import axios from 'axios'
import { Formik, useFormik, validateYupSchema } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { data, Link, useNavigate } from 'react-router-dom'
import * as yup from "yup";
import { TokenContext } from '../Context/TokenContextProvider';
import { jwtDecode } from 'jwt-decode';




export default function Login() {
    let{setToken,token,logedUser,setlogedUser}= useContext(TokenContext)
const [errorMsg, setErrors] = useState(null)
const [succesMsg, setSucces] = useState(null)
const [isLoading, setLoading] = useState(false)

let navigate=useNavigate()
let validationSchema = yup.object().shape({
  email:yup.string().email("the email is incorrect").required("email is required"),
  password:yup.string().min(6, "Password must be at least 6 characters").required("password is required"),
 
})

   async function handelLogin(values) {
    try {
setLoading(true)
 setlogedUser(false)
     const {data}=await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values)
     console.log(data);
   setSucces(data.message)
    setLoading(false)
 localStorage.setItem("token", data.token);
 const {id} = jwtDecode(data.token);
  localStorage.setItem("id", id);
   setlogedUser(true)

  // setUserId(id)




     setToken(data.token)
    setlogedUser(true)

    // if (logedUser) {
    //    navigate("/home")
    // }
     

   
 setTimeout(() => {
       navigate("/home")
}, 3000);
  
    } catch (error) {
      setLoading(true)
      setErrors(error.response.data.message)
      console.log(error);
      
    
    }finally{setLoading(false)}
  }

 let loginFormik= useFormik({
    initialValues:{
      email:"",
      password:"",
      
        },
        onSubmit:handelLogin,
      validationSchema
  })



  return (
    <>
   
  <div className="container w-[90%] mx-auto  py-13">
    <div className="loginBtns flex gap-3">
       <Link to={"/ChangeUserAccount"} className='underline '>Change Your Account?</Link>
     <Link to={"/ChangeUserPassword"} className='underline '>Change Your Password?</Link>
    </div>
     <h2 className='text-5xl font-bold my-4 pb-5'>Login:</h2>
    <form  onSubmit={loginFormik.handleSubmit}>
    {errorMsg&&!succesMsg?<div className="mb-3 alert">
  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium"> {errorMsg}</span>
  </div>
  </div>:null}
   {succesMsg&&!errorMsg?<div className="mb-3 alert">
  <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  <span className="font-medium"> {succesMsg}</span>
  </div>
  </div>:null}

    <div className="mb-3 mt-3">
     {loginFormik.errors.email && loginFormik.touched.email?<div className=" alert">
  <div className="p-4 mb-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium"> {loginFormik.errors.email}</span>
  </div>
  </div>:null}

    <label htmlFor="email" className=" mb-2 text-sm font-medium text-gray-900">Your email</label>
    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
     name="email"  value={loginFormik.values.email} onChange={loginFormik.handleChange} onBlur={loginFormik.handleBlur} />
  </div>

  <div className="mb-3">
     {loginFormik.errors.password && loginFormik.touched.password?<div className=" alert">
  <div className="p-4 mb-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium"> {loginFormik.errors.password}</span>
  </div>
  </div>:null}
    <label htmlFor="Password" className=" mb-2 text-sm font-medium text-gray-900">Your password</label>
    <input type="password" id="password"   autoComplete="current-password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " 
     name="password"  value={loginFormik.values.password} onChange={loginFormik.handleChange} onBlur={loginFormik.handleBlur} />
  </div>
  <div className="loginBtns flex justify-between">
    
    <button  type="submit" disabled={isLoading?true:false} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    {isLoading?<i className='fas fa-spin fa-spinner'></i>:"Register"}
    </button>
    <Link to={"/ForgotPassword"} className='underline '>Forgot Password?</Link>
  </div>
  </form>
 
  </div>
   
  </>
  )
}
