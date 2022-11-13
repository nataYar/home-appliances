import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.scss';
import { ScheduleCallForm, Services, BrandsSlider, Testimonials } from '../../components/importsComponents';
import { default as mask } from './bagdes/mask.svg';
import { default as gloves } from './bagdes/gloves.svg';
import { cookSm, refSm, drSm, freezSm, ovSm, washSm } from '../../Images/imgImports';


export default function Home() {
  const [scheduleFormVisible, setScheduleFormVisible] = useState(false);

  const navigate = useNavigate();

  const openScheduleCallForm = () => {
    setScheduleFormVisible(!scheduleFormVisible)
  }

  return (
    <div className='home-container'>
      {/* INTRO_____________________________________ */}
      <section className='section-home-intro'>
        <div>
          <h1>CITY TECH</h1>
          <h3>Appliance Repair</h3>
        </div>
        <button 
         className="sc-button" role="button"
          onClick={e => openScheduleCallForm(e)} 
        >Schedule a call</button>
        <ScheduleCallForm scheduleFormVisible={scheduleFormVisible} callbackCloseScheduleForm={openScheduleCallForm } />
      </section>

      {/* BADGES_____________________________________ */}
      <section className='badges'>
        <div className='badges-container'>
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
      </section>
      
      {/* <button className='services-btn' onClick={() => navigate('/services')}>See our services</button> */}
      <section className='services'>
        <h2>Services</h2>
        <Services />
      </section>

      {/* BENEFITS___________________________________ */}
      <section className='section-benefits'>
        <h2>Why choose us?</h2> 
        <ul className='benefits-list'>
          <li>
            <div className='benefits-list_img-wrapper'>
             lo
              <img src="" alt="" />
            </div>
            <div className='benefits-list_text'>
              <p>Same Day Service</p>
            </div>
          </li>
          <li>
            <div className='benefits-list_img-wrapper'>
              <img src="" alt="" />
            </div>
            <div className='benefits-list_text'>
              <p>30 Day Warranty on labor</p>
            </div>
          </li>
          <li>
            <div className='benefits-list_img-wrapper'>
              <img src="" alt="" />
            </div>
            <div className='benefits-list_text'>
              <p>90 Day Warranty on installed parts</p>
            </div>
          </li>
          <li>
            <div className='benefits-list_img-wrapper'>
              <img src="" alt="" />
            </div>
            <div className='benefits-list_text'>
              <p>No Extra Charge On Weekends or Holidays</p>
            </div>
          </li>
        </ul>
      </section>

     {/* BRANDS___________________________________ */}
      <section className="brands">
        <h2>Brands</h2> 
        <BrandsSlider />
      </section>

      {/* TESTIMONIALS___________________________________ */}
      <section className='testimonials'>
        <h2>Testimonials</h2> 
        <div>
          <Testimonials />
        </div>
      </section>

      {/* CONTACTS___________________________________ */}
      <section className='contacts'>
        <h2>Contacts</h2> 
        <div className='contacts-address'>
          <p>Prins Hendrikkade 48A</p>
          <p>1012 AC Amsterdam</p>
          <p>The Netherlands</p>
        </div>
        <div className='contacts-contact'>
          <a href="mailto:n.yarysheva@gmail.com">n.yarysheva@gmail.com</a>
          <br></br>
          <a href="tel:+19292977775">(929)297-77-75</a>
        </div>
        <button 
         className="sc-button contacts-button" role="button"
          onClick={e => openScheduleCallForm(e)} 
        >Schedule a call</button>
      </section>
    </div>
  )
}
