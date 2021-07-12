const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'CLEAR_NOTIFICATION':
      return action.notification
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
    type: 'CLEAR_NOTIFICATION',
    notification: null
  }
}

export const setNotification = (notification, seconds) => {
  return dispatch => {
    dispatch(showNotification(notification))
    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}

export default notificationReducer