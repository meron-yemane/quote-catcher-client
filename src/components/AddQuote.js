import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";
import NavBar from './NavBar';
import AddQuoteForm from './AddQuoteForm';
import AddQuoteDisplay from './AddQuoteDisplay';
import {loadAuthToken} from '../local-storage';

import './AddQuote.css';

export class AddQuote extends React.Component {
  componentDidMount() {
    const authToken = loadAuthToken();
    if (authToken) {
      this.props.dispatch({
        type: 'SET_AUTH_TOKEN',
        authToken
      })
    } 
  }
  render() {
    if (!loadAuthToken()) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <NavBar />
        <h1 className="addQuotesHeader">Add Quote</h1>
        <AddQuoteForm themes={["Relationships", "Finances", "Identity", "Fear", "Career", "Motivation", "Adventure", "Spirituality", "Loss", "Failure", "Happiness", "Discipline"]} />
        <AddQuoteDisplay />
      </div>
    );
  }
}

const mapStateToProps = state => ({ 
  loggedIn: state.quoteCatcherReducer.authToken
});

export default connect(mapStateToProps)(AddQuote);