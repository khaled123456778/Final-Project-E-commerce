import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ دالة إرسال البيانات
  async function handleResetPassword(values, { setSubmitting }) {
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values
      );

      console.log(data);
      localStorage.setItem("new token",data)
      setSuccessMsg("Password updated successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setErrorMsg(error.response?.data?.errors.msg || "Something went wrong");
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  }

  // ✅ الفاليديشن
  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    newPassword: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("New password is required"),
  });

  const resetPasswordForm = useFormik({
    initialValues: {
      email: "",
      newPassword: ""
    },
    validationSchema,
    onSubmit: handleResetPassword,
  });

  return (
    <form
      onSubmit={resetPasswordForm.handleSubmit}
      className="h-screen mt-50"
    >
      <h3 className="text-4xl font-bold text-slate-700 capitalize">
        Change your password
      </h3>
      <p className="mt-2 text-sm text-slate-600">
        Please enter your email and new password
      </p>

      {errorMsg && !successMsg && (
        <div className="mb-3 alert">
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{errorMsg}</span>
          </div>
        </div>
      )}

      {successMsg && !errorMsg && (
        <div className="mb-3 alert">
          <div
            className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
            role="alert"
          >
            <span className="font-medium">{successMsg}</span>
          </div>
        </div>
      )}

      {/* 📨 Email */}
      <div className="mb-3 mt-3">
        {resetPasswordForm.errors.email && resetPasswordForm.touched.email ? (
          <div className="alert">
            <div className="p-4 mb-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">
                {resetPasswordForm.errors.email}
              </span>
            </div>
          </div>
        ) : null}

        <label htmlFor="email" className="mb-2 text-sm font-medium text-gray-900">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={resetPasswordForm.values.email}
          onChange={resetPasswordForm.handleChange}
          onBlur={resetPasswordForm.handleBlur}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      {/* 🔒 New Password */}
      <div className="mb-3 mt-3">
        {resetPasswordForm.errors.newPassword && resetPasswordForm.touched.newPassword ? (
          <div className="alert">
            <div className="p-4 mb-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">
                {resetPasswordForm.errors.newPassword}
              </span>
            </div>
          </div>
        ) : null}

        <label htmlFor="newPassword" className="mb-2 text-sm font-medium text-gray-900">
          New Password
        </label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={resetPasswordForm.values.newPassword}
          onChange={resetPasswordForm.handleChange}
          onBlur={resetPasswordForm.handleBlur}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-1"
      >
        {isLoading ? (
          <i className="fas fa-spin fa-spinner"></i>
        ) : (
          "Update Password"
        )}
      </button>
    </form>
  );
}
