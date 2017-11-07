import React from 'react';
import {connect} from 'react-redux';
import './SearchResults.css';
import IndividualQuotes from './IndividualQuotes';
import {deleteQuote} from '../actions/index';
import {deleteQuoteFromSearchedQuotes} from '../actions/index';
export class SearchResults extends React.Component {
  handleDeleteClick(quote) {
    return this.props
    .dispatch(deleteQuote(quote._id))
    // .then(() => {
    //   this.props.dispatch(deleteQuoteFromSearchedQuotes(quote._id))
    // })
  }

  handleEditClick(quote) {
  }

  render() {
    console.log("searched quotes length: ", this.props.searchedQuotes.length)
    if (this.props.searchedQuotes.length > 0) {
      const searchedQuotes = this.props.searchedQuotes.map((quote, index) =>
        <section key={index} className="quote-expanded">
          <h2 className="quoteText"><span>"</span>{quote.quoteString}<span>"</span></h2>
          <h4 className="searchResultsAuthor"><span>- </span>{quote.author}</h4>
          <div>
            <h3>Theme(s): {quote.theme}</h3>
          </div>
          <div>
            <button onClick={() =>
              this.handleDeleteClick(quote)}
              ><i className='fa fa-trash-o' aria-hidden='true'></i>
            </button>
          </div>
          <div>
            <button onClick={() => 
              this.handleEditClick(quote)}
              ><i className='fa fa-pencil fa-fw' aria-hidden='true'></i>
            </button>
          </div>
        </section>
      );
      return (
        <div>
          {searchedQuotes} 
        </div>
      );
    }
    return (
     <div> 
     </div>
    );
  }
}

const mapStateToProps = state => ({
  searchedQuotes: state.quoteCatcherReducer.searchedQuotes
});

export default connect(mapStateToProps)(SearchResults);