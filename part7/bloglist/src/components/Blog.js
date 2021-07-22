import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog, commentBlog } from '../reducers/blogReducer'
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

  const addComment = (id) => (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    dispatch(commentBlog(id, comment))
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
      <h3>comments</h3>
      <form onSubmit={addComment(blog.id)}>
        <input type="text" name="comment" />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, idx) =>
          <li key={idx}>{comment}</li>
        )}
      </ul>
    </div>
  )
}

export default Blog