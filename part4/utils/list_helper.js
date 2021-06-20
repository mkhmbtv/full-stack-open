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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}