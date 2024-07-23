// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import '../style/Header.css'

const Header = () => {

  return (
    <header className='header'>
      <div className='logo'>
        {/* <div className='logo-sun'></div> */}
        <svg className='left-palm'>
          <image className='palm-image' xlinkHref="https://svgsilh.com/svg/23907.svg" src="https://svgsilh.com/svg/23907.svg" width="100%" height="100%" />
          <use xlinkHref="https://svgsilh.com/svg/23907.svg" ></use>
        </svg>
        <div className=''>Horly.BY</div>
        <svg className='right-palm'>
          <image className='palm-image' xlinkHref="https://svgsilh.com/svg/23907.svg" src="https://svgsilh.com/svg/23907.svg" width="100%" height="100%" />
        </svg></div>
      <button className='login-button btn btn-primary'>login</button>
    </header>

  );
};


export default Header;
