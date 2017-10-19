import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Quotes from './Quotes';
import AddQuote from './AddQuote';
import HomePageQuotesDisplay from './HomePageQuotesDisplay';
import RegistrationPage from './RegistrationPage';
import LoginPage from './LoginPage';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={HomePageQuotesDisplay} />
          <Route exact path='/quotes' component={Quotes} />
          <Route exact path='/addquote' component={AddQuote} />
          <Route exact path='/register' component={RegistrationPage} />
          <Route exact path='/login' component={LoginPage} />
        </div>
      </Router>
    );
  }
}

export default App;
