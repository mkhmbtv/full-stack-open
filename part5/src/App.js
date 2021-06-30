import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

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

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const createdBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(createdBlog))
      handleNotification(`new blog ${createdBlog.title} by ${createdBlog.author} added`)
    } catch (exception) {
      handleNotification(`${exception.response.data.error}`, 'error')
    }
    
  }

  const updateBlog = async (id, blogObject) => {
    try {
      const updatedBlog = await blogService.update(id, blogObject)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
    } catch (exception) {
      handleNotification(`${exception.response.data.error}`, 'error')
    }
  }

  const deleteBlog = async (id) => {
    const toDelete = blogs.find(b => b.id === id)
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(b => b.id !== id))
      handleNotification(`Deleted ${toDelete.title} by ${toDelete.author}`)
    } catch (exception) {
      handleNotification(`${exception.response.data.error}`, 'error')
    }
  }

  const handleNotification = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
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
    } catch (exception) {
      console.log(exception.response.data.error)
      handleNotification(`${exception.response.data.error}`, 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistappUser')
    setUser(null)
  }

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
   
  if (user === null) {
    return (
      <div>
        <Notification notification={notification} />
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
      <Notification notification={notification} />
      {user.name} logged in
      <button type="submit" onClick={handleLogout}>logout</button>
      {blogForm()}
      {sortedBlogs.map(blog =>
        <Blog 
          key={blog.id} 
          blog={blog} 
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
        />
      )}
    </div>
  )
}

export default App