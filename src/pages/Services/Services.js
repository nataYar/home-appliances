import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Refrigerators } from '../../Components/importsComponents';

export default function Services() {
  const navigate = useNavigate()
  return (
    <>
    <div>Services</div>
    {/* <button onClick={() => navigate('/refrigerators')}>Refrigerators</button> */}
    <Routes>
      <Route path="refrigerators" element={<Refrigerators />} />
    </Routes>
    </>
    
  )
}
