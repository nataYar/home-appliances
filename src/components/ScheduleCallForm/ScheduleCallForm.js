import React, { useState} from 'react';
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
        closeForm()
    }

    const closeForm = () => {
        setFormData({
            name: '',
            phoneNumber: '',
            message: '',
        })
        closeScheduleCallForm() 
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

    return (
        <section className={scheduleFormVisible ? 'schedule-call-container' : 'schedule-call-container hiddenToRight' }>
            <div className='sc-header'>
                <h2>Contact us</h2>
                <button className="sc-btn" onClick={closeForm} >
                    <FaTimes />
                </button>
                
            </div>    
              
            <div className="sc-wrapper">
                <div className="sc-info-container">
                    <div className='sc__address'>
                        <p>Brooklyn</p>
                        <p>New York</p>
                        <a href="tel:+19292977775">(929)297-7775</a>
                    </div>
                        {/* <a href="mailto:n.yarysheva@gmail.com">n.yarysheva@gmail.com</a> */}
                </div>

                <form className="sc-form"
                onSubmit={handleSubmit }>
                    <div>
                        <input className="form-control" type="text" placeholder="NAME" 
                            name="name" 
                            onChange={(e) => updateInput(e)}
                            value={formData.name || ''} 
                            />

                        <div className='form-control__phone'>
                            <p>+1</p>
                            <input className="" 
                            type="text"
                            placeholder="PHONE NUMBER" 
                            name="phoneNumber" 
                            onChange={(e) => updateInput(e)}
                            value={formData.phoneNumber || ''}
                            required />
                        </div>
                        
                        <textarea  id ='form-control__message' className="form-control" 
                            placeholder="add a message or leave it blank" 
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
