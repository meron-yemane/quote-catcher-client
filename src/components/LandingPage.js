import React from 'react';
import {connect} from 'react-redux';

import NavBar from './NavBar';
import WelcomeMessage from './WelcomeMessage';
import LoginForm from './LoginForm';
import {addQuotesToLandingPage} from '../actions/index';
import {API_BASE_URL} from '../config';
import HomePageQuotesDisplay from './HomePageQuotesDisplay';

export class LandingPage extends React.Component {
  addQuotesToLandingPage(quotes) {
    this.props.dispatch(addQuotesToLandingPage(quotes))
  }

  handleLoad() {
    console.log("Inside handleload")
    return fetch(`${API_BASE_URL}/api/quotes/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    })
    .then(res => {
      if (!res.ok) {
        if (
          res.headers.has('content-type') &&
          res.headers
            .get('content-type')
            .startsWith('application/json')
        ) {
          return res.json().then(err => Promise.reject(err));
        }
        return Promise.reject({
          code: res.status,
          message: res.statusText
        });
      }
      return res
    })
    .then(response => {
      return response.json()
    })
    .then(responses => {
      return responses
    })
    .then(res => {
      return this.addQuotesToLandingPage(res)
    })
  }

  render() {
    var landingPage;
    if (!this.props.showLandingPage) {
      landingPage = <LoginForm />;
    } else {
      landingPage = <HomePageQuotesDisplay onpageshow={() => this.handleLoad()} />;
    }
    return (
      <div>
        <NavBar />
        {landingPage}
      </div> 
    );
  }
}


const mapStateToProps = state => ({
  showLandingPage: state.quoteCatcherReducer.showLandingPage,
});

export default connect(mapStateToProps)(LandingPage);