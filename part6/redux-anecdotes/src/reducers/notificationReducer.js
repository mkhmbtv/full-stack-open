const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'REMOVE_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export const showNotification = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification
  }
}

export const hideNotification = () => {
  return { 
    type: 'REMOVE_NOTIFICATION',
    notification: null
  }
}

export default notificationReducer