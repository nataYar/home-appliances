import React, { useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

export default function Navbar( ) {

  let pathname = useLocation();

  React.useEffect(() => {
    console.log(pathname)
  }, [pathname]);


  const navRef = useRef();

  const showNavBar = () => {
    navRef.current.classList.toggle('responsive-nav')
    }
  
  return (
    <div className='nav-header'>
      <h3>Logo</h3>
      <nav ref={navRef} className='navbar'>
        <NavLink
        onClick={() => showNavBar()}
        to="/"
        className={"nav-link"}
        >home</NavLink>

        <NavLink
        onClick={() => showNavBar()}
        to="/services"
        className={"nav-link"}
        >services</NavLink>

        <NavLink
        onClick={() => showNavBar()}
        to="/blog"
        className={"nav-link"}
        >blog</NavLink>

        <NavLink 
        onClick={() => showNavBar()}
        to="/testimonials"
        className={"nav-link"}
        >testimonials</NavLink>
        <button className='nav-btn nav-close-btn' onClick={() => showNavBar()}>
          <FaTimes/>
        </button>
      </nav>
      <button className='nav-btn' onClick={() => showNavBar()}>
        <FaBars/>
      </button>
    </div>
  );
};
