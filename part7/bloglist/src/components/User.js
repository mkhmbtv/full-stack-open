import React from 'react'
import { ListGroup, Card } from 'react-bootstrap'

const User = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <Card>
        <Card.Header as="h4">added blogs</Card.Header>
        <ListGroup variant="flush">
          {user.blogs.map(blog =>
            <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
          )}
        </ListGroup>
      </Card>
    </div>
  )
}

export default User