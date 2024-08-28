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
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);

  const handleSearch = async (searchData) => {
    try {
      const response = await postReq('/search', searchData);
      console.log(searchData)
      setApartments(response);
      console.log(response)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='app'>
      <Header />
      <ApartmentSearchForm dateRange={dateRange} setDateRange={setDateRange} onSearch={handleSearch} />
      <ApartmentList dateRange={dateRange} setDateRange={setDateRange} apartments={apartments} />
      <Footer />
    </div>
  );
};

export default Home;
