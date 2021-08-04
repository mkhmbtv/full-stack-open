import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { SET_BIRTH_YEAR } from '../queries'
import Select from 'react-select'

const NewBirthYear = ({ authors, setError }) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [born, setBorn] = useState('')

  const options = authors.map(a => {
    return { value: a.name, label: a.name }
  })

  const [ changeBirthYear ] = useMutation(SET_BIRTH_YEAR, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  const submit = (event) => {
    event.preventDefault()
    const name = selectedOption.value
    changeBirthYear({ variables: { name, born } })

    setSelectedOption(null)
    setBorn('')
  }

  console.log()

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <Select
            value={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div>
          born: <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default NewBirthYear