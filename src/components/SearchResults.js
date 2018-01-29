import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {reduxForm, Field, FieldArray, SubmissionError, focus, reset} from 'redux-form';
import './SearchResults.css';
import IndividualQuotes from './IndividualQuotes';
import AddThemeFormComponent from './AddThemeForm';
import {deleteQuote} from '../actions/index';
import {updateThemeToAddBoxId} from '../actions/index';
import {deleteQuoteFromSearchedQuotes} from '../actions/index';
import {addTheme} from '../actions/index';
import {currentAddThemeQuote} from '../actions/index';
import {previousAddThemeQuotes} from '../actions/index';
import Multiselect from 'react-widgets/lib/Multiselect';
import 'react-widgets/dist/css/react-widgets.css';
import searchQuotesDivider from '../images/search-quotes-divider.png';

let themes = ["Relationships", "Finances", "Identity", "Fear", "Career", "Motivation", "Adventure", "Spirituality", "Loss", "Failure", "Happiness", "Discipline"];
export class SearchResults extends React.Component {
  handleDeleteClick(quote, e) {
    e.preventDefault();
    return this.props
    .dispatch(deleteQuote(quote._id))
  }

  handleAddThemeClick(quote) {
    this.props.dispatch(updateThemeToAddBoxId(quote._id))
    this.props.dispatch(previousAddThemeQuotes(quote._id))
  }

  onSubmit(value, quote) {
    return this.props
    .dispatch(addTheme(value.themesToAdd, quote._id))
    // .then(() => {
    //   return this.props.dispatch(reset('searchResults'))
    // })
  }

  render() {
    let {open} = this.state || {};
    let searchedQuotes = [];
    let themeCounter;
    let themesToDisplay;
    let addQuoteThemes;
    let inputValue;
    let quoteBreakImg;
    let themeOptions;
    // let previousThemeId = ;

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
      // const renderMultiselect = ({input, data}) => {
      //   // if (this.props.quotesToDisplayAddThemeId === quote._id) {
      //   //   previousThemeId = this.props.quotesToDisplayAddThemeId
      //   // }
      //   // console.log("quotes themes", this.props.quotesToDisplayAddThemeId)
      //   // console.log("previousThemeId", previousThemeId)
      //   // console.log(this.props.quotesToDisplayAddThemeId !== previousThemeId)
      //   // console.log(this.props.quotesToDisplayAddThemeId !== null)
      //   // console.log(previousThemeId !== undefined)

      //   if (this.props.quotesToDisplayAddThemeId === quote._id) {
      //     console.log(quote._id)
      //     console.log("previous themes id", this.props.previousAddThemeQuotes[this.props.previousAddThemeQuotes.length -2])
      //     if (this.props.quotesToDisplayAddThemeId !== this.props.previousAddThemeQuotes[this.props.previousAddThemeQuotes.length -3] && this.props.previousAddThemeQuotes[this.props.previousAddThemeQuotes.length -2] !== undefined && this.props.quotesToDisplayAddThemeId !== this.props.previousAddThemeQuotes[this.props.previousAddThemeQuotes.length -2]) {
      //       console.log("inside different quote if/reset")
      //       input.value = []
      //       inputValue = input.value
      //     }
      //     // else if (this.props.)

      //     else {
      //       console.log("Inside else statement", input.value)
      //       inputValue = input.value
      //     }
      //   } else {
      //     console.log("not clicked quote")
      //     inputValue = []
      //   }

      //   // if (this.props.previousAddThemeQuotes[-2] !== ) {
      //   //   console.log("INSIDEEE")
      //   //   input.value = []
      //   //   inputValue = input.value
      //   // }
      //   // else if (this.props.quotesToDisplayAddThemeId === quote._id) {
      //   //   inputValue = input.value
      //   //   // previousThemeID.push(this.props.quotesToDisplayAddThemeId)
      //   // } else {
      //   //   inputValue = []
      //   // }
      //   // console.log(this.props.previousAddThemeQuotes)
      //   // console.log(inputValue)

      //   // else if ((this.props.currentAddThemeQuote !== quote._id) && (this.props.AddThemeId === quote._id)) {
      //   //   console.log("Helooo asdklfjdslfjd s")
      //   //   input.value = []
      //   //   inputValue = input.value
      //   // }
      //   // // else if (this.props.AddThemeID !== this.props.currentAddThemeQuote) {
      //   // //   console.log("INSIDEEEE")
      //   // //   input.value = []
      //   // //   inputValue = input.value
      //   // // }
      //   // console.log(this.props.AddThemeId)
      //   // console.log(quote._id)
      //   // if (this.props.AddThemeId === quote._id) {
      //   //   console.log(this.props.AddThemeId)
      //   //   inputValue = input.value
      //   //   console.log("inputVal", inputValue)
      //   // } else {
      //   // inputValue = []
      //   // }
        // return (
        //   { <Multiselect 
        //     {...input}
        //     onBlur={() => input.onBlur()}
        //     value={inputValue}
        //     disabled={!(this.props.isOpen && this.props.AddThemeId === quote._id)}
        //     className="selectBox"
        //     data={data}
        //     open={this.props.isOpen && this.props.AddThemeId === quote._id}
        //     defaultValue={[]}
        //   />
        // )
      // }
      addQuoteThemes = themes.filter(theme => {
        return !(quote.theme.includes(theme))
      });
      addQuoteThemes.forEach(theme => {
        themeOptions.push(<option value={theme}>{theme}</option>)
      })
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
            {
            // <div>
            //   <button onClick={() => this.handleAddThemeClick(quote)} className='addThemeButton'>
            //       <i className='fa fa-plus fa-fw' aria-hidden='true'></i> {'Theme'}
            //   </button>
            // </div>
            }
            
            <div className="addThemeAndDeleteBox">
            <AddThemeFormComponent form={`addThemeForm_${quote._id}`} key={quote._id} themeOptions={themeOptions} quote={quote} />
            {
             // <form className="addThemeForm" 
             //       onSubmit={this.props.handleSubmit((value, quote) => 
             //       this.onSubmit(value,quote))}
             //       form={`addThemeForm_${quote._id}`}
             //  >
             //  <label className="addThemeLabel">Add Theme</label>
             //  <div>
            }
                {
                // <Field className="individualAddThemeForms" name="themesToAdd" component="select">
                //   <option>Select Theme</option>
                //   {themeOptions}
                // </Field>
                // <button 
                //   className="searchSubmitButton"
                //   type="submit" 
                //   disabled={this.props.pristine || this.props.submitting}>
                //   Submit
                // </button>
              }
              </div>
          <div className="deleteBox" >
            {//<button onClick={() =>
              //this.handleDeleteClick(quote)}
              //>
            }
              <a onClick={(e) => 
                this.handleDeleteClick(quote, e)} className=" deleteButton btn btn-danger" href="#">
                 <i className="fa fa-trash-o fa-lg"></i> Delete</a>
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
  previousAddThemeQuotes: state.quoteCatcherReducer.previousAddThemeQuotes,
  quotesToDisplayAddThemeId: state.quoteCatcherReducer.quotesToDisplayAddThemeId,
  isOpen: state.quoteCatcherReducer.isOpen,
  AddThemeId: state.quoteCatcherReducer.quotesToDisplayAddThemeId,
  searchedQuotes: state.quoteCatcherReducer.searchedQuotes
});

const SearchResultsConnect = connect(mapStateToProps)(SearchResults);

export default reduxForm({
  // form: 'searchResults',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('searchResults', Object.keys(errors)[0]))
})(SearchResultsConnect);
