import React from 'react';
// import { useNavigate } from 'react-router-dom';
import './Services.scss'
import { cookSm, refSm, drSm, freezSm, ovSm, washSm } from '../../Images/imgImports';
import './Services.scss';

export default function Services() {
  // const navigate = useNavigate()

  const servicesArray  = [
    {
      name: "Refrigerator ",
      img: refSm,
      // link: "/services/refrigerator",
    },
    {
      name: "Dryer ",
      img: drSm,
      // link: "/services/dryer",
    },
    {
      name: "Cooktop ",
      img: cookSm,
      // link: "/services/cooktop",
    },
    {
      name: "Oven ",
      img: ovSm,
      // link: "/services/oven",
    },
    {
      name: "Washer ",
      img: washSm,
      // link: "/services/washer",
    },
    {
      name: "Freezer ",
      img: freezSm,
      // link: "/services/freezer",
    },
  ]
    
  return (
   <div className='services-container'>
      {
        servicesArray.map((el, key) => {
          return (
            <div className='service-box' key={key} >
                <h3>{el.name} <br></br> Repair</h3>
                
                {/* <button className='button-standard' onClick={() => navigate(el.link)}>LEARN MORE</button> */}
                <div className='service-box_small-img-container'>
                  <img
                  src={`${el.img}`} />
                </div>
            </div>
          )
        })
      }
    </div>
  )
}
