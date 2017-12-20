import React from 'react';
import {reduxForm, Field, SubmissionError, focus, reset} from 'redux-form';
import InputQuoteSearch from './InputForAddQuoteAndSearch';
import {required, nonEmpty} from '../validators';
import {API_BASE_URL} from '../config';
import {addQuoteDisplay} from '../actions/index';
import {loadAuthToken} from '../local-storage';
import {fetchQuotes} from '../actions/index';
import Multiselect from 'react-widgets/lib/Multiselect';
import './AddQuoteForm.css';
import 'react-widgets/dist/css/react-widgets.css';

export class AddQuoteForm extends React.Component {
  // componentDidMount() {
  //   const authToken = loadAuthToken();
  //   if (authToken) {
  //     this.props.dispatch({
  //       type: 'SET_AUTH_TOKEN',
  //       authToken
  //     })
  //   } 
  // }

  onSubmit(values) {
    return fetch(`${API_BASE_URL}/api/quotes/create`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
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
        return
      })
      .then(() => {
        this.props.dispatch(fetchQuotes())
      })
      .then(() => {
        this.props.dispatch(addQuoteDisplay(values))
      })
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
    const renderMultiselect = ({ input, data, valueField, textField }) => (
      <Multiselect
        {...input}
        onBlur={() => input.onBlur()}
        value={input.value || []} // requires value to be an array
        data={data}
        valueField={valueField}
        textField={textField}
        className="themeList"
      />
    )
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

    const themeList = ["Relationships", "Finances", "Identity", "Fear", "Career", "Motivation", "Adventure", "Spirituality", "Loss", "Failure", "Happiness", "Discipline"];
    return (
      <form 
        onSubmit={this.props.handleSubmit(values => 
          this.onSubmit(values)
        )}> 
        {successMessage}
        {errorMessage}
        <Field
          className="addQuoteTextArea"
          name="quoteString"
          type="textarea"
          component="textarea"
          label="Quote"
          validate={[required, nonEmpty]}
        />
        <Field
          name="author"
          type="text"
          component={InputQuoteSearch}
          label="Author"
        />
        <label>Pick 1 or more themes</label>
        <Field 
          name="theme" 
          component={renderMultiselect}           
          data={themeList}         
        />
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


