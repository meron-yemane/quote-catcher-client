import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';
import LandingPage from './LandingPage';
import Quotes from './Quotes';
import AddQuote from './AddQuote';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/quotes' component={Quotes} />
          <Route exact path='/addquote' component={AddQuote} />
        </div>
      </Router>
    );
  }
}

export default App;
