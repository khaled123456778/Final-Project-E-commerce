import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup';


export default function ForgotPassword() {
  const [succesMsg, setsuccesMsg] = useState("")
  const [errorMsg, seterrorMsg] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  let resetNav=useNavigate()
let validationSchema = yup.object().shape({
  email:yup.string().email("the email is incorrect").required("email is required"),
 
 
})
   async function handeleForgotPassword(values) {
  setIsLoading(true);
  seterrorMsg("");
  setsuccesMsg("");
  try {
    const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values);
    console.log(data);
    localStorage.setItem("resetEmail",values.email)
    setsuccesMsg(data.message); 
   setTimeout(() => {
     resetNav("/verifyResetCode")
   }, 2000);
    
  } catch (error) {
    seterrorMsg(error.response?.data?.message);
  } finally {
    setIsLoading(false);
  }
}

   let forgotPasswordForm=useFormik(
    {
     initialValues:{email:""},
    onSubmit:handeleForgotPassword  ,
    validationSchema  
    }
  )
  return (
    <>
    
     <form onSubmit={forgotPasswordForm.handleSubmit}  className='h-screen mt-50'>
      <h3 className='text-4xl font-bold text-slate-700  capitalize'>enter Your email</h3>
      <p className='mt-2 text-sm text-slate-600'>we will send a code to your email</p>
       {errorMsg && !succesMsg ? (
        <div className="mb-3 alert">
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium"> {errorMsg}</span>
          </div>
        </div>
      ) : null}
      {succesMsg && !errorMsg ? (
        <div className="mb-3 alert">
          <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
            <span className="font-medium"> {succesMsg}</span>
          </div>
        </div>
      ) : null}

      <div className="mb-3 mt-3">
        {forgotPasswordForm.errors.email && forgotPasswordForm.touched.email ? (
          <div className=" alert">
            <div className="p-4 mb-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium"> {forgotPasswordForm.errors.email}</span>
            </div>
          </div>
        ) : null}

        <label htmlFor="ForgotEmail" className=" mb-2 text-sm font-medium text-gray-900">Your email</label>
        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  text-left " 
          name="email" value={forgotPasswordForm.values.email} onChange={forgotPasswordForm.handleChange} onBlur={forgotPasswordForm.handleBlur} />
      </div>
       <button type="submit" disabled={isLoading?true:false} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-1">
    {isLoading?<i className='fas fa-spin fa-spinner'></i>:"send Code"}
    </button>
     </form>
     
    </>
  )
}
