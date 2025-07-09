import React, { createContext, useState } from 'react'

 export let TokenContext = createContext()
export default function TokenContextProvider({children}) {
const [token, setToken] = useState(localStorage.getItem("token"));
const [userId, setUserId] = useState(localStorage.getItem("id"));
   const [logedUser, setlogedUser] = useState(false)
  return (
    <TokenContext.Provider value={{setToken,token,logedUser,setlogedUser,userId,setUserId}}>
{children}
    </TokenContext.Provider>
  )
}
