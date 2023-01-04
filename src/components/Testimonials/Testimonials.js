import React, { useEffect, useState, lazy } from 'react';
import { db } from '../../firebaseConfig';
import { collection, onSnapshot } from "firebase/firestore";
import './Testimonials.scss';
import './Testimonials-mq.scss';
const CommentForm  = lazy(() => import('../CommentForm/CommentForm'));

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [commentForm, setCommentForm] = useState(false);
    const [commentAdded, setCommentAdded] = useState(false);
    const [sixPosts, setSixPosts] = useState([])

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

    useEffect(()=> {
      setSixPosts(testimonials.slice(0, 6))
    }, [testimonials])
    
  const toggleCommentForm = () => {setCommentForm(!commentForm) }

  const commentAddedFn = () => { setCommentAdded(true) }

  return (
    <div className='testimonials-container'>
      { sixPosts ?
        sixPosts.map((el, key) => {
          if (el.status === 'approved'){
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
        className="button-standard"
        onClick={
        () => toggleCommentForm() }>
        add comment
      </button>
      
      <CommentForm commentForm={commentForm} callbackToggleCommentForm={toggleCommentForm} callbackCommentAdded={commentAddedFn}/> 
    </div>
  )
}