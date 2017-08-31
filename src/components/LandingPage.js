import React from 'react';

import NavBar from './NavBar';
import WelcomeMessage from './WelcomeMessage';
import LoginForm from './LoginForm';

export default class LandingPage extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <WelcomeMessage />
        <LoginForm />
      </div> 
    );
  }
}