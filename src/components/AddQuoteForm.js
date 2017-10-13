import React from 'react';
import {reduxForm, Field, SubmissionError, focus, reset} from 'redux-form';
import Input from './input';
import {required, nonEmpty} from '../validators';
import {API_BASE_URL} from '../config';
import './AddQuoteForm.css';

export class AddQuoteForm extends React.Component {
  onSubmit(values) {
    return fetch(`${API_BASE_URL}/api/quotes/create`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    })
      .then(res => {
        console.log("created successfully")
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
      .then(() => {
        this.props.dispatch(reset('addQuote'))
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
        return Promise.reject(
          new SubmissionError({
            _error: 'Error creating quote'
          })
        );
      });
  }
  render() {
    let successMessage;
    if (this.props.submitSucceeded) {
      successMessage = (
        <div className="adddQuoteMessageSuccess">
          Quote created successfully
        </div>
      );
    }

    let errorMessage;
    if (this.props.error) {
      errorMessage = (
        <div className="addQuoteMessageError">{this.props.error}</div>
      );
    }

    const themeList = this.props.themes.map((theme, index) => 
      <option name="theme" key={index} value={theme}>{theme}</option>
    );
    return (
      <form 
        onSubmit={this.props.handleSubmit(values => 
          this.onSubmit(values)
        )}> 
        {successMessage}
        {errorMessage}
        <Field
          name="quoteString"
          type="textarea"
          component={Input}
          label="Quote"
          validate={[required, nonEmpty]}
        />
        <Field
          name="author"
          type="text"
          component={Input}
          label="Author"
        />
        <label>Pick 1 or more themes</label>
        <div>
          <Field name="theme" component='select'>           
            <option />
            {themeList}         
          </Field>
        </div>
        <button 
          type="submit"
          disabled={this.props.pristine || this.props.submitting}>
          Submit
        </button>
        <button
          type="reset">
          Reset
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'addQuote',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('addQuote', Object.keys(errors)[0]))
})(AddQuoteForm);


