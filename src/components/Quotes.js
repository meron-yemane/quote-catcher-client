import React from 'react';
import NavBar from './NavBar';
import SearchArea from './SearchArea';
import SearchResults from './SearchResults';
import './Quotes.css';

export default class Quotes extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <h1>Search Quotes</h1>
        <SearchArea themes={["Relationships", "Finances", "Me", "Dating", "Fear", "Career", "Perseverance"]} />
        <SearchResults />
      </div>
    );
  }
}