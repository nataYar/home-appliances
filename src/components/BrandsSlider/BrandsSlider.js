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
      // <ImageGallery items={sliderImages} />
      <div className='row'>
        {/* <div className="header">
          <div className="progress-bar"></div>
        </div> */}

        <div className="container">
          <button className="handle left-handle">
            <div className="text">&#8249;</div>
          </button>
          <div className="slider">
            <div>
              <img src="https://via.placeholder.com/210/00FF00?text=1"/>
              <img src="https://via.placeholder.com/220/00FF00?text=2"/>
            </div>
            <div>
              <img src="https://via.placeholder.com/210/00FF00?text=3"/>
              <img src="https://via.placeholder.com/220/00FF00?text=4"/>
            </div>
            <div>
              <img src="https://via.placeholder.com/210/00FF00?text=5"/>
              <img src="https://via.placeholder.com/220/00FF00?text=6"/>
            </div>
            
            {/* <img src="https://via.placeholder.com/230/00FF00?text=3"/>
            <img src="https://via.placeholder.com/240/00FF00?text=4"/>
            <img src="https://via.placeholder.com/250/00FF00?text=5"/>
            <img src="https://via.placeholder.com/260/00FF00?text=6"/>
            <img src="https://via.placeholder.com/270/00FF00?text=7"/>
            <img src="https://via.placeholder.com/280/00FF00?text=8"/>
            <img src="https://via.placeholder.com/250/00FF00?text=9"/>
            <img src="https://via.placeholder.com/260/00FF00?text=10"/>
            <img src="https://via.placeholder.com/270/00FF00?text=11"/>
            <img src="https://via.placeholder.com/280/00FF00?text=12"/> */}
          </div>
          <button className="handle right-handle">
            <div className="text">&#8250;</div>
          </button>
        </div>
      </div>
    )
  }
