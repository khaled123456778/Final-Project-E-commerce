import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../Spinner/Spinner.'



export default function Categories() {
   async function getCategories() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  }

 let  {data,isLoading} =useQuery(
    {
    queryKey:  ["all categories"],
    queryFn: getCategories,
    select:(data)=>data.data.data
    }
  )
  // console.log(data);

  if (isLoading) {
    return <Spinner/>
  }
  
  return (
<> <div className="min-h-screen bg-gray-100 py-10 px-4 ">
      <h2 className="text-3xl font-bold text-center text-slate-800 mb-10">
        Browse Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {data?.map((category) => (
          <Link to={`/CategoriesDetails`}>
          <div
            key={category._id}
            className="theme rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
          >
            <div className="overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                {category.name}
              </h3>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
</>
  )
}
