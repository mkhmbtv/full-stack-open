import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './components/Countries'
import Filter from './components/Filter'

function App() {
  const [countries, setCountries] = useState([]);
  const [searched, setSearched] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(promise => {
        setCountries(promise.data);
      });
  });

  const handleSearchedChange = (event) => {
    setSearched(event.target.value);
  };

  const handleClick = (country) => {
    return () => setSearched(country);
  };


  const filteredCountries = (searched === ''
    ? []
    : countries.filter(country => {
      return country.name.toLowerCase().includes(searched.toLowerCase());
    })
  );

  return (
    <div>
      <Filter value={searched} handleChange={handleSearchedChange} />
      <Countries countries={filteredCountries} handleClick={handleClick}/>
    </div>
  );
}

export default App;
