import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searched, setSearched] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      })
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find(person => person.name === newName)) {
      return alert(`${newName} is already added to phonebook`);
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchedChange = (event) => {
    setSearched(event.target.value);
  };

  const personsToShow = (
    persons.filter(person => 
    person.name.toLowerCase().startsWith(searched.toLowerCase()))
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searched} handleChange={handleSearchedChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} 
        name={newName} handleNameChange={handleNameChange}
        number={newNumber} handleNumberChange={handleNumberChange} 
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;