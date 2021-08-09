import React, { useEffect, useState } from 'react'
import { ALL_AUTHORS } from '../queries'
import { useQuery } from '@apollo/client'
import NewBirthYear from './NewBirthYear'

const Authors = ({ show, setError }) => {
  const [authors, setAuthors] = useState([])
  const result = useQuery(ALL_AUTHORS, {
    skip: !show,
    fetchPolicy: "network-only"
  })

  useEffect(() => {
    if (result.data) {
      setAuthors(result.data.allAuthors)
    }
  }, [result])
  
  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }
 
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <NewBirthYear 
        authors={authors}
        setError={setError} 
      />
    </div>
  )
}

export default Authors
