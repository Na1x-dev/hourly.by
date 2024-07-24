import '../style/Login.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const toLoginForm = () => {
    navigate("/login");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь вы можете добавить логику для отправки данных на сервер
    if (formData.password !== formData.confirmPassword) {
      alert("Пароли не совпадают!");
      return;
    }

    console.log('Registration data:', formData);
    // Например, вызвать API для регистрации
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='registration-form'>
        <h2>Registration</h2>
        <div className='form-inputs'>
          <div className='left-column'>
            <div>
              <label className='input-label'>first name</label>
              <input
                className='form-input'
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className='input-label'>last name</label>
              <input
                className='form-input'
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className='input-label'>patronymic</label>
              <input
                className='form-input'
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className='vertical-line'></div>
          <div className='right-column'>
            <div>
              <label className='input-label'>email</label>
              <input
                className='form-input'
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className='input-label'>password</label>
              <input
                className='form-input'
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className='input-label'>re enter password</label>
              <input
                className='form-input'
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <button className='btn btn-primary register-button' type="button">Register</button>
        <div className='to-login-text'>or <span  onClick={toLoginForm} className='to-login'>login</span></div>
      </form>
    </div>
  );
};

export default RegistrationForm;
