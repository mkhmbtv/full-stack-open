import React, { useEffect } from 'react'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
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
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
  }

  const userMatch = useRouteMatch('/users/:id')
  const blogMatch = useRouteMatch('/blogs/:id')

  const user = userMatch && users
    ? users.find(user => user.id === userMatch.params.id)
    : null

  const blog = blogMatch && blogs
    ? blogs.find(blog => blog.id === blogMatch.params.id)
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
        <Route path="/blogs/:id">
          <Blog blog={blog} />
        </Route>
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