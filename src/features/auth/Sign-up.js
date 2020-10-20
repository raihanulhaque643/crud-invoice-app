import React from 'react';
import './authStyles.css';

const Signup = () => {
    return (
        <div className="signup">
        <h2>Register / Sign up</h2>
        <form>
            <label htmlFor="email">Email</label>
            <input 
            placeholder="Email"
            id="email"
            type="email"/>
            <label htmlFor="password">Password</label>
            <input 
            placeholder="Password"
            id="password"
            type="password"/>
            <label htmlFor="confirmPassword">Confim password</label>
            <input 
            placeholder="Confim password"
            id="confirmPassword"
            type="password"/>
            <button>Sign up</button>
        </form>
    </div>
    )
}

export default Signup;
