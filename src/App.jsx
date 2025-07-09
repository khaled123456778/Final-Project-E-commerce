import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Products from './components/Products/Products';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import Login from './components/Login/Login';
import Register from './components/register/register';


import NotFound from './components/notFound/notFound';
import TokenContextProvider from './components/Context/TokenContextProvider';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from './components/CartContextProvider/CartContextProvider';
import { Toaster } from 'react-hot-toast';
import Payement from './components/Payement/Payement';
import Allorders from './components/allorders/allorders';

import
 {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import CategoriesDetails from './components/CategoriesDetails/CategoriesDetails';
import BrandsDetails from './components/BrandsDetails/BrandsDetails';
import WishList from './components/wishList/wishList';
import WishListContextProvider from './components/WishListContextProvider/WishListContextProvider';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetCode from './components/VerifyResetCode/verifyResetCode';
import VerifyResetCode from './components/VerifyResetCode/verifyResetCode';
import ResetPassword from './components/ResetPassword/ResetPassword';
import ChangeUserAccount from './components/ChangeUserAccount/ChangeUserAccount';
import ChangeUserPassword from './components/ChangeUserPassword/ChangeUserPassword';


 let client = new QueryClient()
 
  
export default function App() {
  
  const router = createBrowserRouter(
    [
    {path:"/",element:<Layout/>,

      
    children:[
      {path:"/home",element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path:"/Cart",element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:"/Products",element:<ProtectedRoute><Products/></ProtectedRoute>},
      {path:"/Categories",element:<ProtectedRoute><Categories/></ProtectedRoute>},
      {path:"/CategoriesDetails",element:<ProtectedRoute><CategoriesDetails/></ProtectedRoute>},
      {path:"/Brands",element:<ProtectedRoute><Brands/></ProtectedRoute>},
      {path:"/BrandsDetails/:brandId",element:<ProtectedRoute><BrandsDetails/></ProtectedRoute>},
      {path:"/WishList",element:<ProtectedRoute><WishList/></ProtectedRoute>},
      {path:"/payement",element:<ProtectedRoute><Payement/></ProtectedRoute>},
      {path:"/allorders",element:<ProtectedRoute><Allorders/></ProtectedRoute>},
      // {index: true, element: <ProtectedRoute><Register /></ProtectedRoute>},
      {path:"/Register", element:<Register />},
      {index:true, element: <Login/>},
      {path:"/login", element:<Login />},
      {path:"/ForgotPassword", element:<ForgotPassword/>},
      {path:"/verifyResetCode", element:<VerifyResetCode/>},
      {path:"/ResetPassword", element:<ResetPassword/>},
      {path:"/ChangeUserAccount", element:<ChangeUserAccount/>},
      {path:"/ChangeUserPassword", element:<ChangeUserPassword/>},
      {path:"/ProductDetails/:id/:category",element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path:"*",element:<NotFound/>}

    ]


  }
]
  );
  return (


     <TokenContextProvider>
      <QueryClientProvider client={client}>
<CartContextProvider>

  <WishListContextProvider>
<RouterProvider router={router} />
 <Toaster />

  </WishListContextProvider>

   </CartContextProvider>

      </QueryClientProvider>
   
   
   


   </TokenContextProvider>

    
   



  )
}
