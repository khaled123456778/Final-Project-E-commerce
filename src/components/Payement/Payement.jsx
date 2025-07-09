import { useFormik } from 'formik'
import * as yup from "yup";
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { TokenContext } from '../Context/TokenContextProvider';
import { CartContext } from '../CartContextProvider/CartContextProvider';
import { useNavigate } from 'react-router-dom';



export default function Payement() {
const {token} = useContext(TokenContext)
const {cartId} = useContext(CartContext)
const [orderFlag, setorderFlag] = useState(false)
let allordersNav =useNavigate()
//  let validationSchema = yup.object().shape({
//   city: yup.string()
//     .matches(/^[a-zA-Z\s]{1,12}$/, "Invalid city name")
//     .required("City is required"),

//   phone: yup.string()
//     .matches(/^[0-9]{6}$/, "Phone must include exactly 6 digits")
//     .required("Phone is required"),

//   details: yup.string()
//     .matches(/^[a-zA-Z0-9\s,.-]{5,100}$/, "Invalid characters in details")
//     .required("Details are required")
// });


  
  


 async function handleCashPayement(values) {
 
   try {
  
    // if (cartId===null||undefined) {
    //  getCart()
     
    // }

      
     let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{shippingAddress:values},
      {headers:{token}}
    )
    console.log(data);

allordersNav("/allorders")
    
   } catch (error) {
    console.log(error);
    console.log(cartId);
    
   }
    
  }
 async function onlinePayement(values) {
   try {
   
    let{data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,values,{headers:{token}})
    console.log(data.session.url);

    window.open(data.session.url,"_self")
    
  
   } catch (error) {
    console.log(error);
    
   }
  }

  function orderPayement(values) {
    let shippingAddress = {shippingAddress:values}
    if (orderFlag) {
      onlinePayement(shippingAddress)
    } else {
      handleCashPayement(shippingAddress)
      
    }
  }
let payForm= useFormik({
  initialValues:{
    details: "",
      phone: "",
        city: ""
  },
  onSubmit:orderPayement,
  // validationSchema,
 }
 
 )
 
 
 
  return (<>
  
    <form onSubmit={payForm.handleSubmit} class="max-w-md mx-auto  mt-20">
      
  <div className="relative z-0 w-full mb-5 group">
      <input type="text"  id="floating_details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-slate-400 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
      name="details"
      value={payForm.values.details}
      onChange={payForm.handleChange}
      onBlur={payForm.handleBlur}
       />

      <label for="floating_details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details </label>
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="tel" id="floating_Phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-slate-400 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
       name="phone"
      value={payForm.values.phone}
      onChange={payForm.handleChange}
      onBlur={payForm.handleBlur} />
      <label for="floating_Phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone </label>
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="text"  id="floating_City" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-slate-400 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  
     name="city"
      value={payForm.values.city}
      onChange={payForm.handleChange}
      onBlur={payForm.handleBlur} /> 
      <label for="floating_City" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City </label>
  </div>
    <button onClick={()=>setorderFlag(false)}  type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Cash payement</button>
    <button  onClick={()=>setorderFlag(true)}  type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Online payement</button>

  </form>


  </>
  )
}
