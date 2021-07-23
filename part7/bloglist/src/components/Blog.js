import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog, commentBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useHistory } from 'react-router-dom'
import { Card, ListGroup, Form, Button } from 'react-bootstrap'

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
      <Card>
        <Card.Body>
          <Card.Title as="h3">{blog.title} {blog.author}</Card.Title>
          <Card.Link href={blog.url}>{blog.url}</Card.Link>
          <Card.Text>
            <div>
              {blog.likes} likes
              <Button variant="outline-primary" onClick={() => dispatch(likeBlog(blog))}>like</Button>
            </div>
            <div>added by {blog.user.name}</div>
            {own && <Button variant="outline-primary" id="delete-button" onClick={handleRemove}>remove</Button>}
          </Card.Text>
        </Card.Body>
      </Card>

      <h3>comments</h3>
      <Form onSubmit={addComment(blog.id)} style={{ width: '18rem' }}>
        <Form.Group>
          <Form.Control
            type="text" name="comment"
          />
        </Form.Group>
        <Button variant="primary" type="submit">add comment</Button>
      </Form>
      <Card style={{ width: '18rem' }}>
        <ListGroup variant="flush">
          {blog.comments.map((comment, idx) =>
            <ListGroup.Item key={idx}>{comment}</ListGroup.Item>
          )}
        </ListGroup>
      </Card>
    </div>
  )
}

export default Blog