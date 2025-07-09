import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as yup from "yup";
import { TokenContext } from "../Context/TokenContextProvider";
import { useNavigate } from "react-router-dom";

export default function ChangeUserPassword() {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {token} = useContext(TokenContext)
  let nav=useNavigate()

  // ✅ Validation Schema
  const validationSchema = yup.object({
    currentPassword: yup.string().required("Current password is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("New password is required"),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords do not match")
      .required("Confirm password is required"),
  });

  // ✅ Formik setup
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: handleChangeUserPassword,
  });

  // ✅ Submit handler
  async function handleChangeUserPassword(values) {
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      

      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        values,
        {
          headers: {
            token: token,
          },
        }
      );
      // console.log(data);

      
    localStorage.setItem("new user password", data.token)
      setSuccessMsg("Password updated successfully!");
        setTimeout(() => {
        nav("/login"); 
      }, 2000);
    } catch (error) {
      setErrorMsg(error.response?.data?.errors.msg || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={formik.handleSubmit} className="h-screen mt-30">
      <h3 className="text-3xl font-bold text-slate-700 capitalize">
        Change your password
      </h3>
      <p className="mt-2 text-sm text-slate-600">
        Please enter your current and new password
      </p>

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

      {/* 🔐 Current Password */}
      <div className="mb-3 mt-3">
        <label
          htmlFor="currentPassword"
          className="mb-2 text-sm font-medium text-gray-900"
        >
          Current Password
        </label>
        <input
          type="password"
          id="currentPassword"
          name="currentPassword"
          value={formik.values.currentPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        {formik.errors.currentPassword && formik.touched.currentPassword && (
          <div className="text-red-600 text-sm mt-1">
            {formik.errors.currentPassword}
          </div>
        )}
      </div>

      {/* 🔑 New Password */}
      <div className="mb-3 mt-3">
        <label
          htmlFor="password"
          className="mb-2 text-sm font-medium text-gray-900"
        >
          New Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        {formik.errors.password && formik.touched.password && (
          <div className="text-red-600 text-sm mt-1">
            {formik.errors.password}
          </div>
        )}
      </div>

      {/* 🔁 Confirm Password */}
      <div className="mb-3 mt-3">
        <label
          htmlFor="rePassword"
          className="mb-2 text-sm font-medium text-gray-900"
        >
          Confirm New Password
        </label>
        <input
          type="password"
          id="rePassword"
          name="rePassword"
          value={formik.values.rePassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        {formik.errors.rePassword && formik.touched.rePassword && (
          <div className="text-red-600 text-sm mt-1">
            {formik.errors.rePassword}
          </div>
        )}
      </div>

      {/* 🔘 Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mt-1"
      >
        {isLoading ? <i className="fas fa-spin fa-spinner"></i> : "Update Password"}
      </button>
    </form>
  );
}
