import React, { useRef } from 'react'
import Togglable from './Togglable'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

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
        <Form onSubmit={createNewBlog} style={{ width: '18rem' }}>
          <Form.Group>
            <Form.Label>title</Form.Label>
            <Form.Control
              type="text"
              name="title"
            />
            <Form.Label>author</Form.Label>
            <Form.Control
              type="text"
              name="author"
            />
            <Form.Label>url</Form.Label>
            <Form.Control
              type="text"
              name="url"
            />
            <Button id="create-button" type="submit" variant="outline-primary">
              create
            </Button>
          </Form.Group>
        </Form>
      </div>
    </Togglable>
  )
}

export default BlogForm