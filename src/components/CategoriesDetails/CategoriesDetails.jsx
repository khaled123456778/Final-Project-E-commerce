import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom';

export default function CategoriesDetails() {
//  let {categoryId} =useParams()
   async function getSubCategories() {

    return await axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories`)
    
  }

 let  {data} =useQuery(
    {
    queryKey:  ["sub categories"],
    queryFn: getSubCategories,
    select:(data)=>data.data.data
 
    }
  )

  
  return (
  
    <div className="bg-gray-100 py-10 px-4 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Explore Our Categories
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.map((category) => (
          <div
            key={category._id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300"
          >
          
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
              <p className="text-sm text-gray-500 mt-1">Slug: {category.slug}</p>
              <p className="text-xs text-gray-400 mt-1">
                
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


