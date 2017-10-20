import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";
import NavBar from './NavBar';
import AddQuoteForm from './AddQuoteForm';
import './AddQuote.css';


export class AddQuote extends React.Component {
  render() {
    if (!this.props.loggedIn) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <NavBar />
        <h1 className="addQuotesHeader">Add Quote</h1>
        <AddQuoteForm themes={["Relationships", "Finances", "Identity", "Fear", "Career", "Motivation", "Adventure", "Spirituality", "Loss", "Failure", "Happiness", "Discipline"]} />
      </div>
    );
  }
}

const mapStateToProps = state => ({ 
  loggedIn: state.quoteCatcherReducer.currentUser !== null
});

export default connect(mapStateToProps)(AddQuote);