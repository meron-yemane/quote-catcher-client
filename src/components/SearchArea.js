import React from 'react';
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';
import Input from './input';
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";
import {required, nonEmpty} from '../validators';
import {API_BASE_URL} from '../config';
import SearchByAuthor from './SearchByAuthor';
import SearchByTheme from './SearchByTheme';
import SearchByQuoteString from './SearchByQuoteString';
import {loadAuthToken} from '../local-storage';
import './SearchArea.css';

export class SearchArea extends React.Component {
  onSubmit(values) {
    return fetch(`${API_BASE_URL}/api/quotes/`)
  }
  render () {
    if (!loadAuthToken()) {
      return <Redirect to="/login" />;
    }
    const themeList = this.props.themes.map((theme, index) => 
      <option key={index} value={theme}>{theme}</option>
    );
    return (
      <div className="searchAreaBox">
        <SearchByAuthor />
        <SearchByQuoteString />
        <SearchByTheme />
      </div>
    );
  }
}

const mapStateToProps = state => ({ 
  loggedIn: state.quoteCatcherReducer.currentUser !== null
});

export default connect(mapStateToProps)(SearchArea);