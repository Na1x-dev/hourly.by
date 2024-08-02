import '../style/Login.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const RegistrationForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  // let confirmPassword = '';


  const toLoginForm = () => {
    navigate("/login");
  }

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Здесь вы можете добавить логику для отправки данных на сервер
    if (password !== confirmPassword) {
      alert("Пароли не совпадают!");
      return;
    }
    try {
      await axios.post('http://localhost:8000/api/register/', {
        email,
        first_name: firstName,
        last_name: lastName,
        patronymic,
        password,
      });
      alert('Регистрация успешна!');
    } catch (error) {
      console.error('Произошла ошибка!', error);
      alert('Регистрация не удалась!');
    }
    // console.log('Registration data:', formData);
    // Например, вызвать API для регистрации
  };

  return (
    <div>
      <form className='registration-form'>
        <h2>Registration</h2>
        <div className='form-inputs'>
          <div className='left-column'>
            <div>
              <label className='input-label'>first name</label>
              <input
                className='form-input'
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e)=>setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className='input-label'>last name</label>
              <input
                className='form-input'
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e)=>setLastName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className='input-label'>patronymic</label>
              <input
                className='form-input'
                type="text"
                name="middleName"
                value={patronymic}
                onChange={(e)=>setPatronymic(e.target.value)}
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
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className='input-label'>password</label>
              <input
                className='form-input'
                type="password"
                name="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label className='input-label'>re enter password</label>
              <input
                className='form-input'
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <button className='btn btn-primary register-button' onClick={handleSubmit} type="button">Register</button>
        <div className='to-login-text'>or <span onClick={toLoginForm} className='to-login'>login</span></div>
      </form>
    </div>
  );
};

export default RegistrationForm;
