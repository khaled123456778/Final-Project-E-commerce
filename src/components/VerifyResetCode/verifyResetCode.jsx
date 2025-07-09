
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup';

export default function VerifyResetCode() {
  const [successMsg, setSuccessMsg] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const resetNav = useNavigate()

  const validationSchema = yup.object().shape({
    resetCode: yup.string()
      .required("Reset code is required")
      .matches(/^\d{6}$/, "Reset code must be 6 digits")
  })

  async function handleVerifyResetCode(values) {
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      );
      setSuccessMsg("Code verified successfully");
      // console.log(data);
      
      setTimeout(() => {
        resetNav("/ResetPassword"); 
      }, 2000);
    } catch (error) {
      setErrorMsg(error.response?.data?.errors.msg );
    } finally {
      setIsLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: { resetCode: "" },
    onSubmit: handleVerifyResetCode,
    validationSchema
  });

  return (
    <form onSubmit={formik.handleSubmit} className='h-screen mt-50'>
      <h3 className='text-3xl font-bold text-slate-700 capitalize'>Enter the reset code</h3>
      <p className='mt-2 text-sm text-slate-600'>Check your email for the 6-digit code</p>

      {errorMsg && (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
          {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400">
          {successMsg}
        </div>
      )}

      <div className="mb-3 mt-3">
        <label htmlFor="resetCode" className="block mb-2 text-sm font-medium text-gray-900">
          Reset Code
        </label>
        <input
          type="text"
          id="resetCode"
          name="resetCode"
          value={formik.values.resetCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        {formik.errors.resetCode && formik.touched.resetCode && (
          <div className="text-red-600 text-sm mt-1">{formik.errors.resetCode}</div>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mt-1"
      >
        {isLoading ? <i className='fas fa-spin fa-spinner'></i> : "Verify Code"}
      </button>
    </form>
  );
}

