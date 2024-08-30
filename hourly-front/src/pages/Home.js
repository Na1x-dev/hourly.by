import React, { useState } from 'react'; // Импортируйте React и useState
import Header from '../jsx/Header';
import Footer from '../jsx/Footer';
import ApartmentSearchForm from '../jsx/SearchForm';
import ApartmentList from '../jsx/ApartmentList';
import axios from 'axios';
import {  useAuth } from '../jsx/AuthContext'; 
import { getReq, postReq } from '../Api';
import { SnackbarProvider } from 'notistack';

const Home = () => {
  const [apartments, setApartments] = useState([]);
  
  const initDatePicker = () =>{
    const tomorrow = new Date();
    const afterTomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate()+1);
    afterTomorrow.setDate(tomorrow.getDate()+1);
    return [tomorrow, afterTomorrow];
  }
  
  const [dateRange, setDateRange] = useState(initDatePicker);

  

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
      <SnackbarProvider maxSnack={3}>
      <Header />
      <ApartmentSearchForm dateRange={dateRange} setDateRange={setDateRange} onSearch={handleSearch} />
      <ApartmentList dateRange={dateRange} setDateRange={setDateRange} apartments={apartments} />
      <Footer />
      </SnackbarProvider>
    </div>
  );
};

export default Home;
