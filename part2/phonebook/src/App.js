import React, { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searched, setSearched] = useState('');

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