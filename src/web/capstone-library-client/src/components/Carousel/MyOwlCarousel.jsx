import React from 'react'
import ReactOwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


export default function MyOwlCarousel({listItem}) {
  return (
    <ReactOwlCarousel items={4}  
    className="owl-theme"  
    loop  
    nav  
    margin={8}>
      {listItem}
    </ReactOwlCarousel>
  )
}
