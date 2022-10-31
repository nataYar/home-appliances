import React, {useEffect, useState} from 'react';
import './ScheduleCallForm.scss';
import { FaTimes } from 'react-icons/fa';
import { Axios, db } from '../../firebaseConfig';
import {  doc, setDoc } from "firebase/firestore";

export default function ScheduleCallForm({scheduleFormVisible, callbackCloseScheduleForm}) {
    const [formData, setFormData] = useState({})
    const closeScheduleCallForm = () => { callbackCloseScheduleForm(); }

    const updateInput = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            [e.target.phoneNumber]: formData.phoneNumber,
            [e.target.message]: e.target.message,
            time: new Date(),
      })
    }

    const handleSubmit = e => {
        e.preventDefault()
        writeRequest();
        setFormData({
            name: '',
            phoneNumber: '',
            message: '',
        })
    }

    const writeRequest = () => {
        const docData = {
            name: formData.name,
            phoneNumber: formData.phoneNumber,
            message: formData.message,
            time: new Date(),
        };
        setDoc(doc(db, "requests", formData.phoneNumber ), docData);
    }


    // const sendEmail = () => {   
    //     Axios
    //     .post("https://home-appliances-b8f33-default-rtdb.firebaseio.com", formData)
    //     .catch(error => {
    //       console.log(error.response.data)
    //     })
    // }

    function getFormattedPhoneNum(e) {
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
        setFormData({...formData, phoneNumber: output})
    } 

    return (
        <section className={scheduleFormVisible ? 'schedule-call-container' : 'schedule-call-container hidden' }>
            <div id="section-header">
                <h2>Contact us</h2>
                <FaTimes className="nav-btn" onClick={() => closeScheduleCallForm()}  />
            </div>
            <div className="schedule-call-wrapper">
                <form className="schedule-call-form"
                onSubmit={handleSubmit}>
                    <div>
                        <input className="form-control" type="text" placeholder="NAME" 
                        name="name" 
                        onChange={(e) => updateInput(e)}
                        value={formData.name || ''} 
                        required />

                        <input className="form-control" type="text" placeholder="PHONE NUMBER" 
                        name="phoneNumber" 
                        onChange={(e) => getFormattedPhoneNum(e)}
                        value={formData.phoneNumber || ''}
                        required />

                        <textarea className="form-control" rows="10" placeholder="WANT TO ADD A MESSAGE?" 
                        name="message" 
                        type="text"
                        onChange={(e) => updateInput(e)}
                        value={formData.message || ''}
                        />
                    </div>
                    <button className="button-standard" id="submit" type="submit" value="SEND">SEND </button>
                </form>
                
                <div className="schedule-call-info-container">
                    <ul className="contact-list">
                        <li className="list-item"><i className=""><span className="contact-text place">City, State</span></i></li>
                        <li className="list-item"><i className=""><span className="contact-text phone"><a href="tel:1-212-555-5555" title="Give me a call">(212) 555-2368</a></span></i></li>
                        <li className="list-item"><i className=""><span className="contact-text gmail"><a href="mailto:#" title="Send me an email">hitmeup@gmail.com</a></span></i></li>
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
