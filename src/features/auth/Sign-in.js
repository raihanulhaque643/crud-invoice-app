import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from "../../firebase/firebase";

import './authStyles.css';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [hourglass, sethourglass] = useState(false);

    const onEmailChanged = e => setEmail(e.target.value);
    const onPasswordChanged = e => setPassword(e.target.value);

    const history = useHistory();

    const onSubmit = async e => {
        sethourglass(true)
        setErrorMessage('');
        e.preventDefault();
        if(email && password){
            try {
                const resp = await auth.signInWithEmailAndPassword(email, password);
                if(resp){
                    sethourglass(false);
                    history.push('/home');
                } else {
                    sethourglass(false);
                    alert('login failed')
                }
                setEmail('');
                setPassword('');
            } catch (error) {
                sethourglass(false);
                setErrorMessage('Incorrect password');
                console.log(error);
            }
        } else {
            sethourglass(false);
            setErrorMessage('** All fields are required! **');
        }
    }

    return (
        <div className="signin">
            <h2>Already have an account?</h2>
            <h6 style={{color: 'red'}}>{errorMessage? errorMessage : ''}</h6>
            <form>
                    <label htmlFor="email">Email</label>
                    <input 
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={onEmailChanged}
                    />
                    <label htmlFor="password">Password</label>
                    <input 
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                    />
                    <button onClick={onSubmit}>Login{hourglass && <div className="lds-hourglass"></div>}</button>
                </form>
        </div>
    )
}

export default Signin;
