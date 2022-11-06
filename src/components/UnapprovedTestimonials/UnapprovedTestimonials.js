import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { collection, doc, onSnapshot, deleteDoc, setDoc } from "firebase/firestore";
import './UnapprovedTestimonials.scss';

export default function UnapprovedTestimonials() {
  const [unapprovedArr, setUnapprovedArr] = useState([]);
  const unapprovedCollection = collection(db, "unapproved");
  
  useEffect(() => {
    const displayUnapproved = onSnapshot(
      collection(db, "unapproved"), 
      (snapshot) => {
        setUnapprovedArr(snapshot.docs.map(doc => ({...doc.data(), id: doc.id, })))
        console.log(unapprovedArr)
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
  };
    setDoc(doc(db, "testimonials", el.phoneNumber ), data);
    deleteDoc(doc(db, "unapproved", el.phoneNumber));
  }

  const deleteFn = (el) => {
    const data = {
      name: el.name,
      phoneNumber: el.phoneNumber,
      city: el.city,
      text: el.text,
    };
    deleteDoc(doc(db, "unapproved", el.phoneNumber));
    setDoc(doc(db, "deleted", el.phoneNumber), data);
  }

  return (
    <section className='unapproved'>
      { unapprovedArr ?
        unapprovedArr.map((el, key) => {
          return (
            <div key={key}> 
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
        })
      : null 
      }
    </section>
  )
}
