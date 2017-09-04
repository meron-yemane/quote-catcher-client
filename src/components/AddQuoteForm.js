import React from 'react';
import './AddQuoteForm.css';

export default class AddQuoteForm extends React.Component {
  render() {
    const themeList = this.props.themes.map((theme, index) => 
      <option key={index} value={theme}>{theme}</option>
    );
    return (
      <form id="addQuoteForm">
        <div className="form-section">
          <label htmlFor="quote">New Quote</label>
          <div>
            <textarea className="addQuoteTextarea" name="quote" rows="15" required></textarea>
          </div>
        </div>
        <div className="form-section">
            <label htmlFor="author">Author </label>
            <input type="text" name="author" />
        </div>
        <div className="form-section">
          <label htmlFor="theme">Pick 1 or more themes</label>
          <div>
            <select className="addQuoteThemes" multiple size="5">
                {themeList}
            </select>
          </div>
        </div>
          <span>+&nbsp;</span><a>add theme</a>
        <div className="addQuoteButtons">
          <button className="addQuoteIndividualButtons" form="parentForm" type="submit">Submit</button>
          <button className="addQuoteIndividualButtons" form="parentForm" type="reset">Reset</button>
        </div>
      </form>
    );
  }
}