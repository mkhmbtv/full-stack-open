import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { BOOKS_BY_GENRE, ME } from '../queries'

const Recommend = ({ show }) => {
  const [books, setBooks] = useState([])
  
  const { data: me, loading: userLoading } = useQuery(ME, {
    skip: !show,
  })
  
  const [ getBooks, result ] = useLazyQuery(BOOKS_BY_GENRE, {
    fetchPolicy: "network-only"
  })

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result])

  useEffect(() => {
    if (me) {
      getBooks({ variables: { genre: me.me.favoriteGenre }})
    }
  }, [me, getBooks])

  if (!show) {
    return null
  }
  
  if (userLoading || result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{me.me.favoriteGenre}</strong></p>
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
    </div>
  )
}

export default Recommend