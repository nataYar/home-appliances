import React, { useState } from "react";

export default function Navbar( tabletView  ) {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click)
  }

  return (
    <nav>
      {/* <div className="navigation">
        <div className="navigation-sub">
          <Link to="/" className="item">Home</Link>
          <Link to="/about" className="item">About</Link>
          <Link to="/contact" className="item">Contact</Link>
          <Link to="/projects" className="item">Projects</Link>
          <Link to="/skills" className="item">Skills</Link>
        </div>
      </div> */}

      <div className='sticky-nav'>
        <a href='#'><div className={click && tabletView ? 'logo logo-beige' : 'logo logo-black'}></div></a>
        <div className={ click && tabletView ? 'burger clicked' : 'burger' }
        onClick={handleClick}>
          <span className='first'></span>
          <span className='second'></span>
          <span className='third'></span>
        </div>
      </div>

      {/* <ul className={ click && tabletView  ? 'nav-wrapper active' : 'nav-wrapper' }>
        <li onClick={handleClick}>
          <a href="#section-about" className='nav-item nav-about'>
            About/
          </a>
        </li>
        <li onClick={handleClick}>
          <a href="#section-projects" className='nav-item nav-projects'>
            Projects/
          </a>
        </li>
        <li onClick={handleClick}>
          <a href="#section-footer" className='nav-item nav-footer'>
            Contact/
          </a>
        </li>
      </ul> */}
    </nav>
  )
}
