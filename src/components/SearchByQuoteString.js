import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';
import Input from './input';
import InputQuoteSearch from './InputForAddQuoteAndSearch';
import {API_BASE_URL} from '../config';
import SearchResults from './SearchResults';
import {addQuoteToSearchResults} from '../actions/index';
import './SearchByQuoteString.css';

export class SearchByQuoteString extends React.Component {
  addQuoteToSearchResults(quotes) {
    this.props.dispatch(addQuoteToSearchResults(quotes))
  }

  onSubmit(values) {
    return fetch(`${API_BASE_URL}/api/quotes/searchbyquotestring`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          if (
            res.headers.has('content-type') &&
            res.headers
              .get('content-type')
              .startsWith('application/json')
          ) {
            return res.json().then(err => Promise.reject(err));
          }
          return Promise.reject({
            code: res.status,
            message: res.statusText
          });
        }
        return res;
      })
      .then(response => {
        return response.json()
      })
      .then(responses => {
        return responses
      })
      .then(res => {
        return this.addQuoteToSearchResults(res)
      })
      .then(() => console.log('Submitted with values', values)) 
      .catch(err => {
        const {reason, message, location} = err;
        if (reason === 'ValidationError') {
          return Promise.reject(
            new SubmissionError({
              [location]: message
            })
          );
        }
      })
  }

  render() {
    let successMessage;
    if (this.props.submitSucceeded) {
      successMessage = (
        <div className="searchByQuoteStringSuccessMessage">
          Quotes successfully returned.
        </div>
      );
    }

    let errorMessage;
    if (this.props.error) {
      errorMessage = (
        <div className='searchByQuoteStringAuthorErrorMessage'>{this.props.error}</div>
      );
    }

    return (
      <form 
        className="quoteStringForm"
        onChange={this.props.handleSubmit(values => 
          this.onSubmit(values)
      )}>
      {successMessage}
      {errorMessage}
        <label className="quoteStringLabel">Search Quote Passage</label>
        <Field 
          name="quoteString"
          type="text area"
          component={InputQuoteSearch}
        />
      </form>
    )     
  }  
}

const mapStateToProps = state => ({
  quotesToDisplay: state.quotesToDisplay
});

const SearchByQuoteStringConnect = connect(mapStateToProps)(SearchByQuoteString);

export default reduxForm({
  form: 'searchByQuoteString',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('searchByQuoteString', Object.keys(errors)[0]))
})(SearchByQuoteStringConnect);


