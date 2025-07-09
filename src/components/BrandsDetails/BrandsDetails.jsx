import axios from 'axios'
import React from 'react'
import Spinner from '../Spinner./Spinner.'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

export default function BrandsDetails() {
    let {brandId} = useParams()
   async function brandsDetails({queryKey}) {

  let [key,brandId]=queryKey
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`)
  }

 let  {data:brand,isLoading} =useQuery(
    {
    queryKey:  ["brands details",brandId],
    queryFn: brandsDetails,
    select:(data)=>data.data.data
    }
  )
  // console.log(data);
  
  if (isLoading) {
      return <Spinner/>
    }
  return (
     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-gray-200 ">
        <img
          src={brand.image}
          alt={brand.name}
          className="w-40 h-40 object-contain mx-auto mb-6 transition-transform duration-300 hover:scale-105"
        />
        <h2 className="text-3xl font-extrabold text-blue-800 mb-2">{brand.name}</h2>
        <p className="text-gray-500 text-sm mb-4">Slug: <span className="text-gray-700 font-medium">{brand.slug}</span></p>
        <p className="text-xs text-gray-400">
          Created At: {new Date(brand.createdAt).toLocaleDateString()} <br />
          Last Updated: {new Date(brand.updatedAt).toLocaleDateString()}
        </p>

        <div className="mt-6">
         
        </div>
      </div>
    </div>
  );
  
}
