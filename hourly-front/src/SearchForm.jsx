import React, { useState } from "react";
import './SearchStyles.css';
import CityDropdown from "./CityDropdown";

const ApartmentSearchForm = ({ searchApartment }) => {
    const [searchData, setSearchData] = useState({
        destination: "",
        checkInDate: "",
        checkOutDate: "",
        adults: 1,
        children: 0,
        petsAllowed: false
    });


    
    // const [showCityDropdown, setShowCityDropdown] = useState(false); // Добавляем состояние для отслеживания видимости CityDropdown

    // const handleSearch = (e) => {
    //     e.preventDefault();
    //     searchApartments(searchData);
    // };

    const handlePetsAllowedChange = (e) => {
        setSearchData({ ...searchData, petsAllowed: e.target.checked });
    };

    // const handleInputClick = (e) => {
    //     setShowCityDropdown(true); // При нажатии на input показываем CityDropdown
    //     e.stopPropagation();
    // };

    return (
        <form className="apartment-search-form">
            <h1 className="form-header-text">Apartment Search</h1>
            <div className="inputs-container">
                <div className="input-box">
                    <label className="font label">Destination</label>
                    <input
                        required
                        className="input font destination-input"
                        autoFocus
                        // value={searchData.destination}
                        onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
                        type="text"
                        placeholder="Enter destination"
                        
                        // value={selectedCity}
                    />
                    {/* {showCityDropdown&&<CityDropdown ></CityDropdown>} */}
                    <CityDropdown></CityDropdown>
                    </div>
                <div className="input-box">
                    <label className="font label">Check-in Date</label>
                    <input
                        required
                        className="input font check-in-date-input"
                        value={searchData.checkInDate}
                        onChange={(e) => setSearchData({ ...searchData, checkInDate: e.target.value })}
                        type="date"
                    />
                </div>
                <div className="input-box">
                    <label className="font label">Check-out Date</label>
                    <input
                        required
                        className="input font check-out-date-input"
                        value={searchData.checkOutDate}
                        onChange={(e) => setSearchData({ ...searchData, checkOutDate: e.target.value })}
                        type="date"
                    />
                </div>
                <div className="input-box">
                    <label className="font label">Adults</label>
                    <input
                        required
                        className="input font adults-input"
                        value={searchData.adults}
                        onChange={(e) => setSearchData({ ...searchData, adults: parseInt(e.target.value) })}
                        type="number"
                        min="1"
                    /></div>
                <div className="input-box">
                    <label className="font label">Children</label>
                    <input
                        required
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
                            className="font form-check-input pets-allowed-checkbox "
                            type="checkbox"
                            checked={searchData.petsAllowed}
                            onChange={handlePetsAllowedChange}
                        /></div>
                </div>
            </div>
            <button className="btn btn-primary search-button" type="submit" 
            // onClick={handleSearch}
            >
                Search!
            </button>
        </form>
    );
};

export default ApartmentSearchForm;
