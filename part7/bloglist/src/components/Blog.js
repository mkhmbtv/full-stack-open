import React, { useState } from 'react'

const Blog = ({ blog, updateLikes, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenNotOwn = { display: blog.user.username === user.username ? '' : 'none' }

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
      <div style={showWhenVisible}>
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
        <button style={hideWhenNotOwn} id="delete-button" onClick={() => deleteBlog(blog.id)}>remove</button>
      </div>
    </div>
  )
}

export default Blog