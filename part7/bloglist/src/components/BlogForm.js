import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Togglable from './Togglable'

const BlogForm = () => {
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  const createNewBlog = async (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value
    event.target.author.value = ''
    event.target.title.value = ''
    event.target.url.value = ''
    dispatch(createBlog({ title, author, url }))
    blogFormRef.current.toggleVisibility()
    dispatch(setNotification(`new blog ${title} by ${author} created`, 5))
  }

  return (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <div className="formDiv">
        <h2>create new</h2>
        <form onSubmit={createNewBlog}>
          <div>
            title
            <input
              type="text"
              name="title"
            />
          </div>
          <div>
            author
            <input
              type="text"
              name="author"
            />
          </div>
          <div>
            url
            <input
              type="text"
              name="url"
            />
          </div>
          <button id="create-button" type="submit">create</button>
        </form>
      </div>
    </Togglable>
  )
}

export default BlogForm