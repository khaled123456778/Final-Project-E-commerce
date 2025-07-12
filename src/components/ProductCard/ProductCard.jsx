import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { data, Link } from 'react-router-dom';
import Products from './../Products/Products';
import { CartContext } from '../CartContextProvider/CartContextProvider';
import toast from 'react-hot-toast';
import { TokenContext } from '../Context/TokenContextProvider';
import Spinner from '../Spinner/Spinner.';
import
 {
 useQuery
} from '@tanstack/react-query'
import { wishListContext } from '../WishListContextProvider/WishListContextProvider';

export default function ProductCard() {

// const [isLoading, setisLoading] = useState(false)
const [spinnerProductId, setSpinnerProductId] = useState(null);

 let {addToCart} = useContext(CartContext)
 let {token} = useContext(TokenContext)
 let {wishListAlert,deleteWishListAlert,isInWishList,toggleWishList,ispinner,setspinner,wishListToggle, wishListItems,setwishListToggleLoading,wishListToggleLoading}=useContext(wishListContext)
 
  //   setisLoading(true)
  
    // setproducts(data.data)
  
    // setisLoading(false)
  


  // useEffect(() => {


  //   getproducts()
  
   
  // }, [])
  async function showAlertKobry(productId,token) {
setSpinnerProductId(productId); // ✅ فعل السبينر لهذا المنتج فقط

  let flag =  await addToCart(productId,token)
  console.log(token);
  

  if (flag) {
    toast.success(' Added Successfully ');
  } else {
    toast.error('This is an error!');
  }
  setSpinnerProductId(null); // ✅ أوقف السبينر بعد الانتهاء
}



 async function getProductCard() {
      return await axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }

  let {data ,isLoading}=useQuery({
    queryKey:["product Card"],
    queryFn: getProductCard,

  })
  // console.log(data);

  

  if (isLoading) {
    return <Spinner/>
  }
  
  return (
    <>
      <div className="productCard   gap-3 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 container cursor-pointer mt-6">
        {data?.data.data.map((product) => {
          const isInWishList = wishListItems.includes(product._id); // ✅ تحقق الحالة لكل منتج

          return (
            <div key={product._id}>
              <div className="cardContent rounded-lg shadow-lg theme p-2 group overflow-hidden">
                <Link to={`/ProductDetails/${product._id}/${product.category.name}`}>
                  <div className="cardImg">
                    <img src={product.imageCover} alt={product.description} />
                  </div>

                  <div className="cardHead">
                    <h2 className="text-sm">{product.category.name}</h2>
                    <h2 className="text-md">{product.title.split(" ", 2).join(" ")}</h2>

                    {/* ✅ زر القلب مع التلوين حسب الحالة */}
                    <button
                      className="flex justify-center items-center bg-white 
                        focus:ring-2 focus:ring-red-300 font-medium rounded-full text-sm 
                        p-2 me-3.5 mb-2 mt-2 border transition-all duration-200 
                        cursor-pointer h-[31.6px]"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        wishListToggle(product._id, token);
                      }}
                    >
                      {wishListToggleLoading === product._id? <i className="fas fa-spinner fa-spin text-red-400"></i>: <i className={`fas fa-heart text-xl transition-all duration-300 ${
                        isInWishList ? "text-red-500" : "text-gray-400 "
                      }`}></i>}
                     
                    </button>

                    {product.priceAfterDiscount && (
                      <span className="badge bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">
                        Discount
                      </span>
                    )}
                    {product.priceAfterDiscount && <span>{product.priceAfterDiscount} EGP</span>}
                  </div>

                  <div className="cardFooter flex justify-between">
                    <span className={product.priceAfterDiscount ? "line-through text-red-400" : "pt-5"}>
                      {product.price} EGP
                    </span>
                    <div className="productRate">
                      <i className="fas fa-star text-amber-300"></i>
                      <span>{product.ratingsAverage}</span>
                    </div>
                  </div>
                </Link>

                {/* زر الإضافة إلى العربة مع سبينر */}
                <button
                  className="dark:text-white bg-blue-700 focus:ring-4 focus:ring-blue-300 
                    font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600  
                    focus:outline-none dark:focus:ring-blue-800 hover:bg-transparent 
                    border border-blue-500 w-full transition-all duration-200 
                    translate-y-[200%] group-hover:translate-0 cursor-pointer text-slate-950"
                  onClick={() => showAlertKobry(product._id, token)}
                  disabled={spinnerProductId === product._id}
                >
                  {spinnerProductId === product._id ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    "Add To Cart"
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
