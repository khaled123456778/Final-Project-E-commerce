import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Categories from './../Categories/Categories';
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Spinner/Spinner.";



export default function CategorySlider() {
  // const [CategoryImgs, setgetCategoryImgs] = useState([])
   async function getCategoryImgs() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    
    
    // setgetCategoryImgs(data.data)
   
    
  }
  let  {data ,isLoading } = useQuery(
    {
      queryKey:["CategorySlider"],
      queryFn:getCategoryImgs
    }
  )
  // console.log(data);
  

  // useEffect(() => {
  //   getCategoryImgs()
  
  
   
  // }, [])
  


  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay:2000
  };

  if (isLoading) {
    return <Spinner/>
  }
  return (
<>
   <div className="mainSlider">
     <h2 className="text-lg text-slate-400  ">Shop Popular Categories</h2>
    <Slider {...settings} className=" overflow-hidden">
      {data?.data.data.map(
        (CategoryImg)=>
        <div  key={CategoryImg._id} className="">
       <img src={CategoryImg.image} alt="" className="w-full overflow-hidden h-[200px] object-cover" />
      </div>
    )}
      
  
    </Slider>
    
   </div>
   </>
  );
}