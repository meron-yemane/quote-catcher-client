import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {reduxForm, Field, SubmissionError, focus, reset} from 'redux-form';
import './SearchResults.css';
import IndividualQuotes from './IndividualQuotes';
import {deleteQuote} from '../actions/index';
import {updateThemeToAddBoxId} from '../actions/index';
import {deleteQuoteFromSearchedQuotes} from '../actions/index';
import {addTheme} from '../actions/index';
import Multiselect from 'react-widgets/lib/Multiselect';
import 'react-widgets/dist/css/react-widgets.css';
import searchQuotesDivider from '../images/search-quotes-divider.png';

let themes = ["Relationships", "Finances", "Identity", "Fear", "Career", "Motivation", "Adventure", "Spirituality", "Loss", "Failure", "Happiness", "Discipline"];
export class SearchResults extends React.Component {
  handleDeleteClick(quote) {
    return this.props
    .dispatch(deleteQuote(quote._id))
  }

  handleAddThemeClick(quote) {
    this.props
    .dispatch(updateThemeToAddBoxId(quote._id))
  }

  handleThemeSubmit(value, quote) {
    //return this.props
    //.dispatch(addTheme(themesToAdd, quote._id))
  }

  render() {
    let {open} = this.state || {};
    let searchedQuotes = [];
    let themeCounter;
    let themesToDisplay;
    let addQuoteThemes;
    let inputValue;
    let quoteBreakImg;
    if (this.props.searchedQuotes.length > 0) {
      this.props.searchedQuotes.map((quote, index) => {
      themeCounter = 0;
      themesToDisplay = [];
      addQuoteThemes = [];
      const renderMultiselect = ({input, data}) => {        
        if (this.props.AddThemeId === quote._id) {
          inputValue = this.props.value
        } else {
          inputValue = []
        }
        return (
          <Multiselect 
            {...input}
            onBlur={() => input.onBlur()}
            value={inputValue}
            disabled={!(this.props.isOpen && this.props.AddThemeId === quote._id)}
            className="selectBox"
            data={data}
            open={this.props.isOpen && this.props.AddThemeId === quote._id}
            defaultValue={[]}
          />
        )
      }
      addQuoteThemes = themes.filter(theme => {
        return !(quote.theme.includes(theme))
      });
      quote.theme.map((theme, index) => {
        if (themeCounter + 1 === quote.theme.length) {
          themesToDisplay.push(<h3 key={index} className="addQuoteDisplayThemes">{theme}</h3>)
        } else {
          themesToDisplay.push(<h3 key={index} className="addQuoteDisplayThemes">{theme}<span>,&nbsp;</span></h3>)
        }
        themeCounter += 1
      });
      if (index === this.props.searchedQuotes.length - 1) {
        quoteBreakImg = <div></div>
      } else {
        quoteBreakImg =  <img className="breakingImg" src={searchQuotesDivider} />
      }
      searchedQuotes.push( 
        <section key={quote._id} className="quote-expanded">
          <h2 className="quoteText"><span>&ldquo;</span>{quote.quoteString}<span>&rdquo;</span></h2>
          <h4 className="searchResultsAuthor"><span>- </span>{quote.author}</h4>
            <h3>Theme(s): {themesToDisplay}
            </h3> 
            <div>
              <button onClick={() => this.handleAddThemeClick(quote)} className='addQuoteButton'>
                  <i className='fa fa-plus fa-fw' aria-hidden='true'></i> {'Theme'}
              </button>
            </div>
            <div className="addThemeAndDeleteBox">
             <form className="addThemeForm" 
             onSubmit={this.props.handleSubmit(values => {
                this.handleThemeSubmit(values, quote)
              })}>
              <Field
                name="themesToAdd"
                component={renderMultiselect}
                data={addQuoteThemes}
              />
              <button 
                className="searchSubmitButton"
                type="submit" 
                disabled={this.props.AddThemeId !== quote._id || this.props.pristine || this.props.submitting}
                >
                Submit
              </button>
             </form>
          <div>
            {//<button onClick={() =>
              //this.handleDeleteClick(quote)}
              //>
            }
              <a onClick={() => 
                this.handleDeleteClick(quote)} className=" deleteButton btn btn-danger" href="#">
                 <i className="fa fa-trash-o fa-lg"></i> Delete</a>
              {//<i className='fa fa-trash-o' aria-hidden='true'></i>
              }
            {//</button>
            }
          </div>
        </div>
          <div>
            {quoteBreakImg}
          </div>
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


