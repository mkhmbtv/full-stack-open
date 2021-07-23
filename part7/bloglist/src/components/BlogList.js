import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, ListGroup } from 'react-bootstrap'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <Card style={{ marginTop: '1rem' }}>
      <ListGroup>
        {blogs.map(blog =>
          <ListGroup.Item key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
          </ListGroup.Item>
        )}
      </ListGroup>
    </Card>
  )
}

export default BlogList