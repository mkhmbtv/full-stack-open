import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = ({ show }) => {
  const result = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState('')

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const allBooks = result.data.allBooks
  const byGenre = allBooks.filter(b => b.genres.includes(genre))
  const books = genre ? byGenre : allBooks

  const genres = allBooks.map(b => b.genres).flat()
  const unique = (arr) => [ ...new Set(arr) ]

  return (
    <div>
      <h2>books</h2>
      {genre && <p>in genre <strong>{genre}</strong></p>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {unique(genres).map(genre =>
        <button key={genre} onClick={() => setGenre(genre)}>
          {genre}
        </button>
      )}
      <button onClick={() => setGenre('')}>all books</button>
    </div>
  )
}

export default Books