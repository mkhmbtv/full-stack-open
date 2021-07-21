import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useHistory } from 'react-router-dom'

const Blog = ({ blog }) => {
  if (!blog) {
    return null
  }

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleRemove = () => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (ok) {
      dispatch(removeBlog(blog.id))
      dispatch(setNotification(`Deleted ${blog.title} by ${blog.author}`, 5))
      history.push('/')
    }
  }

  const own = user.username === blog.user.username

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes
        <button onClick={() => dispatch(likeBlog(blog))}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {own && <button id="delete-button" onClick={handleRemove}>remove</button>}
    </div>
  )
}

export default Blog