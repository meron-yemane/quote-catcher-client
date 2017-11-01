import React from 'react';
import {reduxForm, Field, focus} from 'redux-form';
import {required, nonEmpty} from '../validators';
import Input from './input';
import {login} from '../actions/index';
import './LoginForm.css';
import store from '../store';
import {loginUserAndUpdateQuotesStore} from '../actions/index';

export class LoginForm extends React.Component {


  onSubmit(values) {
    return this.props
    .dispatch(loginUserAndUpdateQuotesStore(values))
  };

  render() {
    let error;
    if (this.props.error) {
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.error}
        </div>
      );
    }
    return (
      <div className="loginSection">
        <h3 className="loginFormHeader">Login</h3>
        <form 
            className="loginForm" onSubmit={this.props.handleSubmit(values => 
            this.onSubmit(values)
            )}>
            {error}
            <label htmlFor="username">Username </label>
            <Field 
              type="text" 
              name="username" 
              placeholder="Username" 
              component={Input}
              validate={[required, nonEmpty]} 
            />
            <label htmlFor="password">Password </label>
            <Field 
              type="password" 
              name="password" 
              placeholder="Password" 
              component={Input} 
              validate={[required, nonEmpty]}
              />
            <button 
              className="loginFormButton" 
              type="submit"
              disabled={this.props.pristine || this.props.submitting}>
              Login
            </button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => 
    dispatch(focus('login', Object.keys(errors)[0]))
})(LoginForm);






