import React, { useContext, useEffect } from 'react'
import { CartContext } from '../CartContextProvider/CartContextProvider'
import { TokenContext } from '../Context/TokenContextProvider'

import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Spinner from '../Spinner/Spinner.'

export default function Cart() {
  const {token} = useContext(TokenContext)
const {addToCart ,getCart,totalPrice,numOfCart,isLoading,deleteCartKobry,ispinner,updateKobry,clearCart,cartId} = useContext(CartContext)
// useEffect(() => {
// deleteCartKobry()
// clearCart()


// }, [])

 
 let {data:cartProducts} =useQuery(
  {
    queryKey:[
      "cart"
    ],
    queryFn:getCart,
select: (cartProducts) => cartProducts.data.data.products


  }
  
)
console.log(cartProducts);









 

if (isLoading) {
  return <Spinner/>
}

  return (<>
  <div className='text-center my-4'>
      <h3 className='text-slate-800 text-2xl font-bold'>nums of cart:{numOfCart}</h3>
      <h3 className='text-slate-800 text-2xl font-bold'>total price:{totalPrice}</h3>
<button onClick={()=>clearCart(token)} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 mt-3">Claer</button>

    </div>

    { cartProducts?.length===0 ? (
      <div className="text-center my-5">
        <h4 className='text-slate-800 text-2xl font-bold h-screen'>Your cart is empty.</h4>
      </div>
    ) : null}
    
{cartProducts?.map((cartProduct)=><div  key={cartProduct.product._id} className="relative overflow-x-auto shadow-md sm:rounded-lg my-10 ">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={cartProduct.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {cartProduct.product.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button onClick={()=>updateKobry(cartProduct.product._id,cartProduct.count-1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
              <input type="number" disabled id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={cartProduct.count} required />
            </div>
            <button   onClick={()=>updateKobry(cartProduct.product._id,cartProduct.count+1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {cartProduct.price +" EGP "}
        </td>
        <td className="px-6 py-4">
         {ispinner?<i className='fas fa-spin fa-spinner'></i>: <span   onClick={()=>deleteCartKobry(cartProduct.product._id)} href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer">Remove</span>}
        </td>
      </tr>
      
    </tbody>
  </table>
  
</div>)}
<Link to={"/payement"}>
<button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ">Pay Now</button>
</Link>



  </>
    
    
  )
}
