import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import './SearchResults.css';
import IndividualQuotes from './IndividualQuotes';
import {deleteQuote} from '../actions/index';
import {updateThemeToAddBoxId} from '../actions/index';
import {deleteQuoteFromSearchedQuotes} from '../actions/index';
import Multiselect from 'react-widgets/lib/Multiselect';
import 'react-widgets/dist/css/react-widgets.css';

let themes = ["Relationships", "Finances", "Identity", "Fear", "Career", "Motivation", "Adventure", "Spirituality", "Loss", "Failure", "Happiness", "Discipline"];
export class SearchResults extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {open: false};
  // }
  handleDeleteClick(quote) {
    return this.props
    .dispatch(deleteQuote(quote._id))
  }

  handleEditClick(quote) {
  }

  handleAddThemeClick(quote) {
    console.log("quote", quote)
    return this.props
    .dispatch(updateThemeToAddBoxId(quote._id))
    // .then(() => {
    //   return this.setState({ open: !open })
    // });
  }

  render() {
    let {open} = this.state || {};
    let toggleWidget = () => this.setState({ open: !open })
    if (this.props.searchedQuotes.length > 0) {
      const searchedQuotes = this.props.searchedQuotes.map((quote, index) =>
        <section key={index} className="quote-expanded">
          <h2 className="quoteText"><span>"</span>{quote.quoteString}<span>"</span></h2>
          <h4 className="searchResultsAuthor"><span>- </span>{quote.author}</h4>
          <div>
            <div>
              <button onClick={() => this.handleAddThemeClick(quote)} className='addQuoteButton'>
                  ><i className='fa fa-plus fa-fw' aria-hidden='true'></i> {'Theme'}
              </button>
            </div> 
            <Multiselect 
              className="selectBox"
              open={open}
              data={themes}
              onToggle={() => {this.handleAddThemeClick(quote)}}
            />
            <h3>Theme(s): {quote.theme}</h3>
          </div>
          <div>
            <button onClick={() =>
              this.handleDeleteClick(quote)}
              ><i className='fa fa-trash-o' aria-hidden='true'></i>
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
  AddThemeId: state.quoteCatcherReducer.quotesToDisplayAddThemeId,
  searchedQuotes: state.quoteCatcherReducer.searchedQuotes
});

export default connect(mapStateToProps)(SearchResults);