const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

const showNotification = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification
  }
}

const clearNotification = () => {
  return { 
    type: 'CLEAR_NOTIFICATION'
  }
}

let timer
export const setNotification = (notification, seconds) => {
  return async dispatch => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
    dispatch(showNotification(notification))
  }
}

export default notificationReducer