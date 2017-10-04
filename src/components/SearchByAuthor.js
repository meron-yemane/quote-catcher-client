import React from 'react';
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';
import Input from './input';
import {API_BASE_URL} from '../config';
import SearchResults from './SearchResults';
import './SearchByAuthor.css';

export class SearchByAuthor extends React.Component {
  onSubmit(values) {
    return fetch(`${API_BASE_URL}/api/quotes/searchbyauthor`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
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
        //response.json()
      })
      .then(responses => {
        return responses
      })
      .then(res => {
        return <SearchResults quotes={res} />
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
        <div className='searchByAuthorSuccessMessage'>
          Quotes successfully sorted by author.
        </div>
      );
    }

    let errorMessage;
    if (this.props.error) {
      errorMessage = (
        <div className='searchByAuthorErrorMessage'>{this.props.error}</div>
      );
    } 

    return (
      <form 
        onSubmit={this.props.handleSubmit(values => 
          this.onSubmit(values)
      )}>
      {successMessage}
      {errorMessage}
        <Field
          name="author"
          type="string"
          component={Input}
          label="Author"
        />
      </form>
    )
  }
}

export default reduxForm({
  form: 'searchByAuthor',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('searchByAuthor', Object.keys(errors)[0]))
})(SearchByAuthor);







