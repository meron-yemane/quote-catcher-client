import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import RegistrationForm from './RegistrationForm';
import './RegistrationPage.css';

export function RegistrationPage(props) {
  if (props.loggedIn) {
    return <Redirect to="/addQuote" />;
  }
  return (
    <div className="home">
      <h2 className="headerSignUp">QuoteCatcher</h2>
      <h3 className="logoDescriptionSignUpPage">life's quotes, captured and organized conveniently</h3>
      <div className="signUpSection">
        <h2 className="signUpTitle">Register</h2>
        <div className="signUpBox">
          <RegistrationForm />
          <Link to="/login" className="registrationFormLoginLink">Login</Link>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.quoteCatcherReducer.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);