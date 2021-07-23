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
  Link,
  useRouteMatch
} from 'react-router-dom'

import { Navbar, Nav, Button } from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

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
      <div className="container">
        <Notification />
        <LoginForm />
      </div>
    )
  }

  const padding = {
    padding: 5
  }

  return (
    <div className="container">
      <Notification />

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="container-fluid">
            <Nav.Link as="span">
              <Link style={padding} to="/">blogs</Link>
            </Nav.Link>
            <Nav.Link as="span">
              <Link style={padding} to="/users">users</Link>
            </Nav.Link>
            <Nav.Link as="span" className="ml-auto">
              <em>{loggedUser.name} logged in</em> <Button type="submit" variant="light" onClick={() => dispatch(logout())}>logout</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <h2>blog app</h2>
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