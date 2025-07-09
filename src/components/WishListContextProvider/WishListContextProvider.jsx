import React, { createContext, useContext, useState } from 'react'
import { TokenContext } from '../Context/TokenContextProvider';
import axios from 'axios';
import toast from 'react-hot-toast';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
  export let wishListContext = createContext()
export default function WishListContextProvider({children}) {

let wishListQueryClient=useQueryClient()

const {token,userId,setUserId} = useContext(TokenContext)
const [isLoadingBtn, setisLoading] = useState(false)



   async function addToWishList(productId ,token) {
  
  try {
    setisLoading(true)
    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      { productId },
      { headers: { token } }
    );
console.log(data);

   


    return true;
  } catch (error) {
    console.error(error);
    return true;
  }finally{setisLoading(false)}
  
}

async function wishListAlert(productId,token) {
  let flag = await addToWishList(productId,token)

  if (flag) {
    toast.success(' Product added successfully to your wishlist');
    setisInWishList(true)
  } else {
    toast.error('This is an error!');
  }
}

 async function deleteWishListItem(id) {
 try {
   setisLoading(true)
   
  let {data}= await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers:{token}})
  
   
    //    setNumOfCart(data.numOfCartItems)
    //  setTotalPrice(data.data.totalCartPrice)
    //  setCartproduct(data.data.products)
    //  console.log(data);
    wishListQueryClient.invalidateQueries(['wishList']);
 
     return true
     

 } catch (error) {
  console.log(error);
  return false
  
 }
 finally{setisLoading(false)}
}


  async function deleteWishListAlert(id) {
// setspinner(true)

  let flag = await deleteWishListItem(id)
 if (flag) {
     toast.success(' Deleted Successfully ');
 
   } else {
     toast.error('This is an error!');
   }
  //  setspinner(false)
   
  }
//    function toggleWishList(productId, token) {
//   if (isInWishList) {
//     wishListAlert(productId, token);
//   } else {
//     deleteWishListAlert(productId);
//   }
// }



  return (
    
   <wishListContext.Provider value={{addToWishList,wishListAlert,deleteWishListAlert,isLoadingBtn}}>
    {children}
   </wishListContext.Provider>
  )
}
