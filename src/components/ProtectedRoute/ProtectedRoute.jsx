import React, { useContext } from 'react'
import { TokenContext } from './../Context/TokenContextProvider';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({children}) {
  let {token}=useContext(TokenContext)

  if (token) {
    return children
  } else {
    return<Navigate to={"/login"}/> 
    
  }
  // return (
  //   <div>ProtectedRoute</div>
  // )
}
