import React, { useEffect } from 'react'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { logout } from './reducers/userReducer'


const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
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
    <div>
      <h2>blogs</h2>
      <Notification />
      {user.name} logged in
      <button type="submit" onClick={handleLogout}>logout</button>
      <BlogForm />
      <BlogList />
    </div>
  )
}

export default App