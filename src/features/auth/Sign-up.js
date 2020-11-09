import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './authStyles.css';
import { auth } from "../../firebase/firebase";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [hourglass, sethourglass] = useState(false);

    const onEmailChanged = e => setEmail(e.target.value);
    const onPasswordChanged = e => setPassword(e.target.value);
    const onConfirmPasswordChanged = e => setConfirmPassword(e.target.value);

    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = async e => {
        sethourglass(true);
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        if(email && password && confirmPassword) {
            if(password === confirmPassword) {
                try {
                    const success = await auth.createUserWithEmailAndPassword(email, password);
                    if (success) {
                        sethourglass(false);
                        setSuccessMessage('Account created successfully!');
                    }       
                } catch (error) {
                    sethourglass(false);
                    setErrorMessage(`${error}`)
                    console.error(error);
                }
                    
                  
            } else {
                sethourglass(false);
                setErrorMessage('Passwords do not match!');
            }
        } else {
            sethourglass(false);
            setErrorMessage('** All fields are required! **');
        }
    }


    return (
        <div className="signup">
        <h2>Register / Sign up</h2>
        <h6 style={{color: 'red'}}>{errorMessage? errorMessage : ''}</h6>
        <h6 style={{color: 'lightgreen'}}>{successMessage? successMessage : ''}</h6>
        <form>
            <label htmlFor="email">Email</label>
            <input 
            placeholder="Email"
            id="email"
            type="email"
            value={email}
            onChange={onEmailChanged}
            />
            <label htmlFor="password">Password</label>
            <input 
            placeholder="Password"
            id="password"
            type="password"
            value={password}
            onChange={onPasswordChanged}    
            />
            <label htmlFor="confirmPassword">Confirm password</label>
            <input 
            placeholder="Confim password"
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={onConfirmPasswordChanged} 
            />
            <button onClick={onSubmit}>Sign up{hourglass && <div class="lds-hourglass"></div>}</button>
        </form>
    </div>
    )
}

export default Signup;
