import React, { createContext, useState } from 'react'
export let counterContext= createContext()


export default function ContextCounterProvider({children}) {
console.log(children);



  return (
  < counterContext.Provider value={{logedUser,setlogedUser}}>
{children}
  </counterContext.Provider>
  )
}
