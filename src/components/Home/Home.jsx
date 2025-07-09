import React from 'react'
import ProductCard from '../ProductCard/ProductCard'
import Slider from 'react-slick'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'


export default function Home() {
  return (<>

  <MainSlider/>
<CategorySlider/>
   <ProductCard/>
 
  </>
   
  )
}
