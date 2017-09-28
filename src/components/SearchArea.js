import React from 'react';
import './SearchArea.css';

export default class SearchArea extends React.Component {
  render () {
    const themeList = this.props.themes.map((theme, index) => 
      <option key={index} value={theme}>{theme}</option>
    );
    return (
      <form className="searchAreaForm">
        <div className="form-section">
          <label htmlFor="themeSearch">Search by theme</label>
          <div>
            <select className="searchAreaThemes" multiple size="5">
              {themeList}
            </select>
          </div>
        </div>
        <div className="form-section">
          <label htmlFor="quoteSearch">Search Quote</label>
          <br />
          <input className="searchAreaInputs" type="text" name="quoteSearch" />
        </div>
        <div className="form-section">
          <label htmlFor="authorSearch">Search by author</label>
          <br />
          <input className="searchAreaInputs" type="text" name="authorSearch" />
        </div>
        <div className="searchAreaButtons">
          <button className="searchAreaIndividualButtons" type="submit">Search</button>
          <button className="searchAreaIndividualButtons" type="reset">Reset</button>
        </div>
      </form>
    );
  }
}