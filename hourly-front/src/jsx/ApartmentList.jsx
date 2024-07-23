import React, { Component } from 'react';
import axios from 'axios';

class ApartmentList extends Component {
  state = {
    apartments: []
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/apartment/')
      .then(res => {
        const apartments = res.data;
        this.setState({ apartments });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h1>Список квартир</h1>
        <ul>
          {this.state.apartments.map(apartment => <li key={apartment.id}>{apartment.title}</li>)}
        </ul>
      </div>
    );
  }
}

export default ApartmentList;
