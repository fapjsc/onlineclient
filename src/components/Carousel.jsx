import React from 'react';
import Slider from 'react-slick';

import carousel1 from '../assets/carousel-1.jpg';
import carousel2 from '../assets/carousel-2.jpg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {
  const settings = {
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    adaptiveHeight: true,
    dots: false,
  };
  return (
    <Slider {...settings}>
      <img src={carousel1} alt="carousel1" />
      <img src={carousel2} alt="carousel2" />
    </Slider>
  );
};

export default Carousel;
