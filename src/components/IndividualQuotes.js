import React from 'react';
import './IndividualQuotes.css';

export default class IndividualQuotes extends React.Component {
  render () {
    return (
      <div>
        <section className="quote-expanded">
          <h2>"Please accept my resignation. I don't care to belong to any club that would have me as a member."</h2>
          <h4 className="searchResultsAuthor">- Groucho Marx</h4>
          <div>
            <h3>Theme(s): Career</h3>
            <h3>Book or Source: Groucho and Me</h3>
          </div>
        </section>
        <section>
          <div className="firstQuote">
            <h2>"Praesent sagittis a mi sit amet dictum. Donec orci nibh, dignissim in leo et, congue semper mauris. Donec elit lacus, dictum et placerat..."</h2>
            <button className="expandButton" type="submit">Expand</button>
          </div>
          <div className="secondQuote">
            <h2>"Suspendisse a tempus dolor. Nullam porttitor nisi sed justo dictum consequat. Etiam sed congue feli..."</h2>
            <button className="expandButton" type="submit">Expand</button>
          </div>
        </section>
      </div>
    )
  }
}