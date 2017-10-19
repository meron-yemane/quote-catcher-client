import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import './App.css';
import Quotes from './Quotes';
import AddQuote from './AddQuote';
import HomePageQuotesDisplay from './HomePageQuotesDisplay';
import RegistrationPage from './RegistrationPage';
import LoginPage from './LoginPage';
import {refreshAuthToken} from '../actions/index';

export class App extends React.Component {
  componentDidMount() {
    if (this.props.hasAuthToken) {
      //get new auth token if had existing one in localStorage
      this.props.dispatch(refreshAuthToken());
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn && !this.props.loggedIn) {
      // When we log in, refresh auth token periodically
      this.startPeriodicRefresh();
    } else if (!nextProps.loggedIn && this.props.loggedIn) {
      // Stop refreshing auth token when we log out. why do we need the first argument
      this.stopPeriodicRefresh();
    }
  }

  // function to stop refresh if app is unloaded
  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      60 * 60 * 1000 //comes out to 1 hour
    );
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return;
    }

    clearInterval(this.refreshInterval);
  }

  render() {
    return (
      <div>
        <Route exact path='/' component={HomePageQuotesDisplay} />
        <Route exact path='/quotes' component={Quotes} />
        <Route exact path='/addquote' component={AddQuote} />
        <Route exact path='/register' component={RegistrationPage} />
        <Route exact path='/login' component={LoginPage} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.quoteCatcherReducer.authToken !== null,
  loggedIn: state.quoteCatcherReducer.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(App));
