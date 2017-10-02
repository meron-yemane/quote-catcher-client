import React from 'react';
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';
import Input from './input';
import {API_BASE_URL} from '../config';
import './SearchByQuoteString.css';

export class SearchByQuoteString extends React.Component {
  onSubmit(values) {
    return fetch(`${API_BASE_URL}/api/quotes/searchbyquotestring`, {
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
        return;
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
        onChange={this.props.handleSubmit(values => 
          this.onSubmit(values)
      )}>
      {successMessage}
      {errorMessage}
        <Field 
          name="quoteString"
          type="text area"
          component={Input}
          label="Quote Content"
        />
      </form>
    )     
  }  
}

export default reduxForm({
  form: 'searchByQuoteString',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('searchByQuoteString', Object.keys(errors)[0]))
})(SearchByQuoteString);


