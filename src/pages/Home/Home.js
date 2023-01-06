import React, { useState, useEffect, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.scss';
import './Home-mq.scss';
import { default as mask } from './bagdes/mask.svg';
import { default as gloves } from './bagdes/gloves.svg';
import Navbar from '../../components/Navbar/Navbar';
const Services = lazy(() => import('../../components/Services/Services'));
const ScheduleCallForm = lazy(() => import('../../components/ScheduleCallForm/ScheduleCallForm'));
const BrandsSlider = lazy(() => import('../../components/BrandsSlider/BrandsSlider'));
const Testimonials = lazy(() => import('../../components/Testimonials/Testimonials'));
const Blog = lazy(() => import('../../components/Blog/Blog'));

export default function Home() {
  const [scheduleFormVisible, setScheduleFormVisible] = useState(false);

  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  const navigate = useNavigate();

  const openScheduleCallForm = () => {
    setScheduleFormVisible(!scheduleFormVisible)
  }

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount



  return (
    <div id='home' className='home-container'>
       <Navbar windowSize={windowSize.width} callbackCloseScheduleForm={ openScheduleCallForm } />
      {/* INTRO_____________________________________ */}
      <section className='section-home-intro'>
       
        <div className='section-home-intro-text'>
          <h1>CITY TECH</h1>
          <h3>appliance repair</h3>
        </div>
        {
          windowSize.width < 1024 ?
          <button 
          className="sc-button"
            onClick={e => openScheduleCallForm(e)} 
          >Schedule A Call</button>
          : null
        }
        
        <ScheduleCallForm scheduleFormVisible={scheduleFormVisible} callbackCloseScheduleForm={openScheduleCallForm } />
      </section>
      {/* BADGES_____________________________________ */}
      <section className='badges'>
        <div className='badges-container'>
          <div>
            <img className='badge-about-us' alt=''
            src={require('./bagdes/vaccine.png')}
            />
          </div>
          <div>
            <img className='badge-about-us mask' alt=''
              src={mask} 
              />
          </div>
          <div>
            <img className='badge-about-us shoecover' alt=''
            src={require('./bagdes/shoecover.png')} 
            />
          </div>
          <div>
            <img className='badge-about-us gloves' alt=''
            src={gloves} 
            />
          </div>
        </div>
        <h3>All the technicians work wearing gloves, shoe covers and face masks to protects you from COVID-19</h3>  
      </section>
      
      <section className='howItWorks'>
        <h2>How it works</h2>
        <div className='howItWorks_content'>
          <div>
            <div className='numberHIW'>1</div>
            <div className='headerHIW'>Book an appointment</div>
            <div className='textHIW'> Describe the issue with the unit, and our technician will arrive on a scheduled window.</div>
          </div>
          <div>
            <div className='numberHIW midBlue'>2</div>
            <div className='headerHIW'>Diagnostics</div>
            <div className='textHIW'>Our technician will honestly inspect the appliance, determine whether the appliance is worth repairing and give you a repair estimate.</div>
          </div>
          <div>
            <div className='numberHIW lightBlue'>3</div>
            <div className='headerHIW'>Repair</div>
            <div className='textHIW'>Once approved our technician can proceed with the repair.</div>
          </div>
        </div>
       
      </section>

      {/* BENEFITS___________________________________ */}
      <section className='section-benefits'>
        <h2>Why choose us?</h2> 
        <ul className='benefits-list'>
          <li>
            <div className='benefits-list_img-wrapper'>
              <img src={require('../../Images/whyChooseUs/cup1.png')}  alt="cup" />
            </div>
            <div className='benefits-list_text'>
              <h3>10 years experience in appliance repair</h3>
              <p>Quick work of licensed, insured and highly experienced technicians</p>
            </div>
          </li>
          <li>
            <div className='benefits-list_img-wrapper'>
              <img src={require('../../Images/whyChooseUs/heart.png')}  alt="" />
            </div>
            <div className='benefits-list_text'>
              <h3>Instant Response</h3>
              <p>Our team is always available to talk to you and answers to any of your questions</p>
            </div>
          </li>
          <li>
            <div className='benefits-list_img-wrapper'>
              <img src={require('../../Images/whyChooseUs/man3.png')}  alt="" />
            </div>
            <div className='benefits-list_text'>
              <h3>Professional Quality Service</h3>
              <p>We are committed to customer services excellence. We value each customer and treat you and your home with respect and care</p>
            </div>
          </li>
        </ul>
      </section>

      <section id="services" className='services'>
        <h2>Services</h2>
        <Services />
      </section>

      {/* TESTIMONIALS___________________________________ */}
      <section id='testimonials' className='testimonials'>
        <h2>Testimonials</h2> 
          <Testimonials />
      </section>

       {/* BLOG___________________________________  */}
       <section id="blog" className='blog'>
        <h2>Blog</h2> 
        <Blog numOfArticles='6' />
        <button className='button-standard' onClick={() => navigate('/blog', {state:{windowSize: windowSize}} )}>SEE ALL ARTICLES</button>
      </section>
      
      {/* BRANDS___________________________________ */}
      <section id='brands' className="brands">
        <h2>Brands</h2> 
        <BrandsSlider />
        <button className='button-standard margin-top' onClick={() => navigate('/brands', {state:{windowSize: windowSize}} )}>SEE ALL BRANDS</button>
      </section>
      
      {/* HOURS___________________________________ */}
      <section className="timetable">
        <div>
          <table>
            <thead>
              <tr>
                <td>Day</td>
                <td>Hours of operation</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Monday-Friday</td>
                <td>8:00 am - 7:00 pm</td>
              </tr>
              <tr>
                <td>Saturday-Sunday</td>
                <td>8:00 am - 6:00 pm</td>
              </tr>
            </tbody> 
          </table>
        </div>
      </section>

      {/* PRICES___________________________________  */}
      <section id="prices" className="prices">
        <h2>Our fees</h2>
        <div className='prices-container'>

         <div className='prices-container_item'>
          <div>Appliance Diagnostic</div>
          <div className='prices-container_item-price'>
            <p className='prices-container_item-number'>$79</p>
            <p className='prices-container_item-text'>diagnostic</p>
          </div>
         </div>

         <div className='prices-container_item'>
          <div>Standard Brand Appliance Repair</div>
          <div className='prices-container_item-price'>
            <p className='prices-container_item-text'>from</p>
            <p className='prices-container_item-number'>$ 179</p>
            <p className='prices-container_item-text'>+ parts</p>
          </div>
         </div>

         <div className='prices-container_item'>
          <div>Premium Brand Appliance Repair</div>
          <div className='prices-container_item-price'>
            <p className='prices-container_item-text'>from</p>
            <p className='prices-container_item-number'>$ 229</p>
            <p className='prices-container_item-text'>+ parts</p>
          </div>
         </div>

         <div className='prices-container_item'>
          <div>Luxury Brand Appliance Repair</div>
          <div className='prices-container_item-price'>
            <p className='prices-container_item-text'>from</p>
            <p className='prices-container_item-number'>$ 369</p>
            <p className='prices-container_item-text'>+ parts</p>
          </div>
         </div>
        </div>
      </section>

      {/* CONTACTS___________________________________ */}
      <section id="contacts" className='contacts'>
        <h2>Contacts</h2> 
        <div className='contacts_info-container'>
          <div className='contacts-address'>
            <p>Prins Hendrikkade 48A</p>
            <p>1012 AC Hogwarts</p>
            <p>The Neverland</p>
          </div>
          <div className='contacts-contact'>
            <a href="mailto:n.yarysheva@gmail.com">n.yarysheva@gmail.com</a>
            <br></br>
            <a href="tel:+19292977775">(929) 297-7775</a>
          </div>
        </div>
        
        <button 
         className="sc-button contacts-button"
          onClick={e => openScheduleCallForm(e)} 
        >Schedule a call</button>
      </section>
    </div>
  )
}
