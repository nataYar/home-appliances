import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.scss';
import { ScheduleCallForm } from '../../components/importsComponents';
import { default as mask } from './bagdes/mask.svg';
import { default as gloves } from './bagdes/gloves.svg';

export default function Home() {
  const [scheduleFormVisible, setScheduleFormVisible] = useState(false);

  const navigate = useNavigate();

  const openScheduleCallForm = () => {
    setScheduleFormVisible(!scheduleFormVisible)
    console.log(scheduleFormVisible)
  }

  return (
    <section className='home-container'>
      <div className='home-title'>
        <div>
          <h1>CITY TECH</h1>
          <h1>HVAC & Appliance Repair</h1>
        </div>
        <button id='schedule-call-btn'
        onClick={e => openScheduleCallForm(e)} 
        >Schedule a call</button>
        <ScheduleCallForm scheduleFormVisible={scheduleFormVisible} callbackCloseScheduleForm={openScheduleCallForm } />
      </div>
      <div className='badges-section'>
        <div className='badges'>
          <div>
            <img className='badge-about-us' 
            src={require('./bagdes/vaccine.png')}
            />
          </div>
          <div>
            <img className='badge-about-us mask' 
              src={mask} 
              />
          </div>
          <div>
            <img className='badge-about-us shoecover' 
            src={require('./bagdes/shoecover.png')} 
            />
          </div>
          <div>
            <img className='badge-about-us gloves'
            src={gloves} 
            />
          </div>
        </div>
        <h6>All the technicians work wearing gloves, shoe covers and face masks to protects you from COVID-19</h6>  
      </div>
      <button className='services-btn' onClick={() => navigate('/services')}>See our services</button>
    </section>
  )
}
