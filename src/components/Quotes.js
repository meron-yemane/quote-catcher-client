import React from 'react';
import NavBar from './NavBar';
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";
import SearchArea from './SearchArea';
import SearchResults from './SearchResults';
import {loadAuthToken} from '../local-storage';

import './Quotes.css';

export class Quotes extends React.Component {
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
        <h1 className="searchAreaHeader">Search Quotes</h1>
        <SearchArea themes={["Relationships", "Finances", "Me", "Dating", "Fear", "Career", "Perseverance"]} />
        <SearchResults />
      </div>
    );
  }
}

const mapStateToProps = state => ({ 
  loggedIn: state.quoteCatcherReducer.authToken
});

export default connect(mapStateToProps)(Quotes);