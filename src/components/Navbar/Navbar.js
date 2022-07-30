import React, { useRef } from 'react';
import { NavLink, useLocation, useMatch } from 'react-router-dom';
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

  // const { match, location } = this.props;
  //   let isActive = false;
  //   if (location.pathname === `${match.url}/props-v-state`) {
  //     isActive = true;
  //   }
  

  return (
    <div className='nav-header'>
      <h3>Logo</h3>
      <nav ref={navRef} className='navbar'>
      
      <NavLink
        to="/"
        className={"nav-link"}
        >home</NavLink>

          <NavLink
        to="/services"
        className={"nav-link"}
        >services</NavLink>

          <NavLink
        to="/blog"
        className={"nav-link"}
        >blog</NavLink>

        <NavLink
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
