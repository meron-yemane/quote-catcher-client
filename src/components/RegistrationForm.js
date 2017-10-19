import React from 'react';
import {Field, reduxForm, focus, SubmissionError} from 'redux-form';
import {registerUser, login} from '../actions/index';
import Input from './input';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';

export class RegistrationForm extends React.Component {
  onSubmit(values) {
    console.log(values);
    const {username, password, firstName, lastName} = values;
    const user = {username, password, firstName, lastName};
    console.log(user)
    console.log(this.props.dispatch)
    console.log(username)
    console.log(password)
    return this.props
      .dispatch(registerUser(user))
      .then(() => {
        console.log("inside login portion")
        this.props.dispatch(login(username, password))
      });
  };

  render() {
    return (
      <form 
        className="login-form"
        onSubmit={this.props.handleSubmit(values => 
          this.onSubmit(values)
        )}>
        <label htmlFor="firstName">First name</label>
        <Field
          component={Input}
          type= "text"
          name="firstName"
        />
        <label htmlFor="lastName">Last name</label>
        <Field 
          component={Input}
          type="text"
          name="lastName"
        />
        <label htmlFor="username">Username</label>
        <Field 
          component={Input}
          type="text"
          name="username"
          validate={[required, nonEmpty, isTrimmed]}
        />
        <label htmlFor="password">Password</label>
        <Field
          component={Input}
          type="password"
          name="password"
          validate={[required, length({min: 8, max: 72}), isTrimmed]}
        />
        <label htmlFor="passwordConfirm">Confirm password</label>
        <Field 
          component={Input}
          type="password"
          name="passwordConfirm"
          validate={[required, nonEmpty, matches('password')]}
        />
        <button 
          type="submit"
          disabled={this.props.pristine || this.props.submitting}>
          Register
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'registration',
  onSubmitFail: (errors, dispatch) => {
    console.log(errors)
    dispatch(focus('registration', Object.keys(errors)[0]))
  }
})(RegistrationForm);
