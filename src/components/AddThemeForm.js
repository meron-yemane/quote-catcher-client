import React from 'react';
import ReactDOM from 'react-dom';
import {reduxForm, Field, FieldArray, SubmissionError, focus, reset} from 'redux-form';
import {addTheme} from '../actions/index';


export class AddThemeFormComponent extends React.Component {
  onSubmit(value, quote) {
    return this.props
    .dispatch(addTheme(value.themesToAdd, quote._id))
  }

  render() {
    return (
      <form className="addThemeForm" 
            onSubmit={this.props.handleSubmit((value, quote) => 
            this.onSubmit(value, this.props.quote))}>
        <label className="addThemeLabel">Add Theme</label>
          <div>
            <Field 
              className="individualAddThemeForms"
              name="themesToAdd" 
              component="select">
                <option></option>
                {this.props.themeOptions}
            </Field>
            <button 
              className="searchSubmitButton"
              type="submit" 
              disabled={this.props.pristine || this.props.submitting}>
              Submit
            </button>
          </div>
      </form>
    );
  }
}

export default reduxForm({
  fields: ["text"],
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('searchResults', Object.keys(errors)[0]))
})(AddThemeFormComponent);