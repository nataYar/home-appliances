import React from 'react';
import './BrandsSlider.scss';
import { gorenje, aeg, panasonic, siemens, zanussi , whirlpool, miele, samsung, indesit, lg, bosch, liebherr,  } from '../../Images/imgImports'

const brands = [ gorenje, aeg, panasonic, siemens, zanussi , whirlpool, miele, samsung, indesit, lg, bosch, liebherr  ];

export default function BrandsSlider() {
    return (
      <div className="brands-wrapper">
      {
        brands.map((el , key)=> (
          <div className='brand-img-container' key={key}>
            <div>
              <img
              alt='brand name'
                src={el}
                key={el}
              />
            </div>
           
          </div>
        ))
      }
      </div>
    )
  }
