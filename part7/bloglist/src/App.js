import React, { useEffect } from 'react'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Users from './components/Users'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { logout } from './reducers/userReducer'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'


const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
  }

  if (!user) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <Router>
      <div>
        <h2>blogs</h2>
        <Notification />
        <p>{user.name} logged in</p>
        <button type="submit" onClick={handleLogout}>logout</button>
        <Switch>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <BlogForm />
            <BlogList />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App