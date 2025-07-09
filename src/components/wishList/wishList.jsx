import axios from 'axios'
import React, { useContext } from 'react'
import { CartContext } from '../CartContextProvider/CartContextProvider'
import { TokenContext } from '../Context/TokenContextProvider'
import { useMutation, useQuery } from '@tanstack/react-query'
import Spinner from '../Spinner./Spinner.'
import { wishListContext } from '../WishListContextProvider/WishListContextProvider'

export default function WishList() {
let {token} =useContext(TokenContext)
let {deleteWishListAlert,isLoadingBtn} =useContext(wishListContext)

  function getUserWishList() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",{headers:{token}})
  }

  let{data:wishListProducts,isLoading,isError,isFetching}=useQuery(
    {
      queryKey:["wishList"],
      queryFn:getUserWishList,
      select:(data)=>data.data.data
    }
  )
 
 

//  const { mutate, isPending, isSuccess, error } = useMutation({
//     mutationFn: addWishlist,
//     onSuccess: () => {
//       alert("تم إضافة المنتج إلى المفضلة ✅");
//     },
//     onError: (err) => {
//       alert("فشل الإضافة ❌");
//       console.error(err);
//     }
//   });
  

 if (isLoading) return <Spinner/>;

  if (isError) return <p className="text-red-500 text-center mt-10">there is an error</p>;
  

 
 
 return (
  <div className="container mx-auto px-4 py-10">
    <h2 className="text-3xl font-extrabold text-center text-slate-800 mb-10">
      ❤️ Your Wishlist
    </h2>

    {wishListProducts.length === 0 ? (
      <div className="text-center mt-16">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
          alt="Empty wishlist"
          className="w-32 h-32 mx-auto mb-6 animate-bounce"
        />
        <p className="text-gray-500 text-lg">Your wishlist is currently empty 🥲</p>
        <p className="text-sm text-gray-400">Start adding your favorite products!</p>
      </div>
    ) : (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {wishListProducts.map((product) => (
          <div
            key={product._id}
            className="theme rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 relative group overflow-hidden border"
          >
            {/* Product Image */}
            <div className="relative overflow-hidden">
              <img
                src={product.imageCover}
                alt={product.title}
                className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded shadow">
                ❤️ Favorite
              </div>
            </div>

            {/* Product Details */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2">
                {product.title}
              </h3>
              <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                {product.description.split('\n')[0]}
              </p>

              <div className="flex items-center justify-between mb-4">
                <span className="text-green-600 font-bold">{product.price} EGP</span>
                <span className="text-yellow-500 text-sm flex items-center gap-1">
                  ⭐ {product.ratingsAverage}
                </span>
              </div>

              {/* Delete Button */}
              <button
                onClick={ () =>  deleteWishListAlert(product._id)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium text-sm transition-all duration-300 cursor-pointer"
              >{isLoadingBtn?<i className="fas fa-spinner fa-spin"></i>:"Remove from Wishlist 🗑️"}
                
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);


}
