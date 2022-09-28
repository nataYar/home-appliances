import React, { useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaPhoneAlt, FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.scss';

export default function Navbar( ) {

  let pathname = useLocation();

  const navRef = useRef();

  const showNavBar = () => {
    navRef.current.classList.toggle('responsive-nav')
    }

  const hideNavBar = () => {
    navRef.current.classList.remove('responsive-nav')
  }
  
  return (
    <div className='nav-header'>
      <h3>LOGO</h3>
      
      <div className='phone-container'>
        <div>
          <a className='phone-icon' href="tel:+15625336324">
            <FaPhoneAlt />
          </a>
        </div>
        <h3>
          <a href="tel:+19292977775">(929)297-77-75</a>
        </h3>
      </div>
      

      <nav ref={navRef} className='navbar'>
        <NavLink
        onClick={() => hideNavBar()}
        to="/"
        className={"nav-link"}
        >home</NavLink>

        <NavLink
         onClick={() => hideNavBar()}
        to="/services"
        className={"nav-link"}
        >services</NavLink>

        <NavLink
         onClick={() => hideNavBar()}
        to="/blog"
        className={"nav-link"}
        >blog</NavLink>

        <NavLink 
         onClick={() => hideNavBar()}
        to="/testimonials"
        className={"nav-link"}
        >testimonials</NavLink>

        <button id='nav-close-btn' className='nav-btn' onClick={() => showNavBar()}>
          <FaTimes/>
        </button>
      </nav>
      <button className='nav-btn' onClick={() => showNavBar()}>
        <FaBars/>
      </button>
    </div>
  );
};
