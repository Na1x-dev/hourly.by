import React, { useState } from 'react'; // Импортируйте React и useState
import Header from '../jsx/Header';
import Footer from '../jsx/Footer';
import ApartmentSearchForm from '../jsx/SearchForm';
import ApartmentList from '../jsx/ApartmentList';
import axios from 'axios';
import {  useAuth } from '../jsx/AuthContext'; 
import { getReq, postReq } from '../Api';

const Home = () => {
  const [apartments, setApartments] = useState([]);
  
  const handleSearch = async (searchData) => {
    try {
      const response = await postReq('/search', searchData);
      setApartments(response);
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
