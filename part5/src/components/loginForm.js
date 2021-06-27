import React from 'react'

const LoginForm = ({ handleLogin, username, password, handleUsernameChange, handlePasswordChange}) => (
  <div>
    <h2>log in to application</h2>
    <form onSubmit={handleLogin}>
        <div>
        username
        <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => handleUsernameChange(target.value)}
        />
        </div>
        <div>
        password
        <input
            type="password"
            value={password}
            name="Username"
            onChange={({ target }) => handlePasswordChange(target.value)}
        />
        </div>
        <button type="submit">login</button>
    </form>
  </div>
)

export default LoginForm