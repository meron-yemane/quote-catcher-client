import React from 'react';
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';
import Input from './input';
import {API_BASE_URL} from '../config';
import './SearchByTheme.css';

export class SearchByTheme extends React.Component {
  onSubmit(values) {
    return fetch(`${API_BASE_URL}/api/quotes/searchbytheme`, {
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
        <div className="searchByThemeSuccessMessage">
          Quotes successfully sorted by theme.
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
          name="theme"
          type="string"
          component={Input}
          label="Theme"
        />
      </form>
    ) 
  }
}

export default reduxForm({
  form: 'searchByTheme',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('searchByTheme', Object.keys(errors)[0]))
})(SearchByTheme);







