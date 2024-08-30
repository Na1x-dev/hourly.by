import React, { useState } from "react";
import '../style/SearchStyles.css';
import CityDropdown from "../jsx/CityDropdown";
import axios from "axios";
import BookingCalendar from "./BookingCalender";



const ApartmentSearchForm = ({ onSearch, dateRange, setDateRange }) => {
    const [searchData, setSearchData] = useState({
        destination: "",
        checkInDate: "",
        checkOutDate: "",
        adults: 1,
        children: 0,
        petsAllowed: false
    });
  
    const handleDateChange = (dates) => {
        setDateRange(dates);
        if(dates[0] && dates[1]){
            setSearchData({
                ...searchData, 
                checkInDate: dates[0].toISOString().split('T')[0],
                checkOutDate: dates[1].toISOString().split('T')[0]
            })
        }
    };



    const handlePetsAllowedChange = (e) => {
        setSearchData({ ...searchData, petsAllowed: e.target.checked });
    };

    const handleSubmit = (event) => {
        event.preventDefault();// Соберите ваши данные поиска из формы
        
        //check data field

        onSearch(searchData); // Вызовите метод поиска с данными
        setTimeout(() => document.getElementById('apartment-list').scrollIntoView({ behavior: 'smooth' }), 100)
    };


    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSearchData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <form className="apartment-search-form">
            <h1 className="form-header-text">Apartment Search</h1>
            <div className="inputs-container">
                <div className="input-box">
                    <label className="font label">Destination</label>
                    <input type="text" name="destination" value={searchData.destination} onChange={handleInputChange}
                        required
                        className="input font destination-input"
                        autoFocus
                        // onChange={handleDestinationChange}
                        // value={searchData.destination}
                        // type="text"
                        placeholder="Enter destination"
                    />
                    {/* {showCityDropdown&&<CityDropdown ></CityDropdown>} */}
                    <CityDropdown data={searchData}></CityDropdown>
                </div>
           
                <div className="input-box">
                    <label className="font label">Check-in-out Date</label>
                    <BookingCalendar 
                        dateRange={dateRange}
                        setDateRange={handleDateChange}

                    />
                </div>

                <div className="input-box">
                    <label className="font label">Adults</label>
                    <input
                        // required
                        className="input font adults-input"
                        value={searchData.adults}
                        onChange={(e) => setSearchData({ ...searchData, adults: parseInt(e.target.value) })}
                        type="number"
                        min="1"
                    /></div>
                <div className="input-box">
                    <label className="font label">Children</label>
                    <input
                        // required
                        className="input font children-input"
                        value={searchData.children}
                        onChange={(e) => setSearchData({ ...searchData, children: parseInt(e.target.value) })}
                        type="number"
                        min="0"
                    /></div>
                <div className="input-box ">
                    <label className="font label">Pets Allowed</label>
                    <div className="checkbox-container form-switch">
                        <input
                            id="flexSwitchCheckDefault"
                            className="form-check-input pets-allowed-checkbox "
                            type="checkbox"
                            checked={searchData.petsAllowed}
                            onChange={handlePetsAllowedChange}
                        />
                        <label class="form-check-label" for="flexSwitchCheckDefault"></label>
                    </div>
                </div>
            </div>
            <button className="btn btn-primary search-button" type="button"
                onClick={handleSubmit}
            >
                Search!
            </button>
        </form>
    );
};

export default ApartmentSearchForm;
