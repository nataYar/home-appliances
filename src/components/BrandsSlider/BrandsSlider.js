import React from 'react';
import './BrandsSlider.scss';
import { samsung, indesit, lg, bosch } from '../../Images/imgImports'

const brands = [ indesit, samsung, lg, bosch, lg, samsung, indesit,  bosch, lg, bosch, lg, samsung, indesit,  bosch, lg, bosch, lg, samsung, indesit,  bosch  ];

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
