import React, { useContext, useEffect, useState } from 'react'

import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReelatedProduct from '../ReelatedProduct/ReelatedProduct';
import { CartContext } from '../CartContextProvider/CartContextProvider';
import { TokenContext } from '../Context/TokenContextProvider';
import { useQuery } from '@tanstack/react-query';

export default function ProductDetails() {
  // const [productDetails, setProductDetails] = useState([])
  // const [isLoading, setisLoading] = useState(false)
   let {addToCart,showAlertKobry} = useContext(CartContext)
   const {token} = useContext(TokenContext)
  let{id}=useParams()
  async function getDetails({queryKey}) {
    // setisLoading(true)
    let [productKey,productId]=queryKey
     return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
    // console.log(data.data);
    // setisLoading(false)
    // setProductDetails(data.data)
    
  }
  // useEffect(() => {
  //    getDetails(id)
  
   
  // }, [id])

  let{data,isLoading}=useQuery(
    {
      queryKey:[
        "product details",id
      ],
      queryFn:getDetails
    
    }
  )
  console.log(data);
  

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
      <div role="status">
    <svg aria-hidden="true" className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>
    </div>
  }
  return (<>
    <div className='grid grid-cols-[1fr_2fr] items-center gap-5'>
      <div className="productImg theme my-4">
        <img src={data.data.data.imageCover} alt=""  className='w-full'/>
      </div>
      <div className="productContent theme p-10">
        <h2 className='text-xl'>{data.data.data.title}</h2>
        <p className='text-slate-400 my-2 mb-3'>{data.data.data.description}</p>
        <span className='' >{data.data.data?.category?.name}</span>
        
{data.data.data.priceAfterDiscount?<span className="badge bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300 mx-1.5 ">Discount</span>:null}

<div className="cardFooter ">
  
 <div className="productRate flex justify-between">
  <div className="price  pt-5 px-0.5 ">
    <span >{data.data.data.priceAfterDiscount?`${data.data.data.priceAfterDiscount} EGP`:null}</span>
  <span className={data.data.data.priceAfterDiscount?"line-through text-red-400 pt-6 mx-1.5":"pt-5 mx-1.5"} >{data.data.data.price} EGP</span>
  </div>
 <div className="rate">
   <span>
    <i className={data.data.data.priceAfterDiscount?'fas fa-star text-amber-300 pt-6 mx-1.5':" fas fa-star text-amber-300 pt-6 mx-1.5"}></i>
    </span>
     <span className={data.data.data.priceAfterDiscount?"pt-5":" pt-5"}>
      {data.data.data.ratingsAverage}
      </span>
 </div>
      </div>

    </div>
     <button className=
 'text-white bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600  focus:outline-none dark:focus:ring-blue-800 hover:bg-transparent hover: border border-blue-500 w-full transition-all duration-200 translate-y-[200%] group-hover:translate-0 cursor-pointer hover:text-slate-400 hover:border-slate-400 '
 onClick={()=>showAlertKobry(data.data.data._id,token)}>
  Add To Cart</button>

 </div>

 
    </div>
   
    <ReelatedProduct/>
    </>
  )
}



