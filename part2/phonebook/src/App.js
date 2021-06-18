import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searched, setSearched] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
      setPersons(initialPersons);
    })
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const alreadyExists = persons.find(p => p.name === newName);
    
    if (alreadyExists) {
      updateNumber(alreadyExists.id)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      };

      personService
        .create(newPerson)
        .then(returnedPerson => {
          handleMessage(`Added ${returnedPerson.name}`);
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          handleMessage(`${error.response.data.error}`, true);
        })
    }
  };

  const updateNumber = id => {
    const person = persons.find(p => p.id === id);
    const changedPerson = {...person, number: newNumber};

    if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(id, changedPerson)
          .then(returnedPerson => {      
            handleMessage(`Changed ${returnedPerson.name}'s number`);
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson));
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            handleMessage(`${error.response.data.error}`, true);
          })
    }
  }

  const deletePerson = id => {
    const person = persons.find(p => p.id === id);

    if (window.confirm(`Delete ${person.name}`)) {
      personService
        .remove(id)
        .then((response) => {
          handleMessage(`Deleted ${person.name}`);
          setPersons(persons.filter(p => p.id !== id));
        })
        .catch(error => {
          handleMessage(`Information of ${person.name} has already been removed from server`, true);
          setPersons(persons.filter(p => p.id !== id));
        })
    }
  };

  const handleMessage = (message, isError = false) => {
    setMessage({
      message: message,
      error: isError
    });

    setTimeout(() => {
      setMessage(null)
    }, 5000);
  }

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
      <Notification message={message} />
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