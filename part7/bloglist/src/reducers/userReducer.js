import storage from '../utils/storage'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const user = storage.loadUser()
const initialState = user
  ? user
  : null

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LOGIN_SUCCESS':
    return action.data
  case 'LOGIN_FAIL':
    return null
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const loginUser = (credentials) => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      dispatch({
        type: 'LOGIN_SUCCESS',
        data: user
      })
      dispatch(setNotification(`${user.name} welcome back!`, 5))
      storage.saveUser(user)
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAIL'
      })
      dispatch(setNotification('wrong username/password', 5, 'error'))
    }
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch({
      type: 'LOGOUT'
    })
    storage.logoutUser()
  }
}

export default reducer