import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import RegistrationForm from './RegistrationForm';

export function RegistrationPage(props) {
  if (props.loggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <div className="home">
      <h2>Register for QuoteCatcher</h2>
      <RegistrationForm />
      <Link to="/login">Login</Link>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.quoteCatcherReducer.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);