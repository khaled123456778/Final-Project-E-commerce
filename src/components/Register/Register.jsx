import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { data, useNavigate } from 'react-router-dom'
import  * as yup from 'yup'
import { TokenContext } from '../Context/TokenContextProvider'



export default function Register() {
  //  const [logedUser, setlogedUser] = useState(false)
  let{setToken,token,setlogedUser,logedUser}= useContext(TokenContext)
const [errorMsg, seterrors] = useState(null)
const [succesMsg, setsuccesMsg] = useState(null)
const [isLoading, setLoading] = useState(false)
let navigate = useNavigate()

let validationSchema=yup.object().shape(
{name:yup.string().min(3,"min 3 chars").max(6,"max 6 chars").required("name is required"),
email:yup.string().email("wrong email").required("email is required"),
password:yup.string().matches(/^[0-9]{6}$/,"your password is wrong").required(),
rePassword:yup.string().oneOf([yup.ref("password")],"wrong Repasssword").required("repassword is required"),
phone:yup.string().matches(/^01[0125][0-9]{8}$/,"phone must be egyptian").required("phone is required")
  }
)



async function sendData(values) {
    try {
      
      setLoading(true)
       setlogedUser(false)
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values);
      console.log(data.token);
      setsuccesMsg(data.message)
      setLoading(false)
      setToken(data.token)
      localStorage.setItem("token",data.token)
       setlogedUser(false)
      
      setTimeout(() => {
        navigate("/login")
      },2000 );

    } catch (error) {
      console.log(error.response.data.message);
      seterrors(error.response.data.message)
      
    }finally{setLoading(false)}
  
  }

    // function validation(values) {
    //   let errors={}
    //   if (values.name=="") {
    //     errors.nameErrors="name is requierd"
    //   }
    //   else if(!/[^w{3-6}$]/.test(values.name)){
    //      errors.nameErrors="must be 3 to 6 chars"
    //   }

    //   if (values.phone==="") {
    //     errors.phoneErrors="phone num is requird"
    //   }
    //   else if(!/^01[0125][0-9]{8}]$/)
    //      { errors.phoneErrors='must be egy num'}
    //   return errors
    // }

  let formik = useFormik(
    {initialValues:{name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:""},
  onSubmit:sendData,
  validationSchema,


}
   
  )


  return (
    <>
  
<form className="max-w-sm mx-auto  overflow-auto py-12" onSubmit={formik.handleSubmit} >
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




    <h2 className='text-3xl font-bold'>Register Now:</h2>
     {formik.errors.name&&formik.touched.name?<div className=" alert mt-2">
  <div className="p-4 mb-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium"> {formik.errors.name}</span>
  </div>
  </div>:null}
    <label htmlFor="name" className=" mb-2 text-sm font-medium text-gray-900 ">Your name</label>
    <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
     name="name"  value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>

  <div className="mb-3 mt-3">
     {formik.errors.email&&formik.touched.email?<div className=" alert">
  <div className="p-4 mb-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium"> {formik.errors.email}</span>
  </div>
  </div>:null}

    <label htmlFor="email" className=" mb-2 text-sm font-medium text-gray-900">Your email</label>
    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
     name="email"  value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
  </div>

  <div className="mb-3">
     {formik.errors.password&&formik.touched.password?<div className=" alert">
  <div className="p-4 mb-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium"> {formik.errors.password}</span>
  </div>
  </div>:null}
    <label htmlFor="password" className=" mb-2 text-sm font-medium text-gray-900">Your password</label>
    <input type="password" id="password"   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " 
     name="password"  value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
  </div>
  <div className="mb-3">
     {formik.errors.rePassword&&formik.touched.rePassword?<div className=" alert">
  <div className="p-4 mb-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium"> {formik.errors.rePassword}</span>
  </div>
  </div>:null}
    <label htmlFor="rePassword" className=" mb-2 text-sm font-medium text-gray-900">Your rePassword</label>
    <input type="Password" id="rePassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
     name="rePassword"  value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
  </div>
  <div className="mb-3">
    
     {formik.errors.phone&&formik.touched.phone?<div className=" alert">
  <div className="p-4 mb-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium"> {formik.errors.phone}</span>
  </div>
  </div>:null}
    <label htmlFor="phone" className=" mb-2 text-sm font-medium text-gray-900">Your phone</label>
    <input type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
     name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}  />
  </div>
 
  <button type="submit" disabled={isLoading?true:false} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    {isLoading?<i className='fas fa-spin fa-spinner'></i>:"Register"}
    </button>
</form>
</>
  )
}


