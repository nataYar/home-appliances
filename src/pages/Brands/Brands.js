import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar } from '../../components/importsComponents';
import './Brands.scss';

export default function Brands() {
  const location = useLocation();
  return (
    <div className='brands-container' id='brands'>
      <Navbar windowSize= {location.state.windowSize.width}/>
      {/* BREADCRUMBS */}
      <div className='breadcrumbs-container'>
         <Link to="/"
          className={location.pathname === "/" ? "breadcrumb-active" : "breadcrumb-not-active"}
          >
        Home
        </Link>
        <span className="breadcrumb-arrow">&gt;</span>
        <Link to="/blog"
          className={location.pathname === "/brands" ? "breadcrumb-active" : "breadcrumb-not-active"}
          >
        Brands
        </Link>
    </div>

    <h3 className='brands-title'>Brands we serve</h3>
    <div className='brands-container_list'>

    AEG
AKAI
ASKO
Afe
Amana
Ardo
Ariston
<br></br>
BAUKNECHT
BBK
BEKO
BLOMBERG
Ballu
Bomann
Bork
Bosch
Brandt
Braun
<br></br>
Candy
Carrier
<br></br>
Daewoo
Daikin
Dantex
Don
<br></br>
ERISSON
EURONOVA
EUROSOBA
Electra
Electrolux
Exqvisit
<br></br>
FAGOR
Fujitsu
<br></br>
General ELectric
Goldstar
Gorenje
Gree
Grundig
<br></br>
HOOVER
HYUNDAI
Haier
Hansa
Hitachi
Hotpoint-Ariston
<br></br>
Indesit
<br></br>
JVC
<br></br>
KUPPERSBERG
Kaiser
Krona
Kuppersbusch
<br></br>
LG
Liebherr
Loewe
<br></br>
MYSTERY
Mabe
Midea
Miele
Mitsubishi
<br></br>
NEFF
<br></br>
PIONEER
Panasonic
Philips
Polair
Pozis
<br></br>
ROLSEN
RUBIN
<br></br>
SHIVAKI
SMEG
SUPRA
<br></br>
Samsung
Sanyo
Sharp
Siemens
Sony
Stinol
<br></br>
THOMSON
Toshiba
<br></br>
Vestel
Vestfrost
<br></br>
Whirlpool
<br></br>
ZEROWATT
Zanussi
    </div>
    </div>
  )
}
