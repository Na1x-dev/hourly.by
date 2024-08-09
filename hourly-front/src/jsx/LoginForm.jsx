import { useNavigate } from 'react-router-dom';
import '../style/Login.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../jsx/AuthContext';
import { postReq, getReq } from '../Api';


const LoginForm = () => {
    const { login } = useAuth()
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
    
        if (!checkIsEmptyFields()) {
            const credentialsData = {
                email: credentials.email,
                password: credentials.password,
            };
    
            try {
                const response = await postReq('/token/', credentialsData);
                login(response.access, response.refresh);
                navigate('/');
            } catch (error) {
                console.error('Ошибка входа:', error);
                alert("Не верные логин и(или) пароль");
            }
        }
    };

    const checkIsEmptyFields = () => {
        let flag = false;
        const fields = document.getElementsByClassName('form-input');
        for (let field of fields) {
            if (field.value == '') {
                field.classList.add('error-field');
                flag = true;
            }
            else field.classList.remove('error-field');
        }
        if (flag)
            alert("Не все поля заполенены");
        return flag;
    }

    return (
        <div>
            <form className='login-form' onSubmit={handleSubmit}>
                <h2 className='main-login-text'>Welcome!</h2>
                <div className='login-form-inputs'>
                    <div>
                        <label className='input-label email-label'>email</label>
                        <input
                            required='required'
                            className='form-input'
                            type="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
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
                            required='required'
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
