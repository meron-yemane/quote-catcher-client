import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {registerUser, login} from '../actions/index';
import Input from './input';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';
import './RegistrationForm.css';

export class RegistrationForm extends React.Component {
  onSubmit(values) {
    const {username, password, firstName, lastName} = values;
    const user = {username, password, firstName, lastName};
    return this.props
      .dispatch(registerUser(user))
      .then(() => {
        this.props.dispatch(login(username, password))
      });
  };

  render() {
    return (
      <form 
        className="signUpForm"
        onSubmit={this.props.handleSubmit(values => 
          this.onSubmit(values)
        )}>
        <Field
          className="signUpInputs"
          component={Input}
          type= "text"
          name="firstName"
          validate={[required, nonEmpty]}
        />
        <Field 
          component={Input}
          type="text"
          name="lastName"
          validate={[required, nonEmpty]}
        />
        <Field 
          component={Input}
          type="text"
          name="username"
          validate={[required, nonEmpty, isTrimmed]}
        />
        <Field
          component={Input}
          type="password"
          name="password"
          validate={[required, nonEmpty, length({min: 8, max: 72}), isTrimmed]}
        />
        <Field 
          component={Input}
          type="password"
          name="passwordConfirm"
          validate={[required, nonEmpty, matches('password')]}
        />
        <button 
          className="signUpFormButton"
          type="submit"
          disabled={this.props.pristine || this.props.submitting}>
          SignUp
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
