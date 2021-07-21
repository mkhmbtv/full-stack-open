import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Blog from './Blog'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const updateLikes = (id) => {
    const toUpdate = blogs.find(b => b.id === id)
    dispatch(likeBlog(toUpdate))
  }

  const deleteBlog = (id) => {
    const toDelete = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${toDelete.title} by ${toDelete.author}?`)
    if (ok) {
      dispatch(removeBlog(id))
      dispatch(setNotification(`Deleted ${toDelete.title} by ${toDelete.author}`, 5))
    }
  }
  return (
    <div>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateLikes={updateLikes}
          deleteBlog={deleteBlog}
          own={blog.user.username === user.username}
        />
      )}
    </div>
  )
}

export default BlogList