import React, { useEffect, useState } from 'react';
import { CommentForm } from '../importsComponents';
import { db } from '../../firebaseConfig';
import { collection, getDocs } from "firebase/firestore";
// import { FaTimes, FaRegPaperPlane } from 'react-icons/fa';

import './Testimonials.scss';

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [commentForm, setCommentForm] = useState(false);
    const [commentAdded, setCommentAdded] = useState(false)

    const testimonialsCollection = collection(db, "testimonials");
    
    
    useEffect(() => {
        const getTestimonials = async () => {
        const data = await getDocs(testimonialsCollection)
        
        setTestimonials(data.docs.map((doc) => 
        ({ ...doc.data(), id: doc.phoneNumber})
        ))
    };
    getTestimonials()
    }, []);
    
  const toggleCommentForm = () => {setCommentForm(!commentForm) }

  const commentAddedFn = () => { setCommentAdded(true) }

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
        () => toggleCommentForm() }
        >
        add comment
      </button>
      
      <CommentForm commentForm={commentForm} callbackToggleCommentForm={toggleCommentForm} callbackCommentAdded={commentAddedFn}/> 
      {
        commentAdded ? 
        <div>
          <p>Thanks for your comment! It will shortly be added to the website</p>
        </div>
      : null
      }
      
    </>
  )
}