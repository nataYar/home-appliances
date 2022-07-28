import React, { useState, useEffect }from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Services, Blog, Feedbacks } from './pages/importsPages'
import { Navbar } from './components/importsComponents'

function App() {
  const [width, setWidth] = useState(null)
  const [tabletView, setTabletview] = useState(null);

  const handleResize = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
  }, [])
  
  useEffect(() => {
    window.innerWidth <= 991 ? setTabletview(true) : setTabletview(false)
  }, [width]) 

  return (
    <>
     <Navbar tabletView={tabletView} />
     <div className='container'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/servises' element={<Services />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/feedbacks' element={<Feedbacks />} />
      </Routes>
     </div>
    </>
  );
}

export default App;
