import React,  { useEffect, useState }  from 'react';
import './Login.scss';
import { signInWithEmailAndPassword } from 'firebase/auth';
// const auth = getAuth();
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import { ManageTestimonials } from '../../components/importsComponents';

export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState('')
    const [testimonialsShown, setTestimonialsShown] = useState(false)

    const loginFn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        setUser(user)
        setTestimonialsShown(!testimonialsShown) 
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert('no user found')
        });
    }
    
    return (
        <div>
            { !testimonialsShown ? 
                <div className='login-container'>
                    <form className='login' onSubmit={(e) => loginFn(e)} >
                        <input type='text' placeholder='Username'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email} />

                        <input type='password' placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password} />

                        <button id="submit" type="submit">Login</button>
                    </form>
                </div>
                : null
            }
            { testimonialsShown ?  <ManageTestimonials /> : null } 
        </div>
        
    )
}
