import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const createdBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(createdBlog))
      dispatch(setNotification(`new blog ${createdBlog.title} by ${createdBlog.author} created`, 5))
    } catch (exception) {
      dispatch(setNotification(`${exception.response.data.error}`, 5, 'error'))
    }

  }

  const updateLikes = async (id) => {
    const toUpdate = blogs.find(b => b.id === id)
    try {
      const updatedBlog = await blogService.update({ ...toUpdate, likes: toUpdate.likes + 1, user: toUpdate.user.id })
      setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
    } catch (exception) {
      dispatch(setNotification(`${exception.response.data.error}`, 5, 'error'))
    }
  }

  const deleteBlog = async (id) => {
    const toDelete = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${toDelete.title} by ${toDelete.author}?`)
    if (ok) {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter(b => b.id !== id))
        dispatch(setNotification(`Deleted ${toDelete.title} by ${toDelete.author}`, 5))
      } catch (exception) {
        dispatch(setNotification(`${exception.response.data.error}`, 5, 'error'))
      }
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBloglistappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(setNotification(`${user.name} welcome back!`, 5))
    } catch (exception) {
      dispatch(setNotification(`${exception.response.data.error}`, 5, 'error'))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistappUser')
    setUser(null)
  }

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  if (!user) {
    return (
      <div>
        <Notification />
        <LoginForm
          handleSubmit={handleLogin}
          username={username} password={password}
          handleUsernameChange={setUsername} handlePasswordChange={setPassword}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user.name} logged in
      <button type="submit" onClick={handleLogout}>logout</button>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateLikes={updateLikes}
          deleteBlog={deleteBlog}
          user={user}
        />
      )}
    </div>
  )
}

export default App