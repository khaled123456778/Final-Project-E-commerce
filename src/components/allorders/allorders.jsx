import React, { useContext, useEffect } from 'react'
import { CartContext } from '../CartContextProvider/CartContextProvider'
import { TokenContext } from '../Context/TokenContextProvider'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import axios from 'axios'
import Spinner from '../Spinner/Spinner.'

export default function Allorders() {
  const {token,userId} = useContext(TokenContext)
  const {cartId,getUserOrders} = useContext(CartContext)

  // useEffect(() => {
  //   getUserOrders()
  
   
  // }, [])
  


 let {data,isLoading,isError}= useQuery({querykey :["user orders"],
    queryFn :getUserOrders
  }
  )
  // console.log(data.data);

if (isLoading) {
  return <Spinner/>
}

  return (
    <div>
      <Link to={"/Home"}><button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-10">Back to Home</button>
</Link>
      {data.data.map((order) => (
  <div key={order._id} className="mb-8 px-4">
    {/* Order Header */}
    <div className="bg-white shadow p-4 rounded-md mb-4">
      <p><strong>Total:</strong> {order.totalOrderPrice} EGP</p>
      <p><strong>Payment Method:</strong> {order.paymentMethodType}</p>
      <p><strong>Paid:</strong> {order.isPaid ? "Yes" : "No"}</p>
      <p><strong>Delivered:</strong> {order.isDelivered ? "Yes" : "No"}</p>
    </div>

    {/* Product Cards  */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 bg-gray-100 p-4 rounded-md">
      {order.cartItems.map((item) => (
        <div key={item._id} className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 theme">
          <img
            src={item.product.imageCover}
            alt={item.product.title}
            className="w-full h-48 object-cover"
          />

          <div className="p-4">
            <h2 className="text-lg font-bold mb-2">{item.product.title}</h2>

            <p className="text-sm text-blue-600 mb-1">
              <strong>Category:</strong> {item.product.category.name}
            </p>

            <p className="text-sm text-slate-600 mb-1">
              <strong>Brand:</strong> {item.product.brand.name}
            </p>

            <div className="flex justify-between items-center mt-3">
              <span className="text-sm font-medium text-gray-800">Price: {item.price} EGP</span>
              <span className="text-sm font-medium text-gray-800">Quantity: {item.count}</span>
            </div>

            <div className="mt-2 text-sm font-semibold text-green-600">
              Subtotal: {item.price * item.count} EGP
            </div>

            <div className="mt-2 flex items-center text-yellow-500 text-sm gap-1">
              <i className="fas fa-star"></i>
              <span>{item.product.ratingsAverage}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
))}


    </div>
  )
}
