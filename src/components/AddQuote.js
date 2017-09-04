import React from 'react';
import NavBar from './NavBar';
import './AddQuote.css';
import AddQuoteForm from './AddQuoteForm';

export default class AddQuote extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <h1 className="addQuotesHeader">Add Quote</h1>
        <AddQuoteForm themes={["Relationships", "Finances", "Me", "Dating", "Fear", "Career", "Perseverance"]} />
      </div>
    );
  }
}