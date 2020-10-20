import React from 'react';
import '../features/auth/authStyles.css';
import Signin from '../features/auth/Sign-in';
import Signup from '../features/auth/Sign-up';

const AuthPage = () => {
    return (
        <div className="container">
            <Signup />
            <Signin />
        </div>
    )
}

export default AuthPage;
