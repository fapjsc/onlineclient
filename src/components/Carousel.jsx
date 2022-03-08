import React from 'react';

import { Swiper, Image } from 'antd-mobile';

import carousel1 from '../assets/carousel-1.webp';
import carousel2 from '../assets/carousel-2.webp';

import useWindowSize from '../hooks/useWindowSize';

const Carousel = () => {
  const [height] = useWindowSize();

  const images = [carousel1, carousel2];

  const items = images.map((image) => (
    <Swiper.Item key={image}>
      <Image
        lazy
        src={image}
        alt="carousel"
        width="100%"
        height={height / 4}
        placeholder={<div />}
      />
    </Swiper.Item>
  ));

  return (
    <Swiper autoplay loop indicator={() => null}>
      {items}
    </Swiper>
  );
};

export default Carousel;
