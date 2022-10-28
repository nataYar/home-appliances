import React, { useEffect, useState } from 'react';
import { CommentForm } from '../importsComponents';
import { db } from '../../firebaseConfig';
import { collection, getDocs } from "firebase/firestore";
import { FaTimes, FaRegPaperPlane } from 'react-icons/fa';

import './Testimonials.scss';

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [commentForm, setCommentForm] = useState(false);

    const testimonialsCollection = collection(db, "testimonials");
    
    
    useEffect(() => {
        const getTestimonials = async () => {
        const data = await getDocs(testimonialsCollection)
        
        setTestimonials(data.docs.map((doc) => 
        ({ ...doc.data(), id: doc.id})
        ))
        console.log(testimonials)
    };
    getTestimonials()
    }, []);

    // useEffect(() => {
    //     console.log(testimonials)
    // }, [testimonials])

    

  return (
    <>
      { testimonials ?
        testimonials.map((el, key) => {
          return (
            <div className="reference-container" key={key}> 
              <div>{el.text} </div>
              <div className='reference-btm-text'>
                <p className='reference-name'>{el.name} </p>
                <p>{el.city} </p>
              </div>
            </div>
          )
        })
      : null }
     
      <button 
        className="button-standard" role="button"
        onClick={
        () => setCommentForm(!commentForm) }
        >
        add comment
      </button>

      {
        commentForm ? <CommentForm /> : null
      }
       
    </>
  )
}