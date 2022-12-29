import React from 'react';
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import './CommentForm.scss';
import { db } from '../../firebaseConfig';
import {  doc, setDoc } from "firebase/firestore";

export default function CommentForm({ commentForm, callbackToggleCommentForm, callbackCommentAdded }) {
    const [comment, setComment] = useState({})
    
    const updateCommentInput = e => {
        setComment({
            ...comment,
            [e.target.name]: e.target.value,
            [e.target.phoneNumber]: comment.phoneNumber,
            [e.target.text]: e.target.text,
            [e.target.city]: e.target.value,
      })
    }

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        writeRequest();
        setComment({
            name: '',
            phoneNumber: '',
            text: '',
            city: '',
        })
        callbackToggleCommentForm()
        callbackCommentAdded()
    }

    const writeRequest = () => {
        const docData = {
            name: comment.name,
            phoneNumber: comment.phoneNumber,
            city: comment.city,
            text: comment.text,
            date: getCurrentDate(),
            status: 'upapproved'
        };
        setDoc(doc(db, "testimonials", comment.phoneNumber ), docData);
    }

    function getCurrentDate(separator='-'){
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        return `${month<10?`0${month}`:`${month}`}${separator}${date}${separator}${year}`
        }

    function getPhoneNum (e) {
        let output = "(";
        e.target.value.replace( /^\D*(\d{0,3})\D*(\d{0,3})\D*(\d{0,4})/, function( match, g1, g2, g3 )
            {
              if ( g1.length ) {
                output += g1;
                if ( g1.length == 3 ) {
                    output += ")";
                    if ( g2.length ) {
                        output += " " + g2; 
                        if ( g2.length == 3 ) {
                            output += "-";
                            if ( g3.length ) {
                                output += g3;
                            }
                        }
                    }
                 }
              }
            }
          );
        setComment({...comment, phoneNumber: output})
    } 

    return (
    <section className={commentForm ? 'schedule-call-container' : 'schedule-call-container hidden' }>
        
        <div className="sc-header">
            <button className="sc-btn" onClick={() => callbackToggleCommentForm()}  >
                <FaTimes />
            </button>
            <h2>We appreciate your comment</h2>
        </div>
        <div className="sc-wrapper">
            <form className="sc-form"
            onSubmit={(e) => handleCommentSubmit(e)}>
                <div>
                    <input className="form-control" id="name" type="text" placeholder="NAME" 
                    name="name" 
                    onChange={(e) => updateCommentInput(e)}
                    value={comment.name || ''} 
                    required />

                    <input className="form-control" type="text" placeholder="PHONE NUMBER" 
                    name="phoneNumber" 
                    onChange={(e) => getPhoneNum(e)}
                    value={comment.phoneNumber || ''} 
                    required />

                    <input className="form-control" type="text" placeholder="CITY" 
                    name="city" 
                    onChange={(e) => updateCommentInput(e)}
                    value={comment.city || ''} 
                    required />

                    <textarea className="form-control form-control__message" rows="10" placeholder="WANT TO ADD A text?" 
                    name="text" 
                    type="text"
                    onChange={(e) => updateCommentInput(e)}
                    value={comment.text || ''}
                    />
                </div>
                <button className="button-standard" id="submit" type="submit" value="SEND">SEND</button>
            </form>
        </div>
    </section>
  )
}