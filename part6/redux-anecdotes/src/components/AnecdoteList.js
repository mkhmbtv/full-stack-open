import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

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
  const anecdotes = useSelector(state => state.anecdotes)
  const filterString = useSelector(state => state.filter)

  const byVotes = (b1, b2) => b2.votes - b1.votes

  const anecdotesToShow = filterString.length === 0 ?
    anecdotes :
    anecdotes.filter(a => a.content.toLowerCase().includes(filterString.toLowerCase()))

  return (
    <div>
      {anecdotesToShow.sort(byVotes).map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(voteFor(anecdote.id))
            dispatch(showNotification(`you voted '${anecdote.content}'`))
            setTimeout(() => {
              dispatch(hideNotification())
            }, 5000)
          }}
        />
      )}
    </div>
  )
}

export default AnecdoteList