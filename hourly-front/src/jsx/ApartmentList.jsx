import React, { Component } from 'react';
import axios from 'axios';
import Apartment from './Apartment'
import '../style/Apartment.css'


const ApartmentList = ({ apartments }) => {
  return (
    <div className='apartment-list' id="apartment-list">
      {apartments.map(apartment =>
        <Apartment key={apartment.id} apartment={apartment}></Apartment>
      )}
    </div>
  );
}

export default ApartmentList;
