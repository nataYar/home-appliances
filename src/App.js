import React, { useState, useEffect }from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Services, Blog, Testimonials } from './Pages/importsPages'
import { Navbar, Refrigerators } from './Components/importsComponents'

function App() {
  return (
    <>
     <Navbar/>
     <div className='container'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/services/*' element={<Services />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/testimonials' element={<Testimonials />} />
        <Route path="refrigerators" element={<Refrigerators />} />
    
      </Routes>
     </div>
    </>
  );
}

export default App;
