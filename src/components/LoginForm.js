import React from 'react';
import './LoginForm.css';

export default class LoginForm extends React.Component {
  render() {
    return (
      <div className="loginSection">
        <h3 className="loginFormHeader">Login</h3>
        <form className="loginForm">
          <div className="loginFormInputs">
            <label htmlFor="username">Username </label>
            <input type="text" name="username" placeholder="Username"/>
          </div>
          <div className="loginFormInputs">
            <label htmlFor="password">Password </label>
            <input type="text" name="password" placeholder="Password"/>
          </div>
          <div className="forms form-button">
            <button className="loginFormButton" type="submit">Login</button>
          </div>
        </form>
      </div>
    );
  }
}