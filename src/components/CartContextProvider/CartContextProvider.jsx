import axios from 'axios'
import React, { createContext, useContext, useState } from 'react'
import { TokenContext } from '../Context/TokenContextProvider'
import toast from 'react-hot-toast'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query';



export let CartContext = createContext()


export default function CartContextProvider({children}) {
  const [cartProducts, setCartproduct] = useState(0)
  const [numOfCart, setNumOfCart] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
 const [isLoading, setisLoading] = useState(false)
 const [ispinner, setspinner] = useState(false)
 const [cartId, setCartId] = useState("")
 const [userOrder, setuserOrder] = useState(null)
 const [productId, setProductId] = useState(null)
 const queryClient = useQueryClient();

 

  
const {token,userId,setUserId} = useContext(TokenContext)


 async function addToCart(productId ,token) {
  
  try {
    setisLoading(true)
    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { productId },
      { headers: { token } }
    );
console.log(data.cartId);
setCartId(data.cartId)
  setNumOfCart(data.numOfCartItems)
     setTotalPrice(data.data.totalCartPrice)
     setCartproduct(data.data.products)
      queryClient.invalidateQueries(['cart']);
console.log(cartId);


   

  
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }finally{setisLoading(false)}
}

async function showAlertKobry(productId,token) {
  let flag =  await addToCart(productId,token)

  if (flag) {
    toast.success(' Added Successfully ');
  } else {
    toast.error('This is an error!');
  }
}









 async function deleteCartItem(id) {
 try {
      setspinner(true)
  let {data}= await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{headers:{token}})
  

       setNumOfCart(data.numOfCartItems)
     setTotalPrice(data.data.totalCartPrice)
     setCartproduct(data.data.products)
     console.log(data);
      queryClient.invalidateQueries(['cart']);
     return true
     

 } catch (error) {
  console.log(error);
  return true
  
 }finally{setspinner(false)}}


  async function deleteCartKobry(id) {
// setspinner(true)

  let flag = await deleteCartItem(id)
 if (flag) {
     toast.success(' Deleted Successfully ');
   } else {
     toast.error('This is an error!');
   }
  //  setspinner(false)
   
  }

   async function updateCart(id,count) {

   try {
     let{data}= await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count},{headers:{token}})
        setNumOfCart(data.numOfCartItems)
     setTotalPrice(data.data.totalCartPrice)
     setCartproduct(data.data.products)
     console.log(data);
      queryClient.invalidateQueries(['cart']);
     return true
     
   } catch (error) {
    console.log(error);
    return false
    
   }

  }

  async function updateKobry(id,count) {
    setisLoading(true)
    let flag = await updateCart(id,count)
   if (flag) {
     toast.success(' Updated Successfully ');
   } else {
     toast.error('This is an error!');
   }
   setisLoading(false)
  }

   async function clearCart(token) {
   try {
     let {data}= await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers:{token}})
        setNumOfCart(0)
     setTotalPrice(0)
     setCartproduct(0)
     console.log(data);
      queryClient.invalidateQueries(['cart']);
     
   } catch (error) {
    console.log(error);
    
   }
  }

    async function getUserOrders() {
  try {

     setisLoading(true)
    return  await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
 
 console.log(data);

 
 setuserOrder(data)
 
    
     

    
    
  } catch (error) {
    console.log(error);
    console.log(id);
   
    
    
  }finally{ setisLoading(false)}
}
async function getCart() {
  // try {
  //   setisLoading(true);

    return await axios.get(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: {
          token,
        },
      }
    );

  //   setCartproduct(data.data.products);
  //   setNumOfCart(data.numOfCartItems);
  //   setTotalPrice(data.data.totalCartPrice);
  //   setCartId(data.data._id);

  //   return data; // مهم علشان React Query تستخدمه
  // } catch (error) {
  //   console.error("Error fetching cart:", error);
  //   throw error;
  // } finally {
  //   setisLoading(false);
  // }
}



  

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




  return (
<CartContext.Provider value={{addToCart,token,getCart,cartProducts,numOfCart,totalPrice,isLoading,deleteCartItem,deleteCartKobry,ispinner,updateCart,updateKobry,clearCart,cartId,showAlertKobry ,getUserOrders,productId}} >
  {children}
</CartContext.Provider>
  )
}
