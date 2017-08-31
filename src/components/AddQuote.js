import React from 'react';
import NavBar from './NavBar';
import './AddQuote.css';

export default class AddQuote extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <h1>Add Quotes Page</h1>
      </div>
    );
  }
}