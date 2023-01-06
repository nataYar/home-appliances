import React, { useState,  useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import { FaPhoneAlt, FaTimes } from 'react-icons/fa';
import { MdHomeRepairService } from 'react-icons/md';
import { HiMenuAlt1 } from 'react-icons/hi';

import './Navbar.scss';

export default function Navbar( { windowSize, callbackCloseScheduleForm }) {
  const [navVisible, setNavVisible] = useState(false);
  const [activeLink, setActiveLink] = useState('')


  useEffect(()=> {
    if(activeLink.length > 0) {
      if (document.querySelector('.selected')){
        document.querySelector('.selected').classList.remove('selected');
      }
      document.getElementById(activeLink).classList.add('selected')
    } 
  }, [activeLink])

  const toggleNavBar = () => { setNavVisible(!navVisible) }
  const addActiveClass = (e) => { setActiveLink(e.currentTarget.id) }

  const openSCForm = () => {
    callbackCloseScheduleForm()
  }
  return (
  <div className='nav'>
    {
      windowSize < 1024 ?
      <div className='nav-mob'>
        <a className='menu-btn' href="/">
         <MdHomeRepairService />
        </a>
      
      <div className='phone-container'>
        <div>
          <a className='phone-icon' href="tel:+15625336324">
            <FaPhoneAlt />
          </a>
        </div>
          <a href="tel:+19292977775">
            <h3>(929) 297-7775</h3>
          </a>
      </div>

      <nav className={navVisible ? 'navbar' : 'navbar hiddenToRight' }>
         <HashLink
        id='servicesLink'
        to="/#services"
        onClick={(e) => {toggleNavBar(); addActiveClass(e);}}
        className="nav-link"
        >Services</HashLink>

        <HashLink
        id='testimonialsLink'
        to="/#testimonials"
        onClick={(e) => {toggleNavBar(); addActiveClass(e);}}
        className="nav-link"
        >testimonials</HashLink>

        <HashLink
        id='blogLink'
        to="/#blog"
        onClick={(e) => {toggleNavBar(); addActiveClass(e);}}
        className="nav-link"
        >Blog</HashLink>

        <HashLink
        id='brandsLink'
        to="/#brands"
        onClick={(e) => {toggleNavBar(); addActiveClass(e);}}
        className="nav-link"
        >Brands</HashLink>

        <HashLink
        id='pricesLink'
        to="/#prices"
        onClick={(e) => {toggleNavBar(); addActiveClass(e);}}
        className="nav-link"
        >Fees</HashLink>

        <HashLink
        id='contactsLink'
        to="/#contacts"
        onClick={(e) => {toggleNavBar(); addActiveClass(e);}}
        className="nav-link"
        >Contacts</HashLink>

        <button id='nav-close-btn' className='nav-btn' onClick={() => toggleNavBar()}>
          <FaTimes />
        </button>
      </nav>
        <button className='menu-btn' onClick={() => toggleNavBar()}>
          <HiMenuAlt1 />
        </button>
      </div>
    :
    <div className='nav-desktop'>
      <nav className='horizontal-nav'>
         <HashLink
        id='servicesLink'
        to="/#services"
        onClick={(e) => {toggleNavBar(); addActiveClass(e);}}
        className="nav-link"
        >Services</HashLink>

        <HashLink
        id='testimonialsLink'
        to="/#testimonials"
        onClick={(e) => {toggleNavBar(); addActiveClass(e);}}
        className="nav-link"
        >testimonials</HashLink>

        <HashLink
        id='blogLink'
        to="/#blog"
        onClick={(e) => {toggleNavBar(); addActiveClass(e);}}
        className="nav-link"
        >Blog</HashLink>

        <HashLink
        id='pricesLink'
        to="/#prices"
        onClick={(e) => {toggleNavBar(); addActiveClass(e);}}
        className="nav-link"
        >Fees</HashLink>

        <HashLink
        id='contactsLink'
        to="/#contacts"
        onClick={(e) => {toggleNavBar(); addActiveClass(e);}}
        className="nav-link"
        >Contacts</HashLink>
      </nav>
      <a className='menu-btn' href="/">
        <MdHomeRepairService />
      </a>
      <div className='phone-container'>
        <div>
          <a className='phone-icon' href="tel:+15625336324">
            <FaPhoneAlt />
          </a>
        </div>
          <a href="tel:+19292977775">
            <h3>(929) 297-7775</h3>
          </a>
      </div>
      <button 
         className="sc-button"
          onClick={openSCForm} 
        >Schedule A Call</button>
    </div>
    }
    </div>
  );
};
