import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Services.scss'
import { cookSm, refSm, drSm, freezSm, ovSm, washSm } from '../../Images/imgImports';

export default function Services() {
  const navigate = useNavigate()

  const servicesArray  = [
    {
      name: "Refrigerator Repair",
      img: refSm,
      link: "/services/refrigerator",
    },
    {
      name: "Dryer Repair",
      img: drSm,
      link: "/services/dryer",
    },
    {
      name: "Cooktop Repair",
      img: cookSm,
      link: "/services/cooktop",
    },
    {
      name: "Oven Repair",
      img: ovSm,
      link: "/services/oven",
    },
    {
      name: "Washer Repair",
      img: washSm,
      link: "/services/washer",
    },
    {
      name: "Freezer Repair",
      img: freezSm,
      link: "/services/freezer",
    },
  ]
    
  return (
   <>
      {
        servicesArray.map((el, key) => {
          return (
            <div className="" key={key}>
              <div className='services-small-img-container'>
                <img className='services-small-img-container' 
                src={`${el.img}`} alt="service picture" />
              </div>
              <h3>{el.name} </h3>
              <button className='button-standard' onClick={() => navigate(el.link)}>LEARN MORE</button>
            </div>
          )
        })
      }
    </>
  )
}
