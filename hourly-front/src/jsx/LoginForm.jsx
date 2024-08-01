import { useNavigate } from 'react-router-dom';
import '../style/Login.css';
import React, { useState } from 'react';
import axios from 'axios';
import {  useAuth } from '../jsx/AuthContext'; 

const LoginForm = () => {
    const {login} = useAuth()
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const toRegistrationForm = () => {
        navigate("/register");
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/token/', {
                email: credentials.email,
                password: credentials.password,
            });
            
            // Используйте функцию login из контекста
            login(response.data.access, response.data.refresh);
            
            // Перенаправление после успешного входа
            navigate('/'); // Или любая другая страница
            // console.log(useAuth())
        } catch (error) {
            console.error('Ошибка входа:', error);
            // setErrorMessage('Неправильный email или пароль. Попробуйте еще раз.');
        }
    };
    

    return (
        <div>
            <form className='login-form' onSubmit={handleSubmit}>
                <h2 className='main-login-text'>Welcome!</h2>
                <div className='login-form-inputs'>
                    <div>
                        <label className='input-label email-label'>email</label>
                        <input
                            className='form-input'
                            type="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className='input-label password-label'>password</label>
                        <input
                            className='form-input'
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <button className='btn btn-primary login-button' onClick={handleSubmit} type="button">Enter</button>
                <div className='to-register-part'>
                    <div className='login-or'>or</div>
                    <div onClick={toRegistrationForm} className='to-register'>register</div>
                </div>

            </form>
        </div>
    );
};

export default LoginForm;
