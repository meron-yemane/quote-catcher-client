import React from 'react';
import './SearchResults.css';
import IndividualQuotes from './IndividualQuotes';

export default class SearchResults extends React.Component {
  render() {
    return (
     <IndividualQuotes quote={{quoteText: "Please accept my resignation. I don't care to belong to any club that would have me as a member.", theme: "Career", author: "Graucho Marx"}}/>
    );
  }
}