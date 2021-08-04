import React, { useState } from 'react'
import { useApolloClient } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const nav = () => {
    if (token) {
      return (
        <>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={logout}>logout</button>
        </>
      )
    } else {
      return <button onClick={() => setPage('login')}>login</button>
    }
  }
  
  return (
    <div>
      <Notification errorMessage={errorMessage} />
      <div>
          <div>
            <button onClick={() => setPage('authors')}>authors</button>
            <button onClick={() => setPage('books')}>books</button>
            {nav()}
          </div>
      </div>

      <Authors
        show={page === 'authors'}
        setError={notify}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
      />

      <LoginForm
        show={page === 'login'}
        setError={notify}
        setToken={setToken}
        setPage={setPage}
      />

    </div>
  )
}

export default App