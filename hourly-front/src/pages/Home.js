import React, { useState } from 'react'; // Импортируйте React и useState
import Header from '../jsx/Header';
import Footer from '../jsx/Footer';
import ApartmentSearchForm from '../jsx/SearchForm';
import ApartmentList from '../jsx/ApartmentList';
import axios from 'axios';
import {  useAuth } from '../jsx/AuthContext'; 


const Home = () => {
  const [apartments, setApartments] = useState([]);
  console.log(useAuth())
  
  const handleSearch = async (searchData) => {
    try {
      const response = await axios.post('http://localhost:8000/api/search', searchData);
      setApartments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='app'>
      <Header />
      <ApartmentSearchForm onSearch={handleSearch} />
      <ApartmentList apartments={apartments} />
      <Footer />
    </div>
  );
};

export default Home;
