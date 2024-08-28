import React, { Component } from 'react';
import axios from 'axios';
import Apartment from './Apartment'
import '../style/Apartment.css'


const ApartmentList = ({ apartments, dateRange, setDateRange }) => {
  return (
    <div className='apartment-list' id="apartment-list">
      {apartments.map(apartment =>
        <Apartment key={apartment.id}  apartment={apartment} dateRange={dateRange} setDateRange={setDateRange}></Apartment>
      )}
    </div>
  );
}

export default ApartmentList;
