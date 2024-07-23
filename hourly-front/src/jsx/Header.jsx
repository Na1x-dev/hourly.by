// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import '../style/Header.css'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const unfixHeader = () => {
    window.addEventListener('scroll', () => {
      const header = document.querySelector('.header');
      if (window.scrollY > 0) {
        header.classList.add('scrolled');
      }
      else header.classList.remove('scrolled');
    })
  }

  unfixHeader();

  const toLoginForm = () => {
    navigate("/login");
  }

  const toHomePage = () => {
    navigate("/");
  }

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
        </svg></div>
      <button className='to-login-button btn btn-primary' onClick={toLoginForm}>login</button>
    </header>

  );
};


export default Header;
