import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';
import {required, nonEmpty} from '../validators';
import Input from './input';
import {displayLandingPage} from '../actions/index';
import './LoginForm.css';
import {API_BASE_URL} from '../config';

export class LoginForm extends React.Component {
  displayLandingPage(showLandingPage) {
    this.props.dispatch(displayLandingPage(showLandingPage));
  }

  onSubmit(values) {
    return fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Authorization': 'Basic ' + btoa(values.username + ':' + values.password),
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      this.displayLandingPage(!this.props.showLandingPage);
      console.log(this.props.showLandingPage);
      if (!res.ok) {
        if (
          res.headers.has('content-type') &&
          res.headers
            .get('content-type')
            .startsWith('application/json')
        ) {
          return res.json().then(err => Promise.reject(err));
        }
        return Promise.reject({
          code: res.status,
          message: res.statusText
        });
      }

      return res
    })
    .then(response => response.json())
    .then(responses => {
      localStorage.setItem('access_token', responses.authToken);
      return
    })
    .then(() => console.log('Submitted with values', values))
    .catch(err => {
      const {reason, message, location} = err;
      if (reason === 'ValidationError') {
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
      return Promise.reject(
        new SubmissionError({
          _error: 'Error submitting message'
        })
      );
    });
  }
  render() {
    return (
      <div className="loginSection">
        <h3 className="loginFormHeader">Login</h3>
        <form className="loginForm" onSubmit={this.props.handleSubmit(values => 
            this.onSubmit(values)
        )}>
          <div className="loginFormInputs">
            <label htmlFor="username">Username </label>
            <Field 
              type="text" 
              name="username" 
              placeholder="Username" 
              component={Input}
              validate={[required, nonEmpty]} 
            />
          </div>
          <div className="loginFormInputs">
            <label htmlFor="password">Password </label>
            <Field 
              type="password" 
              name="password" 
              placeholder="Password" 
              component={Input} 
              validate={[required, nonEmpty]}
              />
          </div>
          <div className="forms form-button">
            <button 
              className="loginFormButton" 
              type="submit"
              disabled={this.props.pristine || this.props.submitting}>
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  showLandingPage: state.quoteCatcherReducer.showLandingPage
});

const LoginFormConnect = connect(mapStateToProps)(LoginForm);

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => 
    dispatch(focus('login', Object.keys(errors)[0]))
})(LoginFormConnect);






