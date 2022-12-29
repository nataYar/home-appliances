import React,  { useEffect, useState }  from 'react';
import './Login.scss';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useLocalStorage } from 'usehooks-ts';
import { Dashboard } from '../../components/importsComponents';

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [admin, setAdmin] = useLocalStorage('', true)


    const loginFn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        setAdmin(user.uid)
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage)
        alert('no user found')
        });
    }

    useEffect(()=> {
        document.querySelector('.nav').style.display ='none'
    }, [])

    return (
        <div>
            { admin.length > 0 ?  
                <Dashboard />
            : 
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
            }
            
        </div>
        
    )
}
