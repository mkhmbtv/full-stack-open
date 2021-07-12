import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    return state.filter.length === 0 ?
      state.anecdotes :
      state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
  })

  const byVotes = (b1, b2) => b2.votes - b1.votes

  return (
    <div>
      {anecdotes.sort(byVotes).map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(voteFor(anecdote))
            dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
          }}
        />
      )}
    </div>
  )
}

export default AnecdoteList