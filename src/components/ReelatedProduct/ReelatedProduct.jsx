import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

import ProductDetails from './../ProductDetails/ProductDetails';
import { useQuery } from '@tanstack/react-query';
import { TokenContext } from '../Context/TokenContextProvider';
import { CartContext } from '../CartContextProvider/CartContextProvider';
import { wishListContext } from '../WishListContextProvider/WishListContextProvider';



  
export default function ReelatedProduct() {

const{token}=useContext(TokenContext)
let{showAlertKobry,ispinner,spinnerProductId}=useContext(CartContext)
let {wishListToggle, wishListItems,setwishListToggleLoading,wishListToggleLoading}=useContext(wishListContext)

//  const [RelatedProducts, setRelatedProducts] = useState([])
  let{id,category}=useParams()

 async function getRelatedProduct({queryKey}) {
  
  let [kay,id,category]=queryKey
  setwishListToggleLoading(id)
   let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
   let RelatedProducts=data.data.filter((RelatedProduct)=>RelatedProduct.category.name === category && RelatedProduct._id!==id )
   setwishListToggleLoading(null)

   return RelatedProducts
    // console.log(data.data);
    // setRelatedProducts(RelatedProductArr)
   
 
    
    
 
    
    
  }
  
 let {data:RelatedProducts} =useQuery(
  {
    queryKey:[
      "related product",id,category
    ],
    queryFn:getRelatedProduct,
   
  }
)

//   useEffect(() => {
//     getRelatedProduct(category,id)

   
// console.log(RelatedProducts);
 


//   }, [category])


 

  return (
    <>
 <div className="productCard gap-3 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 container cursor-pointer my-6">
  {RelatedProducts?.map((RelatedProduct) => {
    const isInWishList = wishListItems.includes(RelatedProduct._id); 

    return (
      <div key={RelatedProduct._id}>
        <div className="cardContent rounded-lg shadow-lg theme p-2 group overflow-hidden">
          <Link to={`/ProductDetails/${RelatedProduct._id}/${RelatedProduct.category.name}`}>
            <div className="cardImg">
              <img src={RelatedProduct.imageCover} alt={RelatedProduct.description} />
            </div>

            <div className="cardHead">
              <h2 className="text-sm">{RelatedProduct.category.name}</h2>
              <h2 className="text-md">
                {RelatedProduct.title.split(" ", 2).join(" ")}
              </h2>

              <button
                className="flex justify-center items-center bg-white focus:ring-2 focus:ring-red-300 font-medium rounded-full text-sm p-2 me-3.5 mb-2 mt-2 border transition-all duration-200 cursor-pointer h-[31.6px]"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  wishListToggle(RelatedProduct._id, token);
                }}
              >
                {wishListToggleLoading===RelatedProduct._id? <i className="fas fa-spinner fa-spin text-red-400"></i>: <i className={`fas fa-heart text-xl transition-all duration-300 ${
                        isInWishList ? "text-red-500" : "text-gray-400 "
                      }`}></i>}
              </button>

              {RelatedProduct.priceAfterDiscount && (
                <span className="badge bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">
                  Discount
                </span>
              )}
              <span>
                {RelatedProduct.priceAfterDiscount
                  ? `${RelatedProduct.priceAfterDiscount} EGP`
                  : null}
              </span>
            </div>

            <div className="cardFooter flex justify-between">
              <span
                className={
                  RelatedProduct.priceAfterDiscount
                    ? "line-through text-red-400"
                    : "pt-5"
                }
              >
                {RelatedProduct.price} EGP
              </span>
              <div className="RelatedProductRate flex justify-between">
                <span>
                  <i
                    className={
                      RelatedProduct.priceAfterDiscount
                        ? "fas fa-star text-amber-300"
                        : "fas fa-star text-amber-300 pt-6"
                    }
                  ></i>
                </span>
                <span
                  className={
                    RelatedProduct.priceAfterDiscount ? "" : "pt-5"
                  }
                >
                  {RelatedProduct.ratingsAverage}
                </span>
              </div>
            </div>
          </Link>

          <button
            className="dark:text-white bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 focus:outline-none dark:focus:ring-blue-800 hover:bg-transparent hover:border border-blue-500 w-full transition-all duration-200 translate-y-[200%] group-hover:translate-0 cursor-pointer text-slate-950"
            onClick={() => showAlertKobry(RelatedProduct._id, token)}
          >
           {spinnerProductId=== RelatedProduct._id ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              'Add To Cart'
            )}
          </button>
        </div>
      </div>
    );
  })}
</div>

    
</>
  )
}
