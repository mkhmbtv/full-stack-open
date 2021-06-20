const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum += blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  let favorite = null

  blogs.forEach(blog => {
    if (favorite === null || blog.likes > favorite.likes) {
      favorite = blog
    }
  })

  return favorite
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const res =
    _(blogs)
      .countBy('author')
      .map((numBlogs, author) => ({ author, blogs: numBlogs }))
      .maxBy('blogs')

  return res
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const res =
    _(blogs)
      .groupBy('author')
      .map((authorList, author) => ({ author, likes: _.sumBy(authorList, 'likes') }))
      .maxBy('likes')

  return res
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}