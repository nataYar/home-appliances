import React from 'react';
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import './CommentForm.scss';

export default function CommentForm({ commentForm, callbackToggleCommentForm }) {
    const [comment, setComment] = useState({})

    const updateCommentInput = (e) => {
        setComment({
            ...comment,
            [e.target.name]: e.target.value,
            [e.target.email]: e.target.email,
            [e.target.message]: e.target.message,
            time: new Date(),
        })
    }

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        // writeRequest();
        setComment({
            name: '',
            email: '',
            message: '',
        })
    }
    const closeCommentForm = () => { callbackToggleCommentForm(); }

    return (
    <section className={commentForm ? 'comment-form-container' : 'comment-form-container hidden' }>
        <div id="section-header">
            <h2>We appreciate your comments</h2>
            <FaTimes className="" onClick={() => closeCommentForm()}  />
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

                    <input type="email" className="form-control" id="email" placeholder="PHONE NUMBER" 
                    name="email" 
                    onChange={(e) => updateCommentInput(e)}
                    value={comment.phoneNumber || ''}
                    />

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