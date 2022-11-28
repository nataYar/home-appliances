import React, { useEffect, useState } from 'react';
import { CommentForm } from '../importsComponents';
import { db } from '../../firebaseConfig';
import { collection, onSnapshot } from "firebase/firestore";
// import { FaTimes, FaRegPaperPlane } from 'react-icons/fa';

import './Testimonials.scss';

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [commentForm, setCommentForm] = useState(false);
    const [commentAdded, setCommentAdded] = useState(false)

    useEffect(() => {
      const displaytestimonials = onSnapshot(
        collection(db, "testimonials"), 
        (snapshot) => {
          setTestimonials(snapshot.docs.map(doc => ({...doc.data(), id: doc.phoneNumber })))
        },
        (error) => {
          console.log(error)
        });
    }, [])
    
  const toggleCommentForm = () => {setCommentForm(!commentForm) }

  const commentAddedFn = () => { setCommentAdded(true) }

  return (
    <>
      { testimonials ?
        testimonials.map((el, key) => {
          if (el.status == 'approved'){
            return (
              <div className="reference-container" key={key}> 
                <div>{el.text}</div> 
                <div className='reference-btm-text'>
                  <p className='reference-name'>{el.name} </p>
                  <p>{el.city} </p>
                  <p>{el.date} </p>
                </div>
            </div>
            )
          } else {
            return 
          }
        })
      : null
      }

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
        <div className='comment-added'>
          <p >Thanks for your comment! It will shortly be added to the website</p>
        </div>
      : null
      }
      
    </>
  )
}