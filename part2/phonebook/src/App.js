import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searched, setSearched] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
      setPersons(initialPersons);
    })
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const exactMatchPerson = persons.find(p => p.name === newName && p.number === newNumber);
    const nameMatchPerson = persons.find(p => p.name === newName && p.number !== newNumber);
    
    if (exactMatchPerson) {
      return alert(`${newName} is already added to phonebook`);
    } else if (nameMatchPerson) {
      return updateNumber(nameMatchPerson.id);
    }

    const newPerson = {
      name: newName,
      number: newNumber
    };
    
    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
      })
  };

  const updateNumber = id => {
    const person = persons.find(p => p.id === id);
    const changedPerson = {...person, number: newNumber};

    if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson));
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            alert(`${person.name} was already deleted from server`);
            setPersons(persons.filter(p => p.id !== id));
          })
    }
  }

  const deletePerson = id => {
    const person = persons.find(p => p.id === id);

    if (window.confirm(`Delete ${person.name}`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
        })
        .catch(error => {
          alert(`${person.name} was already deleted from server`);
          setPersons(persons.filter(p => p.id !== id));
        })
    }
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
    person.name.toLowerCase().includes(searched.toLowerCase()))
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
      <Persons persons={personsToShow} handleClick={deletePerson}/>
    </div>
  );
};

export default App;