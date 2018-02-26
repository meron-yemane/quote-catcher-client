import React from 'react';
import {reduxForm, Field, focus} from 'redux-form';
import {required, nonEmpty} from '../validators';
import Input from './input';
import './LoginForm.css';
import {loginUserAndUpdateQuotesStore} from '../actions/index';
import 'bootstrap/dist/css/bootstrap.css';

export class LoginForm extends React.Component {
  onSubmit(values) {
    return this.props
    .dispatch(loginUserAndUpdateQuotesStore(values))
  };

  render() {
    let error;
    if (this.props.error) {
      if (this.props.error === "Incorrect username or password") {
        error = (
          <div className="form-error-incorrect-credentials" aria-live="polite">
            {this.props.error}
          </div>
        )
      } else {
        error = (
            <div className="form-error" aria-live="polite">
              {this.props.error}
            </div>
        );
      }
    }
    return (
      <div className="loginSection">
        <form 
            className="loginForm" onSubmit={this.props.handleSubmit(values => 
            this.onSubmit(values)
            )}>
            {error}
            <Field
              id="loginFormInput" 
              type="text" 
              name="username" 
              component={Input}
              validate={[required, nonEmpty]} 
              autocomplete="off"
            />
            <Field 
              type="password"
              name="password" 
              component={Input} 
              validate={[required, nonEmpty]}
              autocomplete="off"
            />
            <button 
              className="loginFormButton" 
              type="submit"
              disabled={this.props.pristine || this.props.submitting}>
              Submit
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






