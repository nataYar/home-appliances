import React from 'react';
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import './CommentForm.scss';
import { db } from '../../firebaseConfig';
import {  doc, setDoc } from "firebase/firestore";

export default function CommentForm({ commentForm, callbackToggleCommentForm, callbackCommentAdded }) {
    const [comment, setComment] = useState({})
    // const closeCommentForm = () => { callbackToggleCommentForm(); }
    
    const updateCommentInput = e => {
        setComment({
            ...comment,
            [e.target.name]: e.target.value,
            [e.target.phoneNumber]: comment.phoneNumber,
            [e.target.message]: e.target.message,
            time: new Date(),
      })
    }
    const thankForCommentFn = () => {callbackCommentAdded()}

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        writeRequest();
        setComment({
            name: '',
            phoneNumber: '',
            message: '',
        })
        callbackToggleCommentForm()
        callbackCommentAdded()
    }

    const writeRequest = () => {
        const docData = {
            name: comment.name,
            phoneNumber: comment.phoneNumber,
            message: comment.message,
            time: new Date(),
        };
        setDoc(doc(db, "unapprovedTestimonials", comment.phoneNumber ), docData);
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
    <section className={commentForm ? 'comment-form-container' : 'comment-form-container hidden' }>
        <div id="section-header">
            <h2>We appreciate your comments</h2>
            <FaTimes className="" onClick={() => callbackToggleCommentForm()}  />
        </div>
        <div className="schedule-call-wrapper">
            <form className="schedule-call-form"
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

                    <textarea className="form-control" rows="10" placeholder="WANT TO ADD A MESSAGE?" 
                    name="message" 
                    type="text"
                    onChange={(e) => updateCommentInput(e)}
                    value={comment.message || ''}
                    />
                </div>
                <button className="button-standard" id="submit" type="submit" value="SEND">SEND</button>
            </form>
        </div>
    </section>
  )
}