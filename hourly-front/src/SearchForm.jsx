import React, { useState } from "react";
import './SearchStyles.css';
import CityDropdown from "./CityDropdown";
import axios from "axios";


const ApartmentSearchForm = () => {
    const [searchData, setSearchData] = useState({
        destination: "",
        checkInDate: "",
        checkOutDate: "",
        adults: 1,
        children: 0,
        petsAllowed: false
    });

    const handlePetsAllowedChange = (e) => {
        setSearchData({ ...searchData, petsAllowed: e.target.checked });
    };

    const handleSearch = async () => {
        const inputElement = document.querySelector('.destination-input');
        inputElement.dispatchEvent(new Event('change'));
        console.log(searchData)
        try {
            const response = await axios.post('http://localhost:8000/api/search', searchData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
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
                    <label className="font label">Check-in Date</label>
                    <input
                        // required 
                        className="input font check-in-date-input"
                        value={searchData.checkInDate}
                        onChange={(e) => setSearchData({ ...searchData, checkInDate: e.target.value })}
                        type="date"
                    />
                </div>
                <div className="input-box">
                    <label className="font label">Check-out Date</label>
                    <input
                        // required
                        className="input font check-out-date-input"
                        value={searchData.checkOutDate}
                        onChange={(e) => setSearchData({ ...searchData, checkOutDate: e.target.value })}
                        type="date"
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
                            className="font form-check-input pets-allowed-checkbox "
                            type="checkbox"
                            checked={searchData.petsAllowed}
                            onChange={handlePetsAllowedChange}
                        /></div>
                </div>
            </div>
            <button className="btn btn-primary search-button" type="button"
                onClick={handleSearch}
            >
                Search!
            </button>
        </form>
    );
};

export default ApartmentSearchForm;
