import React, { useState, lazy } from 'react';
import './Dashboard.scss';
const ManageTestimonials = lazy(() => import('../ManageTestimonials/ManageTestimonials'));
const ManageBlog= lazy(() => import('../ManageBlog/ManageBlog'));

export default function Dashboard() {
    const [testimonialsVisible, setTestimonialsVisible] = useState(false)
    const [blogVisible, setBlogVisible] = useState(false)
   
    
    const toggleTestimonials = () => {
      setTestimonialsVisible(!testimonialsVisible);
      setBlogVisible(false)
    }

    const toggleBlog = () => {
      setBlogVisible(!blogVisible)
      setTestimonialsVisible(false);
    }
    
  return (
    <div className='dashboard-container'>
      <div className='nav dashboard-nav'>
        <button className='dashboard-btn button-standard' onClick={() => toggleTestimonials()}>{testimonialsVisible ? 'hide TESTIMONIALS' : 'show TESTIMONIALS'}</button>
        <button className='dashboard-btn button-standard' onClick={() => toggleBlog()}>{blogVisible ? 'hide BLOG' : 'show BLOG'}</button>
      </div>
      { testimonialsVisible ?  <ManageTestimonials/> : null }
      { blogVisible ? <ManageBlog /> : null }
    </div>
  )
}
