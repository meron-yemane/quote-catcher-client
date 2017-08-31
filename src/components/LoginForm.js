import React from 'react';
import './LoginForm.css';

export default class LoginForm extends React.Component {
  render() {
    return (
      <div className="loginForm">
        <h3>Login</h3>
        <form>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" placeholder="Username"/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="text" name="password" placeholder="Password"/>
          </div>
          <div className="forms form-button">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    );
  }
}