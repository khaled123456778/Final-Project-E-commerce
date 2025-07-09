import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as yup from "yup";
import { TokenContext } from "../Context/TokenContextProvider";
import { useNavigate } from "react-router-dom";

export default function UpdateUserData() {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useContext(TokenContext);
  let nav=useNavigate()

  // ✅ Validation Schema
  const validationSchema = yup.object({
    name: yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup
      .string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number")
      .required("Phone is required"),
  });

  // ✅ Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleUpdateUser,
  });

  // ✅ Submit handler
  async function handleUpdateUser(values) {
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/users/updateMe",
        values,
        {
          headers: {
            token: token,
          },
        }
      );
      // console.log(data.user);
      

      setSuccessMsg("User data updated successfully!");
      localStorage.setItem("updated user data ",data.user)
      setTimeout(() => {
        nav("/login"); 
      }, 2000);
    } catch (error) {
      setErrorMsg(error.response?.data?.errors.msg || "Something went wrong.");
      console.log(error);
      
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={formik.handleSubmit} className="h-screen mt-30">
      <h3 className="text-3xl font-bold text-slate-700 capitalize">Change Your Account</h3>
      <p className="mt-2 text-sm text-slate-600"> Enter Required Data Please</p>

      {/* ✅ Messages */}
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

      {/* 🟢 Name */}
      <div className="mb-3 mt-3">
        <label htmlFor="name" className="mb-2 text-sm font-medium text-gray-900"> Your  New Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        {formik.errors.name && formik.touched.name && (
          <div className="text-red-600 text-sm mt-1">{formik.errors.name}</div>
        )}
      </div>

      {/* 📧 Email */}
      <div className="mb-3 mt-3">
        <label htmlFor="email" className="mb-2 text-sm font-medium text-gray-900"> Your New Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        {formik.errors.email && formik.touched.email && (
          <div className="text-red-600 text-sm mt-1">{formik.errors.email}</div>
        )}
      </div>

      {/* 📱 Phone */}
      <div className="mb-3 mt-3">
        <label htmlFor="phone" className="mb-2 text-sm font-medium text-gray-900"> Your New Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        {formik.errors.phone && formik.touched.phone && (
          <div className="text-red-600 text-sm mt-1">{formik.errors.phone}</div>
        )}
      </div>

      {/* 🔘 Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mt-1"
      >
        {isLoading ? <i className="fas fa-spin fa-spinner"></i> : "Update Info"}
      </button>
    </form>
  );
}

