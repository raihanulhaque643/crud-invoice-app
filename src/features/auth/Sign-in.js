import React from 'react';
import './authStyles.css';

const Signin = () => {
    return (
        <div className="signin">
            <h2>Already have an account?</h2>
            <form>
                    <label htmlFor="email">Email</label>
                    <input 
                    placeholder="Email"
                    type="email"/>
                    <label htmlFor="password">Password</label>
                    <input 
                    placeholder="Password"
                    type="password"/>
                    <button>Sign in</button>
                </form>
        </div>
    )
}

export default Signin;
