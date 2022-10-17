import React from 'react';
import ImageGallery from 'react-image-gallery';
import './BrandsSlider.scss';
import {samsung} from '../../Images/imgImports'

const sliderImages = [
  {
    original: '../../Images/SliderImages/bosch.png',
    thumbnail: '../../Images/SliderImages/bosch.png',
  },
  {
    original: '../../Images/SliderImages/bosch.png',
    thumbnail: '../../Images/SliderImages/bosch.png',
  },
];

export default function BrandsSlider() {
    return (
      <ImageGallery items={sliderImages} />
    )
  }
