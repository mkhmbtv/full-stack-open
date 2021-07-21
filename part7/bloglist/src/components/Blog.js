import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateLikes, deleteBlog, own }) => {
  const [visible, setVisible] = useState(false)

  const buttonLabel = visible ? 'hide' : 'view'

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className="blog">
      <div className="defaultBlog">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      {visible && (
        <div>
          <div>
            {blog.url}
          </div>
          <div>
            likes {blog.likes}
            <button onClick={() => updateLikes(blog.id)}>like</button>
          </div>
          <div>
            {blog.user.name}
          </div>
          {own && <button id="delete-button" onClick={() => deleteBlog(blog.id)}>remove</button>}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  updateLikes: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  own: PropTypes.bool.isRequired
}

export default Blog