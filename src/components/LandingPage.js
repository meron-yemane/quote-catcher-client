import React from 'react';
import {connect} from 'react-redux';

import NavBar from './NavBar';
import WelcomeMessage from './WelcomeMessage';
import LoginForm from './LoginForm';

export class LandingPage extends React.Component {
  render() {
    if (this.props.showLandingPage) {
      return (
        <div>
          <NavBar />
          <WelcomeMessage />
          <LoginForm />
        </div> 
      );
    } else {
      return (
        <div>
          <NavBar />
        </div> 
      );
    }
  }
}

const mapStateToProps = state => ({
  showLandingPage: state.showLandingPage
});

export default connect(mapStateToProps)(LandingPage);