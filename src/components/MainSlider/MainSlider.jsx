import React from "react";
import Slider from "react-slick";
import img1 from "../../assets/finalProject assets/images/grocery-banner.png";
import img2 from "../../assets/finalProject assets/images/grocery-banner-2.jpeg";
import img3 from "../../assets/finalProject assets/images/slider-image-3.jpeg";

export default function MainSlider() {
  let settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:2000
  };
  return (
   <div className="grid grid-cols-[2fr_1fr]  my-4 ">
     <Slider {...settings} className="overflow-hidden">
      <div>
          <img src={img1} className="w-full h-[400px] object-cover " alt="Banner 1 " />
        </div>
      
     
       
    
    </Slider>
      <div className="sideImg overflow-hidden">
        <div>
          <img src={img2} className="w-full h-[200px] object-cover" alt="Banner 2" />
        </div>
         <div>
          <img src={img3} className="w-full h-[200px] object-cover" alt="Banner 1" />
        </div>
      
   
   </div>
      </div>
  );
}