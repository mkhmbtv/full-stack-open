import React from 'react'

const BlogForm = (props) => (
  <div>
    <h2>create new</h2>
    <form onSubmit={props.addBlog}>
      <div>
        <label htmlFor="title">title:</label>
        <input
          type="text"
          value={props.title}
          id="title"
          onChange={({ target }) => props.handleTitleChange(target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">author:</label>
        <input
          type="text"
          value={props.author}
          id="author"
          onChange={({ target }) => props.handleAuthorChange(target.value)}
        />
      </div>
      <div>
        <label htmlFor="url">url:</label>
        <input
          type="text"
          value={props.url}
          id="url"
          onChange={({ target }) => props.handleUrlChange(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  </div>   
)

export default BlogForm