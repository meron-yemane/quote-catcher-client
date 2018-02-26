import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, SubmissionError, focus, reset} from 'redux-form';
import InputQuoteSearch from './InputForSearch';
import {API_BASE_URL} from '../config';
import {addQuoteToSearchResults} from '../actions/index';
import './SearchByAuthor.css';

export class SearchByAuthor extends React.Component {
  addQuoteToSearchResults(quotes) {
    this.props.dispatch(addQuoteToSearchResults(quotes))
  }

  onSubmit(values) {
    return fetch(`${API_BASE_URL}/api/quotes/searchbyauthor`, {
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
        return res
      })
      .then(response => {
        return response.json()
      })
      .then(responses => {
        return responses
      })
      .then(res => {
        if (res.length === 0) {
          return this.addQuoteToSearchResults("No results found")
        } else {
          return this.addQuoteToSearchResults(res)
        }
      })
      .then(() => console.log('Submitted with values', values))     
      .then(() => {
        this.props.dispatch(reset('searchByAuthor'))
      })
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
    return (
      <form 
        className="searchAuthorForm"
        onSubmit={this.props.handleSubmit(values => 
          this.onSubmit(values)
      )}>
        <button 
          className="submitAuthorButton" 
          type="submit"
          disabled={this.props.pristine || this.props.submitting}>
          Search Author
        </button>
        <Field
          name="author"
          type="string"
          component={InputQuoteSearch}
        />
      </form>
    )
  }
}

const mapStateToProps = state => ({
  quotesToDisplay: state.quotesToDisplay
});

const SearchByAuthorConnect = connect(mapStateToProps)(SearchByAuthor);

export default reduxForm({
  form: 'searchByAuthor',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('searchByAuthor', Object.keys(errors)[0]))
})(SearchByAuthorConnect);







