import React, {useEffect, useState} from 'react';
import './ScheduleCallForm.scss';
import { FaTimes } from 'react-icons/fa';
import { Axios, db } from '../../functions/firebaseConfig'
import {  doc, setDoc } from "firebase/firestore";

export default function ScheduleCallForm({scheduleFormVisible, callbackCloseScheduleForm}) {
    const [formData, setFormData] = useState({})
    const closeScheduleCallForm = () => { callbackCloseScheduleForm(); }

    const updateInput = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            [e.target.email]: e.target.email,
            [e.target.message]: e.target.message,
      })
    }

    const handleSubmit = e => {
        e.preventDefault()
        writeRequest();
        setFormData({
            name: '',
            email: '',
            message: '',
        })
    }

    const writeRequest = () => {
        const docData = {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            time: new Date(),
        };
        setDoc(doc(db, "requests", formData.email ), docData);
        // sendEmail()
    }

    useEffect(() => {
        console.log(formData)
    }, [formData])

    const sendEmail = () => {
        Axios
        .post( "https://home-appliances-b8f33-default-rtdb.firebaseio.com", formData)
        .catch(error => {
          console.log(error.response.data)
        })
    }

    return (
        <section className={scheduleFormVisible ? 'schedule-call-container' : 'schedule-call-container hidden' }>
            <div id=''></div>
            <h1 className="section-header">Contact us</h1>
            
            <button id='nav-close-btn' className='nav-btn' 
            onClick={e => closeScheduleCallForm(e)} 
            >
            <FaTimes/>
            </button>

            <div className="schedule-call-wrapper">

                <form className="schedule-call-form" role="form"
                onSubmit={handleSubmit} >
                    <div className="form-group">
                        <div className="col-sm-12">
                        <input className="form-control" id="name" type="text" placeholder="NAME" 
                        name="name" 
                        onChange={updateInput}
                        value={formData.name || ''} 
                        required />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-sm-12">
                        <input type="email" className="form-control" id="email" placeholder="email" 
                        name="email" 
                        onChange={updateInput}
                        value={formData.email || ''}
                        required />
                        </div>
                    </div>

                    <textarea className="form-control" rows="10" placeholder="WANT TO ADD A MESSAGE?" 
                    name="message" 
                    type="text"
                    onChange={updateInput}
                    value={formData.message || ''}
                    ></textarea>
                    
                    <button className="btn btn-primary send-button" id="submit" type="submit" value="SEND">
                        <div className="alt-send-button">
                        <i className="fa fa-paper-plane"></i><span className="send-text">SEND</span>
                        </div>
                    </button>
                </form>
                
                <div className="schedule-call-info-container">
                    <ul className="contact-list">
                        <li className="list-item"><i className="fa fa-map-marker fa-2x"><span className="contact-text place">City, State</span></i></li>
                        <li className="list-item"><i className="fa fa-phone fa-2x"><span className="contact-text phone"><a href="tel:1-212-555-5555" title="Give me a call">(212) 555-2368</a></span></i></li>
                        <li className="list-item"><i className="fa fa-envelope fa-2x"><span className="contact-text gmail"><a href="mailto:#" title="Send me an email">hitmeup@gmail.com</a></span></i></li>
                    </ul>

                    <ul className="social-media-list">
                        <li><a href="#" target="_blank" className="contact-icon">
                            <i className="fa fa-github" aria-hidden="true"></i></a>
                        </li>
                        <li><a href="#" target="_blank" className="contact-icon">
                            <i className="fa fa-codepen" aria-hidden="true"></i></a>
                        </li>
                        <li><a href="#" target="_blank" className="contact-icon">
                            <i className="fa fa-twitter" aria-hidden="true"></i></a>
                        </li>
                        <li><a href="#" target="_blank" className="contact-icon">
                            <i className="fa fa-instagram" aria-hidden="true"></i></a>
                        </li>       
                    </ul>
                </div>
            </div>      
        </section>  
  )
}
