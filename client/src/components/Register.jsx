import React, { useState } from 'react';
import '../css/signin.css';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { useForm } from 'react-hook-form';

const Register = ({ checkLoginFunc }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [generalError, setGeneralError] = useState('');
    const navigate = useNavigate();

    async function receiveFormData(formData) {
        setGeneralError('');
        authService.register(formData, (success) => {
            if (success) {
                checkLoginFunc();
                navigate('/');
            } else {
                setGeneralError('Registration failed: Invalid credentials or server error.');
            }
        });
    }

    return (
        <form className="form-signin" onSubmit={handleSubmit(receiveFormData)}>
            <h1 className="h3 mb-3 font-weight-normal text-center">Please Register</h1>

            <label htmlFor="inputFirstName" className="sr-only">First Name</label>
            <input
                {...register('first_name', { required: 'First Name is required' })}
                type="text"
                id="inputFirstName"
                className="form-control"
                placeholder="First Name"
            />
            {errors.first_name && <div className="alert alert-danger">{errors.first_name.message}</div>}

            <label htmlFor="inputLastName" className="sr-only">Last Name</label>
            <input
                {...register('last_name', { required: 'Last Name is required' })}
                type="text"
                id="inputLastName"
                className="form-control"
                placeholder="Last Name"
            />
            {errors.last_name && <div className="alert alert-danger">{errors.last_name.message}</div>}

            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input
                {...register('email', {
                    required: 'Email is required',
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Invalid email format',
                    },
                })}
                type="email"
                id="inputEmail"
                className="form-control"
                placeholder="Email address"
            />
            {errors.email && <div className="alert alert-danger">{errors.email.message}</div>}

            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input
                {...register('password', {
                    required: 'Password is required',
                    minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                    },
                })}
                type="password"
                id="inputPassword"
                className="form-control"
                placeholder="Password"
            />
            {errors.password && <div className="alert alert-danger">{errors.password.message}</div>}

            {generalError && <div className="alert alert-danger text-center mt-3">{generalError}</div>}

            <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
        </form>
    );
};

export default Register;
