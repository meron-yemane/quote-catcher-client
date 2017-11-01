import React from 'react';
import NavBar from './NavBar';
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";
import SearchArea from './SearchArea';
import SearchResults from './SearchResults';
import './Quotes.css';

export class Quotes extends React.Component {
  render() {
    if (!this.props.loggedIn) {
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
  loggedIn: state.quoteCatcherReducer.currentUser !== null
});

export default connect(mapStateToProps)(Quotes);