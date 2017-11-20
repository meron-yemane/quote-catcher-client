import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {fetchProtectedData} from '../actions/index';
import './HomePageQuotesDisplay.css';
import NavBar from './NavBar';
import store from '../store';
import {fetchQuotes} from '../actions/index';
import {start} from '../actions/index';
import {loadAuthToken} from '../local-storage';


export class HomePageQuotesDisplay extends React.Component {

  componentDidMount() {
    const authToken = loadAuthToken();
    if (authToken) {
      this.props.dispatch({
        type: 'SET_AUTH_TOKEN',
        authToken
      })
      this.props.dispatch(fetchQuotes());
    }  
    if (!this.props.loggedIn) {
      return;
    }

    if (this.props.quoteCounter === 0) {
      this.props.dispatch(start());
    }
    this.props.dispatch(fetchProtectedData());

  }

  //window.location = '/login'
  //rsmith slack name

  render() {
    if (!loadAuthToken()) {
       return <Redirect to="/login" />;
    }
    let quote;
    let themeCounter = 0;
    let themesToDisplay = [];
    if (this.props.quotesToDisplay.length > 0) {
      const themes = this.props.quotesToDisplay[this.props.quoteCounter % (this.props.quotesToDisplay.length)].theme.map((theme, index) => {
        if (themeCounter + 1 === this.props.quotesToDisplay[this.props.quoteCounter % (this.props.quotesToDisplay.length)].theme.length) {
          themesToDisplay.push(<h3 key={index} className="homePageQuoteThemes">{theme}</h3>)
        } else {
          themesToDisplay.push(<h3 key={index} className="homePageQuoteThemes">{theme}<span>,&nbsp;</span></h3>)
        }
        themeCounter += 1
      });
      quote = <section className="quotesSection">
          <h2 className="displayQuotesText"><span>"</span>{this.props.quotesToDisplay[this.props.quoteCounter % (this.props.quotesToDisplay.length)].quoteString}<span>"</span></h2>
          <h4 className="displayQuotesAuthor"><span>- </span>{this.props.quotesToDisplay[this.props.quoteCounter % (this.props.quotesToDisplay.length)].author}</h4>
          <div>
            <h3>Theme(s): {themesToDisplay}</h3>
          </div>
        </section>
    }
    if (this.props.quotesToDisplay.length === 0) {
      quote = <h1>Start By Adding Quotes!</h1>
    }
    return (
      <div>
        <NavBar />
        {quote}
      </div>
    );
  }
}

const mapStateToProps = state => ({ 
  quoteCounter: state.quoteCatcherReducer.quoteCounter,
  loggedIn: state.quoteCatcherReducer.authToken,
  quotesToDisplay: state.quoteCatcherReducer.quotesToDisplay
});

export default connect(mapStateToProps)(HomePageQuotesDisplay);