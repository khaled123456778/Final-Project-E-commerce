import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import Spinner from '../Spinner./Spinner.';
import { Link, useParams } from 'react-router-dom';

export default function Brands() {

   async function getCategories() {
    
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
  }

 let  {data:brands,isLoading} =useQuery(
    {
    queryKey:  ["brands"],
    queryFn: getCategories,
    select:(data)=>data.data.data
    }
  )


  if (isLoading) {
    return <Spinner/>
  }
    return (
    <div className="bg-gray-50 py-12 px-4 min-h-screen ">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Our Top Brands
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 ">
        {brands?.map((brand) => (
          <Link to={`/BrandsDetails/${brand._id}`}>
          <div
            key={brand._id}
            className=" rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer dark:bg-slate-800"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="w-24 h-24 object-contain mb-3"
            />
            <h3 className="text-md font-medium  dar:text-blue-700">{brand.name}</h3>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
