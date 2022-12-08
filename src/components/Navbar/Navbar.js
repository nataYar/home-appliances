import React, { useState, useRef } from 'react';
// import { NavLink, useLocation } from 'react-router-dom';
// import { HashLink } from 'react-router-hash-link';
import { HashLink } from 'react-router-hash-link';
import { FaPhoneAlt, FaTimes } from 'react-icons/fa';
import { HiMenuAlt1 } from 'react-icons/hi';
import './Navbar.scss';

export default function Navbar( ) {
  const [navVisible, setNavVisible] = useState(false);

  const navRef = useRef();

  const toggleNavBar = () => { setNavVisible(!navVisible) }
  
  return (
    <div className='nav'>
      <a className='nav-btn' href="/"><h3>LOGO</h3></a>
      
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

      <nav ref={navRef} className={navVisible ? 'navbar' : 'navbar hidden' }>
        {/* <a href="/" className={"nav-link"} onClick={() => toggleNavBar()} > home </a>
        <a href="/#services" className={"nav-link"} onClick={() => toggleNavBar()} > services </a>
        <a href="/#blog" className={"nav-link"} onClick={() => toggleNavBar()} > blog </a>
        <a href="/#prices" className={"nav-link"} onClick={() => toggleNavBar()} > prices </a>
        <a href="/#contacts" className={"nav-link"} onClick={() => toggleNavBar()} > contacts </a> */}

        {/* <NavLink
        onClick={() => toggleNavBar()}
        to="/#home"
        className={"nav-link"}
        >home</NavLink> */}

        {/* <HashLink
        to="/#services"
        onClick={() => toggleNavBar()}
        className="nav-link"
        activeClassName="selected"
        activeStyle={{ color: 'red' }}
        >Services</HashLink> */}

        <HashLink
        smooth to="/#services"
        onClick={() => toggleNavBar()}
        className="nav-link"
        // className={(props) => {
        //   return `${props.isActive ? 'nav-link active ' : 'nav-link'}`;
        // }}
        // activeStyle={{ color: 'red' }}
        >Services</HashLink>

        <HashLink
        smooth to="/#testimonials"
        onClick={() => toggleNavBar()}
        // className={isActive =>
        //   "nav-link" + (!isActive ? " unselected" : " selected")
        // }
        className="nav-link"
        >testimonials</HashLink>

        <HashLink
        smooth to="/#prices"
        onClick={() => toggleNavBar()}
        className="nav-link"
        // activeStyle={{ color: 'red' }}
        >Prices</HashLink>

        <HashLink
        smooth to="/#contacts"
        onClick={() => toggleNavBar()}
        className="nav-link"
        // activeStyle={{ color: 'red' }}
        >Contacts</HashLink>

        <button id='nav-close-btn' className='nav-btn' onClick={() => toggleNavBar()}>
          <FaTimes />
        </button>
      </nav>
      <button className='menu-btn' onClick={() => toggleNavBar()}>
        <HiMenuAlt1 />
      </button>
    </div>
  );
};
