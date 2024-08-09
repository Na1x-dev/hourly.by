import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/CityDropdown.css'
import { getReq } from '../Api';

const CityDropdown = (props) => {
  const [cities, setCities] = useState([]);
  useEffect(() => {
    const fetchCities = async() => {
       try {
        const response = await getReq('get_cities');
        setCities(response);
      } catch (error) {
        console.error('Error fetching cities', error);
      }
    };


    fetchCities();
  }, []);


  const selectItem = (item) => {
    const inputElement = document.querySelector('.destination-input');
    inputElement.value = item;
    props.data.destination = item
    hideDropdown();
  }


  const hideDropdown = () => {
    document.querySelector('.dropdown').style.height = '0';
    document.querySelector('.dropdown').style.paddingTop = '0'
    document.querySelector('.dropdown').style.paddingBottom = '0'
    document.querySelector('.dropdown').style.borderBottom = '0'
  }

  const showDropdown = () => {
    document.querySelector('.dropdown').style.height = '300px'
    document.querySelector('.dropdown').style.paddingTop = '10px'
    document.querySelector('.dropdown').style.paddingBottom = '10px'
    document.querySelector('.dropdown').style.borderBottom = '2px solid #ccc'
  }

  setTimeout(() => {
    const destinationInput = document.querySelector('.destination-input');
    const app = document.querySelector('.app');
    app.onclick = () => {
      hideDropdown()
    }
    destinationInput.addEventListener('click', function (event) {
      event.stopPropagation();
      showDropdown()

    });
  }, 100);

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


export default CityDropdown;
