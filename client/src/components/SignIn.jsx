import React, { useState } from 'react';
import '../css/signin.css';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { useForm } from 'react-hook-form';

const SignIn = ({ checkLoginFunc }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
  
    async function receiveFormData(formData) {
        setLoginError(''); // Reset the login error message
        authService.signIn(formData, (success) => {
            if (success) {
                checkLoginFunc(); // Check if logged in
                navigate('/');
            } else {
                setLoginError('Incorrect email or password. Please try again.');
            }
        });
    }
  
    return (
        <form className="form-signin" onSubmit={handleSubmit(receiveFormData)}>
            <h1 className="h3 mb-3 font-weight-normal text-center">Please sign in</h1>
            
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input 
                {...register('email', { 
                    required: 'Email is required.', 
                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format.' } 
                })} 
                type="email" 
                id="inputEmail" 
                className="form-control" 
                placeholder="Email address" 
            />
            {errors.email && <small className="text-danger">{errors.email.message}</small>}
            
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input 
                {...register('password', { 
                    required: 'Password is required.', 
                    minLength: { value: 6, message: 'Password must be at least 6 characters.' } 
                })} 
                type="password" 
                id="inputPassword" 
                className="form-control" 
                placeholder="Password" 
            />
            {errors.password && <small className="text-danger">{errors.password.message}</small>}
            
            {loginError && <small className="text-danger text-center d-block mt-3">{loginError}</small>}

            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
    );
};

export default SignIn;
