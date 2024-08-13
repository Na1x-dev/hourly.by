import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { useAuth } from './AuthContext';
import '../style/Header.css'
import { useNavigate, useLocation } from 'react-router-dom';
import { getReq } from '../Api';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate();
  const location = useLocation();

  const showUser = async () => {
    try {
      const response = await getReq(`users/${user.user_id}/`, { // Используем шаблонные строки
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Добавляем "Bearer" перед токеном, если это требуется
        },
      });
      document.querySelector('.header-user-name').textContent = response;
    } catch (error) {
      console.error('Ошибка при получении пользователя:', error);
    }
  };


  const handleScroll = () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 0) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  useEffect(() => {
    showUser();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [user, isAuthenticated]);

  const logoutFunction = () => {
    logout()
    navigate('/login')
  }


  const toLoginForm = () => {
    navigate("/login");
  }

  const toHomePage = () => {
    navigate("/");
  }

  const hideLoginButtonRoutes = ['/login', '/register'];

  return (
    <header className='header'>
      <div onClick={toHomePage} className='logo'>
        {/* <div className='logo-sun'></div> */}
        <svg className='left-palm'>
          <image className='palm-image' xlinkHref="https://svgsilh.com/svg/23907.svg" src="https://svgsilh.com/svg/23907.svg" width="100%" height="100%" />
          <image xlinkHref="https://svgsilh.com/svg/23907.svg" ></image>
        </svg>
        <div className=''>Horly.BY</div>
        <svg className='right-palm'>
          <image className='palm-image' xlinkHref="https://svgsilh.com/svg/23907.svg" src="https://svgsilh.com/svg/23907.svg" width="100%" height="100%" />
        </svg>
      </div>
      {user ?
        (<div className='header-right-buttons'>
          <div className='header-user-name'>admin a.a.</div>
          <button className='menu-button btn btn-primary' >menu</button>
          <button className='logout-button btn btn-primary' onClick={logoutFunction}>logout</button>
        </div>) :
        (
          // (!hideLoginButtonRoutes.includes(location.pathname) && (
          <button className='to-login-button btn btn-primary' onClick={toLoginForm}>login</button>
        )}




    </header>

  );
};


export default Header;
