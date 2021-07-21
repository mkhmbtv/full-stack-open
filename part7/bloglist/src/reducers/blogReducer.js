import blogService from '../services/blogs'

const byLikes = (a, b) => b.likes - a.likes

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data.sort(byLikes)
  case 'CREATE_BLOG':
    return [...state, action.data]
  case 'LIKE': {
    const liked = action.data
    return state.map(blog => blog.id === liked.id ? liked : blog).sort(byLikes)
  }
  case 'DELETE':
    return state.filter(blog => blog.id !== action.data.id)
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const data = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const data = await blogService.create(blog)
    dispatch({
      type: 'CREATE_BLOG',
      data
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const toLike = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    const data = await blogService.update(toLike)
    dispatch({
      type: 'LIKE',
      data
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE',
      data: {
        id
      }
    })
  }
}

export default reducer