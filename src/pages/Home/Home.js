import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate()
  return (
    <div>Home
      <button onClick={() => navigate('/services')}>See our services</button>
    </div>
  )
}
