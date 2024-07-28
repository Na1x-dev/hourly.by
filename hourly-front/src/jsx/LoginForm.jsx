import { useNavigate } from 'react-router-dom';
import '../style/Login.css';
import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
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
            
            // Сохраните токены в localStorage
            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
            
            // Перенаправление после успешного входа
            navigate('/dashboard'); // Или любая другая страница
        } catch (error) {
            console.error('Ошибка входа:', error);
            // Здесь можно добавить обработку ошибок, например, показать сообщение пользователю
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
