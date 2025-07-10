import { useFormik } from 'formik';
import * as yup from "yup";
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { TokenContext } from '../Context/TokenContextProvider';
import { CartContext } from '../CartContextProvider/CartContextProvider';
import { useNavigate } from 'react-router-dom';

export default function Payement() {
  const { token } = useContext(TokenContext);
  const { cartId } = useContext(CartContext);
  const [orderFlag, setorderFlag] = useState(false);
  const allordersNav = useNavigate();

  // ✅ Validation Schema
  const validationSchema = yup.object({
    city: yup.string()
      .required("Please enter your city.")
      .matches(/^[a-zA-Z\s]{2,20}$/, "City name should contain only letters and be 2-20 characters."),
    
    phone: yup.string()
      .required("Phone number is required.")
      .matches(/^[0-9]{6,15}$/, "Phone number must be between 6 and 15 digits."),
    
    details: yup.string()
      .required("Address details are required.")
      .min(5, "Details must be at least 5 characters.")
      .max(100, "Details must be less than 100 characters.")
  });

  // ✅ Cash Payment Handler
  async function handleCashPayement(values) {
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        { shippingAddress: values },
        { headers: { token } }
      );
      console.log(data);
      allordersNav("/allorders");
    } catch (error) {
      console.log(error);
    }
  }

  // ✅ Online Payment Handler
  async function onlinePayement(values) {
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        values,
        { headers: { token } }
      );
      window.open(data.session.url, "_self");
    } catch (error) {
      console.log(error);
    }
  }

  // ✅ Handle Form Submit
  function orderPayement(values) {
    const shippingAddress = { shippingAddress: values };
    orderFlag ? onlinePayement(shippingAddress) : handleCashPayement(shippingAddress);
  }

  const payForm = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },
    validationSchema,
    onSubmit: orderPayement
  });

  return (
    <>
      <form onSubmit={payForm.handleSubmit} className="max-w-md mx-auto mt-40">
        
        {/* DETAILS */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            id="floating_details"
            name="details"
            value={payForm.values.details}
            onChange={payForm.handleChange}
            onBlur={payForm.handleBlur}
            placeholder=" "
            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
              payForm.errors.details && payForm.touched.details ? "border-red-500" : "border-gray-300"
            } appearance-none dark:text-slate-400 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
          />
          <label htmlFor="floating_details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 top-3 -z-10 origin-[0] transition-all duration-300">
            Address Details
          </label>
          {payForm.errors.details && payForm.touched.details && (
            <p className="text-red-500 text-xs mt-1">{payForm.errors.details}</p>
          )}
        </div>

        {/* PHONE */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            id="floating_phone"
            name="phone"
            value={payForm.values.phone}
            onChange={payForm.handleChange}
            onBlur={payForm.handleBlur}
            placeholder=" "
            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
              payForm.errors.phone && payForm.touched.phone ? "border-red-500" : "border-gray-300"
            } appearance-none dark:text-slate-400 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
          />
          <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 top-3 -z-10 origin-[0] transition-all duration-300">
            Phone Number
          </label>
          {payForm.errors.phone && payForm.touched.phone && (
            <p className="text-red-500 text-xs mt-1">{payForm.errors.phone}</p>
          )}
        </div>

        {/* CITY */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            id="floating_city"
            name="city"
            value={payForm.values.city}
            onChange={payForm.handleChange}
            onBlur={payForm.handleBlur}
            placeholder=" "
            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
              payForm.errors.city && payForm.touched.city ? "border-red-500" : "border-gray-300"
            } appearance-none dark:text-slate-400 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
          />
          <label htmlFor="floating_city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 top-3 -z-10 origin-[0] transition-all duration-300">
            City
          </label>
          {payForm.errors.city && payForm.touched.city && (
            <p className="text-red-500 text-xs mt-1">{payForm.errors.city}</p>
          )}
        </div>

        {/* Buttons */}
        <button
          onClick={() => setorderFlag(false)}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Cash Payment
        </button>
        <button
          onClick={() => setorderFlag(true)}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Online Payment
        </button>
      </form>
    </>
  );
}
