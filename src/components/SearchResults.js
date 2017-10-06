import React from 'react';
import {connect} from 'react-redux';
import './SearchResults.css';
import IndividualQuotes from './IndividualQuotes';

export class SearchResults extends React.Component {
  render() {
    console.log("HELLLLOOOO")
    console.log(this.props)
    const quotesToDisplay = this.props.quotesToDisplay.map((quote, index) =>
      <section key={index} className="quote-expanded">
          <h2 className="quoteText"><span>"</span>{quote.quoteString}<span>"</span></h2>
          <h4 className="searchResultsAuthor"><span>- </span>{quote.author}</h4>
          <div>
            <h3>Theme(s): {quote.theme}</h3>
          </div>
      </section>
    );
    return (
     <div> 
      {quotesToDisplay}
     </div>
    );
  }
}

const mapStateToProps = state => ({
  quotesToDisplay: state.quoteCatcherReducer.quotesToDisplay
});

export default connect(mapStateToProps)(SearchResults);