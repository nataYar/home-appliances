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
            [e.target.phoneNumber]: e.target.value,
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
            <div className='sc-header'>
                <button className="sc-btn" onClick={() => closeScheduleCallForm()} >
                    <FaTimes />
                </button>
                <h2>Contact us</h2>
            </div>    
              
            <div className="sc-wrapper">
                <div className="sc-info-container">
                    <div className='sc__address'>
                        <p>Prins Hendrikkade 48A</p>
                        <p>1012 NY</p>
                        <p>NY</p>
                    </div>
                    <div className='sc__contacts'>
                        <a href="mailto:n.yarysheva@gmail.com">n.yarysheva@gmail.com</a>
                        <a href="tel:+19292977775">(929)297-77-75</a>
                    </div>
                </div>

                <form className="sc-form"
                onSubmit={handleSubmit}>
                    <div>
                        <input className="form-control" type="text" placeholder="NAME" 
                        name="name" 
                        onChange={(e) => updateInput(e)}
                        value={formData.name || ''} 
                        required />

                        <div className='form-control__phone'>
                            <p>+1</p>
                            <input className="" 
                            type="text"
                            placeholder="PHONE NUMBER" 
                            name="phoneNumber" 
                            onChange={(e) => updateInput(e)}
                            value={formData.phoneNumber || ''}
                            maxLength='10'
                            required />
                        </div>
                        
                        <textarea className="form-control form-control__message" rows="10" placeholder="WANT TO ADD A MESSAGE?" 
                        name="message" 
                        type="text"
                        onChange={(e) => updateInput(e)}
                        value={formData.message || ''}
                        />
                    </div>
                    <button className="button-standard" type="submit" value="SEND">SEND </button>
                </form>
                
               
            </div>
        </section>
  )
}
