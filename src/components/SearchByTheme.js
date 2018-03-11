import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, SubmissionError, focus, reset} from 'redux-form';
import {API_BASE_URL} from '../config';
import {isFetching} from '../actions/index';
import {addQuoteToSearchResults} from '../actions/index';
import './SearchByTheme.css';

export class SearchByTheme extends React.Component {
  addQuoteToSearchResults(quotes) {
    this.props.dispatch(addQuoteToSearchResults(quotes))
  }

  onSubmit(values) {
    this.props.dispatch(isFetching(true))
    return fetch(`${API_BASE_URL}/api/quotes/searchbytheme`, {
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
        this.props.dispatch(isFetching(false))
        if (res.length === 0) {
          return this.addQuoteToSearchResults("No results found")
        } else {
          return this.addQuoteToSearchResults(res)
        }
      })
      .then(() => console.log('Submitted with values', values))
      .then(() => {
        this.props.dispatch(reset('searchByTheme'))
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
        className="themeSearchForm"
        onSubmit={this.props.handleSubmit(values => 
          this.onSubmit(values)

      )}>        
        <button 
          className="submitThemesButton" 
          type="submit"
          disabled={this.props.pristine || this.props.submitting}>
          Search Theme
        </button>
        <Field 
          name="theme"
          component="select"
          className="themeSearch"
        >
        <option />
        <option>Relationships</option>
        <option>Finances</option>
        <option>Identity</option>
        <option>Fear</option>
        <option>Career</option>
        <option>Motivation</option>
        <option>Adventure</option>
        <option>Spirituality</option>
        <option>Loss</option>
        <option>Failure</option>
        <option>Happiness</option>
        <option>Discipline</option>
        </Field>
      </form>
    ) 
  }
}

const mapStateToProps = state => ({
  quotesToDisplay: state.quotesToDisplay
});

const SearchByThemeConnect = connect(mapStateToProps)(SearchByTheme);

export default reduxForm({
  form: 'searchByTheme',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('searchByTheme', Object.keys(errors)[0]))
})(SearchByThemeConnect);







