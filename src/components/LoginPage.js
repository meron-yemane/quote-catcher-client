import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from "react-router-dom"
import NavBar from './NavBar';
import WelcomeMessage from './WelcomeMessage';
import LoginForm from './LoginForm';
import {addQuotesToLandingPage} from '../actions/index';
import {API_BASE_URL} from '../config';
import HomePageQuotesDisplay from './HomePageQuotesDisplay';

export function LandingPage(props) {
  if (props.logginIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="home">
      <h2>Welcome to QuoteCatcher!</h2>
      <LoginForm />
      <Link to="/register">Register</Link>
    </div>
  );
}

const mapStateToProps = state => ({
  logginIn: state.quoteCatcherReducer.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);