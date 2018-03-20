import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, focus} from 'redux-form';
import './SearchResults.css';
import AddThemeFormComponent from './AddThemeForm';
import {deleteQuote} from '../actions/index';
import {updateThemeToAddBoxId} from '../actions/index';
import {addTheme, fetchQuotes} from '../actions/index';
import {previousAddThemeQuotes} from '../actions/index';
import 'react-widgets/dist/css/react-widgets.css';
import searchQuotesDivider from '../images/search-quotes-divider.png';
import Loader from 'react-loader-spinner';
import {v4} from 'node-uuid';

let themes = ["Relationships", "Finances", "Identity", "Fear", "Career", "Motivation", "Adventure", "Spirituality", "Loss", "Failure", "Happiness", "Discipline"];
export class SearchResults extends React.Component {
  handleDeleteClick(quote, e) {
    e.preventDefault();
    return this.props
    .dispatch(deleteQuote(quote._id))
    .then(() => {
      // if (this.props.currentUser === 'abc') {
      //     this.props.dispatch(demoFetchQuotes())
      // } else {
      this.props.dispatch(fetchQuotes())
    })
  }

  handleAddThemeClick(quote) {
    this.props.dispatch(updateThemeToAddBoxId(quote._id))
    this.props.dispatch(previousAddThemeQuotes(quote._id))
  }

  onSubmit(value, quote) {
    return this.props.dispatch(addTheme(value.themesToAdd, quote._id))
  }

  render() {
    let searchedQuotes = [];
    let themeCounter;
    let themesToDisplay;
    let addQuoteThemes;
    let quoteBreakImg;
    let themeOptions;

    if (this.props.isFetching) {
      return (
        <div className="searchResultsSpinner">
          <Loader className="searchResultsSpinner" type="TailSpin" height={100} width={100}/>
        </div>
      )
    }

    if (this.props.searchedQuotes === "No results found") {
      return (
        <div>
          <h3 className="noResultsMsg">No results found</h3>
        </div>
      )
    }

    if (this.props.searchedQuotes.length > 0) {
      this.props.searchedQuotes.map((quote, index) => {
      themeCounter = 0;
      themesToDisplay = [];
      addQuoteThemes = [];
      themeOptions = [];
      addQuoteThemes = themes.filter(theme => {
        return quote.theme.indexOf(theme) === -1
      });
      addQuoteThemes.forEach(theme => {
        themeOptions.push(<option key={v4()} value={theme}>{theme}</option>)
      })
      quote.theme.map((theme, index) => {
        if (themeCounter + 1 === quote.theme.length) {
          themesToDisplay.push(<div key={index} className="addQuoteDisplayThemes">{theme}</div>)
        } else {
          themesToDisplay.push(<div key={index} className="addQuoteDisplayThemes">{theme}<span>,&nbsp;</span></div>)
        }
        return themeCounter += 1
      });
      if (index === this.props.searchedQuotes.length - 1) {
        quoteBreakImg = <div></div>
      } else {
        quoteBreakImg =  <img alt="" className="breakingImg" src={searchQuotesDivider} />
      }
      return searchedQuotes.push( 
        <section key={quote._id} className="quote-expanded">
          <h2 className="quoteText"><span>&ldquo;</span>{quote.quoteString}<span>&rdquo;</span></h2>
          <h4 className="searchResultsAuthor"><span>- </span>{quote.author}</h4>
            <h3>Theme(s): {themesToDisplay}</h3> 
            <div className="addThemeAndDeleteBox">
            <AddThemeFormComponent form={`addThemeForm_${quote._id}`} key={quote._id} themeOptions={themeOptions} quote={quote} />
            </div>
          <div className="deleteBox" >
              <button onClick={(e) => 
                this.handleDeleteClick(quote, e)} className=" deleteButton btn btn-danger">
                 <i className="fa fa-trash-o fa-lg"></i> Delete</button>
          </div>
            {quoteBreakImg}
        </section>
      )
      });
      return (
        <div className="searchedQuotesBox">
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
  //currentUser: state.quoteCatcherReducer.currentUser.username,
  isFetching: state.quoteCatcherReducer.isFetching,
  previousAddThemeQuotes: state.quoteCatcherReducer.previousAddThemeQuotes,
  quotesToDisplayAddThemeId: state.quoteCatcherReducer.quotesToDisplayAddThemeId,
  isOpen: state.quoteCatcherReducer.isOpen,
  AddThemeId: state.quoteCatcherReducer.quotesToDisplayAddThemeId,
  searchedQuotes: state.quoteCatcherReducer.searchedQuotes
});

const SearchResultsConnect = connect(mapStateToProps)(SearchResults);

export default reduxForm({
  form: 'searchResults',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('searchResults', Object.keys(errors)[0]))
})(SearchResultsConnect);
