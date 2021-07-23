import React from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    event.target.username.value = ''
    event.target.password.value = ''
    dispatch(loginUser({ username, password }))
  }

  return (
    <div>
      <h2>log in to application</h2>
      <Form onSubmit={handleLogin} style={{ width: '18rem' }}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            id="username"
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
            name='password'
            id="password"
          />
          <Button id="login-button" variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm