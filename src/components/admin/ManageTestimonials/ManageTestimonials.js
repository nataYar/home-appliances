import React, { useEffect, useState } from 'react';
import { db } from '../../../firebaseConfig';
import { collection, doc, onSnapshot, setDoc, deleteDoc } from "firebase/firestore";
import './ManageTestimonials.scss';

export default function ManageTestimonials() {
  const [testimonialsArr, setTestimonialsArr] = useState([]);
  const [testimonialsSorted, setTestimonialsSorted] = useState([]);
  useEffect(() => {
    const displaytestimonials = onSnapshot(
      collection(db, "testimonials"), 
      (snapshot) => {
        setTestimonialsArr(snapshot.docs.map(doc => ({...doc.data(), id: doc.id, })))
        
      },
      (error) => {
        console.log(error)
      });
  }, [])

  useEffect(() => {
    testimonialsArr.sort((x, y) => {
      if (x.status > y.status) {
        return -1;
      }
      if (x.status < y.status) {
        return 1;
      }
      return 0;
    })
    setTestimonialsSorted(testimonialsArr.slice())
    // console.log(testimonialsArr)
  }, [testimonialsArr])

  const approveFn = (el) => {
    const data = {
    name: el.name,
    phoneNumber: el.phoneNumber,
    city: el.city,
    text: el.text,
    date: el.date,
    status: 'approved',
  };
    setDoc(doc(db, "testimonials", el.phoneNumber ), data);
  }

  const deleteFn = (el) => {
    const data = {
      name: el.name,
      phoneNumber: el.phoneNumber,
      city: el.city,
      text: el.text,
      date: el.date,
    };
    deleteDoc(doc(db, "testimonials", el.phoneNumber), data);
  }

  return (
    <section className='manage-testimonials'>
      {
        testimonialsSorted.map((el, key) => {
            return (
              <div key={key} id='comment' className={el.status === 'approved' ? 'approved' :
              'pending' } > 
                <p>TEXT: {el.text} </p>
                <p>NAME: {el.name}</p>
                <p>CITY: {el.city} </p>
                <p>DATE: {el.date} </p>
                <p>PHONE: {el.phoneNumber} </p>
                {/* <p>{el.time} </p> */}
                <div className='buttons'>
                  <button 
                  className="button-standard" 
                  onClick={ () => deleteFn(el)}
                  >
                  delete
                  </button>
                  <button 
                  className="button-standard"
                  onClick={() => approveFn(el) }
                  >
                  approve
                  </button>
                </div>
              </div>
            )
        }
        )
      } 
    </section>
  )
}
