import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {fetchProtectedData} from '../actions/index'
import './HomePageQuotesDisplay.css';
import NavBar from './NavBar';
import store from '../store';

export class HomePageQuotesDisplay extends React.Component {
  componentDidMount() {
    if (!this.props.loggedIn) {
      return;
    }
    this.props.dispatch(fetchProtectedData());
  }

  render() {
    // if (store.getState().quoteCatcherReducer.quotesToDisplay.length === 0) {
    //   console.log("Inside the first if statement")
    //   const quoteToDisplay = <h1>Visit the addQuote tab to start using the site</h1>
    //   console.log(quoteToDisplay)
    // } else {
    //   const quoteToDisplay = this.props.quotesToDisplay.map((quote, index) => 
    //     <section key={index} className="quote-expanded">
    //       <h2 className="quoteText"><span>"</span>{quote.quoteString}<span>"</span></h2>
    //       <h4 className="searchResultsAuthor"><span>- </span>{quote.author}</h4>
    //     </section>
    //   );
    // }
    // //const quotesToDisplayInSetIntervals =
    // console.log(quoteToDisplay); 
    if (!this.props.loggedIn) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <NavBar />
      </div>
    );
  }
}

const mapStateToProps = state => ({ 
  loggedIn: state.quoteCatcherReducer.currentUser !== null,
  quotesToDisplay: state.quoteCatcherReducer.quoteToDisplay
});

export default connect(mapStateToProps)(HomePageQuotesDisplay);