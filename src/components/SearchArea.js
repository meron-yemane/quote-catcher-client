import React from 'react';
import './SearchArea.css';

export default class SearchArea extends React.Component {
  render () {
    const themeList = this.props.themes.map((theme, index) => 
      <option key={index} value={theme}>{theme}</option>
    );
    return (
      <form>
        <div className="form-section">
          <label htmlFor="themeSearch">Search by theme</label>
            <div>
              <select multiple size="5">
                {themeList}
              </select>
          </div>
        </div>
        <div className="form-section">
          <label htmlFor="quoteSearch">Search Quote</label>
          <input type="text" name="quoteSearch" />
        </div>
        <div className="form-section">
          <label htmlFor="authorSearch">Search by author</label>
          <input type="text" name="authorSearch" />
        </div>
        <button type="submit">Search</button>
        <button type="reset">Reset</button>
      </form>
    );
  }
}