import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      const voted = action.data
      return state.map(anecdote =>
        anecdote.id !== voted.id ? anecdote : voted
      )
    default:
      return state
  }
}

export const createAncedote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const voteFor = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export default reducer