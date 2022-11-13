import React, { useState, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaPhoneAlt, FaTimes, FaBars } from 'react-icons/fa';
import { HiOutlinePhone, HiMenuAlt1 } from 'react-icons/hi';
import './Navbar.scss';

export default function Navbar( ) {
  const [navVisible, setNavVisible] = useState(false);

  let pathname = useLocation();

  const navRef = useRef();

  const toggleNavBar = () => { setNavVisible(!navVisible) }
  
  return (
    <div className='nav'>
      <h3>LOGO</h3>
      
      <div className='phone-container'>
        <div>
          <a className='phone-icon' href="tel:+15625336324">
            <HiOutlinePhone />
          </a>
        </div>
        <h3>
          <a href="tel:+19292977775">(929)297-77-75</a>
        </h3>
      </div>
      

      <nav ref={navRef} className={navVisible ? 'navbar' : 'navbar hidden' }>
        <NavLink
        onClick={() => toggleNavBar()}
        to="/"
        className={"nav-link"}
        >home</NavLink>

        <NavLink
         onClick={() => toggleNavBar()}
        to="/services"
        className={"nav-link"}
        >services</NavLink>

        <NavLink
         onClick={() => toggleNavBar()}
        to="/blog"
        className={"nav-link"}
        >blog</NavLink>

        <NavLink 
         onClick={() => toggleNavBar()}
        to="/testimonials"
        className={"nav-link"}
        >testimonials</NavLink>

        <button id='nav-close-btn' className='nav-btn' onClick={() => toggleNavBar()}>
          <FaTimes />
        </button>
      </nav>
      <button className='nav-btn' onClick={() => toggleNavBar()}>
        <HiMenuAlt1 />
      </button>
    </div>
  );
};
