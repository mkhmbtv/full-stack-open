const { ApolloServer, gql } = require('apollo-server')
require('dotenv').config()
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch ((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
    Query: {
      bookCount: () => Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
      allBooks: (root, args) => {
        if (!args.genre) {
          return Book.find({}).populate('author')
        }
        return Book.find({ genres: { $in: [args.genre] } }).populate('author')
      },
      allAuthors: (root, args) => {
        return Author.find({})
      }
    },
    Author: {
      bookCount: (root) => {
        return Book.countDocuments({ author: root._id })
      }
    },
    Mutation: {
      addBook: async (root, args) => {
        let existingAuthor = await Author.findOne({ name: args.author })
        
        if (!existingAuthor) {
          const author = new Author({ name: args.author })
          existingAuthor = await author.save()
        }

        const book = new Book({ ...args, author: existingAuthor })
        return book.save()   
      },
      editAuthor: async (root, args) => {
        const author = await Author.findOne({ name: args.name })
        author.born = args.setBornTo
        return author.save()
      }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
