import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (!notification) {
    return null
  }

  const variant = notification.type === 'success' ? 'success' : 'danger'

  return (
    <div>
      <Alert variant={variant}>
        {notification.message}
      </Alert>
    </div>
  )
}

export default Notification