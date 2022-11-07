import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import './ManageTestimonials.scss';

export default function UnapprovedTestimonials() {
  const [testimonialsArr, setTestimonialsArr] = useState([]);

  useEffect(() => {
    const displaytestimonials = onSnapshot(
      collection(db, "testimonials"), 
      (snapshot) => {
        setTestimonialsArr(snapshot.docs.map(doc => ({...doc.data(), id: doc.id, })))
        console.log(testimonialsArr)
      },
      (error) => {
        console.log(error)
      });
  }, [])

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
      status: 'deleted',
    };
    setDoc(doc(db, "testimonials", el.phoneNumber), data);
  }

  return (
    <section className='manage-testimonials'>
      {
        testimonialsArr ? 
        testimonialsArr.map((el, key) => {
          return (
            <div key={key} className={el.status == 'approved' ? 'approved' :
            el.status == 'deleted' ? 'deleted' : 'pending' }> 
              <p>text: {el.text} </p>
              <p>NAME: {el.name}</p>
              <p>CITY: {el.city} </p>
              {/* <p>{el.time} </p> */}
              <div>
                <button 
                className="button-standard" role="button"
                onClick={() => approveFn(el) }
                >
                APPROVE
                </button>
                <button 
                className="button-standard" role="button"
                onClick={ () => deleteFn(el)}
                >
                DELETE
                </button>
              </div>
            </div>
          )
        }) :
        null
      }
    </section>
  )
}