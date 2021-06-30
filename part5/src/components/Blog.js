import React, { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const updateLikes = (event) => {
    event.preventDefault()
    updateBlog(blog.id, {
      ...blog,
      likes: blog.likes + 1
    })
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>hide</button>
        </div>  
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes}
          <button onClick={updateLikes}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
      </div>
    </div>
  )
}

export default Blog