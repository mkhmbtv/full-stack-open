import React, { useEffect } from 'react'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { logout } from './reducers/userReducer'

import {
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom'


const App = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
  }

  const match = useRouteMatch('/users/:id')

  const user = match && users
    ? users.find(user => user.id === match.params.id)
    : null

  if (!loggedUser) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>{loggedUser.name} logged in</p>
      <button type="submit" onClick={handleLogout}>logout</button>
      <Switch>
        <Route path="/users/:id">
          <User user={user} />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <BlogForm />
          <BlogList />
        </Route>
      </Switch>
    </div>
  )
}

export default App