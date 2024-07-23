import '../style/Login.css';
import React, { useState } from 'react';

const LoginForm = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Здесь вы можете добавить логику для отправки данных на сервер
        console.log('Login credentials:', credentials);
        // Например, вызвать API для аутентификации
    };

    return (
        <div>
            <form className='login-form' onSubmit={handleSubmit}>
                <h2 className='main-login-text'>Welcome!</h2>
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
                <button className='btn btn-primary login-button' type="button">Enter</button>
                <div className='to-register-part'>
                    <div className='login-or'>or</div>
                    <div className='to-register'>register</div>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
