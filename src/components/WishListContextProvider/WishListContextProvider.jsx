import React, { createContext, useContext, useState } from 'react'
import { TokenContext } from '../Context/TokenContextProvider';
import axios from 'axios';
import toast from 'react-hot-toast';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
  export let wishListContext = createContext()
export default function WishListContextProvider({children}) {

let wishListQueryClient=useQueryClient()
const [wishListToggleLoading, setwishListToggleLoading] = useState(null)

const {token,userId,setUserId} = useContext(TokenContext)
const [wishListItems, setWishListItems] = useState([]); 
const [spinnerProductId, setSpinnerProductId] = useState(null);


const [isLoadingBtn, setisLoading] = useState(false)
// const [isInWishList, setisInWishList] = useState(false)





async function wishListAlert(productId,token) {
  let flag = await addToWishList(productId,token)

  if (flag) {
    toast.success(' Product added successfully to your wishlist');
    setisInWishList(true)
    return true
  } else {
    toast.error('This is an error!');
    return false
  }
}

  async function deleteWishListAlert(id) {
// setspinner(true)

  let flag = await deleteWishListItem(id)
 if (flag) {
     toast.success(' Deleted Successfully ');
 
   } else {
    console.log(flag);
    
     toast.error('This is an error!');
   }
  //  setspinner(false)
   
  }

   async function addToWishList(productId ,token) {
  
  try {
    setwishListToggleLoading(productId)
    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      { productId },
      { headers: { token } }
    );

    setWishListItems((myArr) => {return [...myArr, productId]}); 
    return true
// console.log(data);




  } catch (error) {
    console.error(error);
    return false
    
  }finally{setwishListToggleLoading(null)}
  
}

 async function deleteWishListItem(id) {
 try {
   setwishListToggleLoading(id)
   
  let {data}= await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers:{token}})
setWishListItems((myArr) => {
  return myArr.filter((itemId) => itemId !== id);
});

   console.log(data);
   
    //    setNumOfCart(data.numOfCartItems)
    //  setTotalPrice(data.data.totalCartPrice)
    //  setCartproduct(data.data.products)
    //  console.log(data);
    wishListQueryClient.invalidateQueries(['wishList']);
return true
     

 } catch (error) {
  console.error(error);
  return false

  
 }
 finally{setwishListToggleLoading(null)}
}



async function wishListToggle(productId, token) {
  const isInWishList = wishListItems.includes(productId);

  try {
    if (isInWishList) {
      if (await deleteWishListItem(productId)) {
        toast.success("removed successfully from wishlist ✅");
      } else {
        toast.error("there is an error ❌");
      }
    } else {
      if (await addToWishList(productId, token)) {
        toast.success("added successfully to wishlist ✅");
      } else {
        toast.error("there is an error ❌");
      }
    }
  } catch (error) {
    toast.error("unexpected error ❌");
    console.error(error);
  }
}



   




  return (
    
   <wishListContext.Provider value={{addToWishList,isLoadingBtn,wishListToggle, wishListItems,spinnerProductId,setSpinnerProductId,setwishListToggleLoading,wishListToggleLoading}}>
    {children}
   </wishListContext.Provider>
  )
}
