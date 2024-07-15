import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CityDropdown.css'

const CityDropdown = () => {
  const [cities, setCities] = useState([]);
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/get_cities');
        setCities(response.data);
      } catch (error) {
        console.error('Error fetching cities', error);
      }
    };


    fetchCities();
  }, []);



  return (
    <div className='dropdown-container'>
      <div className="dropdown">
        {cities.map((city) => (
          <div className='dropdown-item'
            onClick={() => selectItem(city.city)}
            key={city.city}>{city.city}</div>
        ))}
      </div>
    </div>

  );
};

const selectItem = (item) => {
  document.querySelector('.destination-input').value = item;
  document.querySelector('.dropdown').style.height = '0';
  document.querySelector('.dropdown').style.paddingTop = '0'
  document.querySelector('.dropdown').style.paddingBottom = '0'
  document.querySelector('.dropdown').style.borderBottom = '0'
}

setTimeout(() => {
  const destinationInput = document.querySelector('.destination-input');
  destinationInput.onclick = () => { 
    document.querySelector('.dropdown').style.height = '450px'
     document.querySelector('.dropdown').style.paddingTop = '10px'
  document.querySelector('.dropdown').style.paddingBottom = '10px'
    document.querySelector('.dropdown').style.borderBottom = '2px solid #ccc'
   
    
  }
}, 100);

export default CityDropdown;
