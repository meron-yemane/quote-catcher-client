import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {fetchProtectedData} from '../actions/index';
import './HomePageQuotesDisplay.css';
import NavBar from './NavBar';
import store from '../store';
import {fetchQuotes} from '../actions/index';
import {loadAuthToken} from '../local-storage';
import {nextQuoteToBeDisplayedAndFadeIn} from '../actions/index';
import {fadeInOrOut} from '../actions/index';


export class HomePageQuotesDisplay extends React.Component {
  handleTransitionEnd() {
    if (this.props.fadeInOrOut === "fadeIn") {
      console.log("FADE OUT inside handleTransitionEnd")
      this.props.dispatch(fadeInOrOut("fadeOut"))
    }
    else if (this.props.fadeInOrOut === "fadeOut") {
      console.log("FADE IN inside handleTransitionEnd")
      this.props.dispatch(nextQuoteToBeDisplayedAndFadeIn())
      .then(() => {
        console.log("fading in")
        this.props.dispatch(fadeInOrOut("fadeIn"))
      })
    }
  }



  componentDidMount() {
    const authToken = loadAuthToken();
    if (authToken) {
      this.props.dispatch({
        type: 'SET_AUTH_TOKEN',
        authToken
      })
      this.props.dispatch(fetchQuotes())
      .then(() => {
        this.props.dispatch(fadeInOrOut("fadeOut"))
        setTimeout(() => this.props.dispatch(fadeInOrOut("fadeIn")), 2000)
      })
    }
    if (!this.props.loggedIn) {
      return;
    }
    this.props.dispatch(fetchProtectedData());

  }

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
          themesToDisplay.push(<h3 className="homePageQuoteThemes">{theme}</h3>)
        } else {
          themesToDisplay.push(<h3 className="homePageQuoteThemes">{theme}<span>,&nbsp;</span></h3>)
        }
        themeCounter += 1
      });
      quote = <section className="quotesSection">
          <div className={this.props.fadeInOrOut} onTransitionEnd={() =>  this.handleTransitionEnd()}>
            <h2 className="displayQuotesText"><span>&ldquo;</span>{this.props.quotesToDisplay[this.props.quoteCounter % (this.props.quotesToDisplay.length)].quoteString}<span>&rdquo;</span></h2>
            <h4 className="displayQuotesAuthor"><span>- </span>{this.props.quotesToDisplay[this.props.quoteCounter % (this.props.quotesToDisplay.length)].author}</h4>
            <div>
              <h3>Theme(s): {themesToDisplay}</h3>
            </div>
          </div>
        </section>
    }
    if (this.props.quotesToDisplay.length === 0) {
      quote = <h1 className="noQuotesToDisplayMsg">Begin By Adding Quotes!</h1>
    }
    return (
      <div className="displayQuotesPage">
        <NavBar />
        {quote}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fadeInOrOut: state.quoteCatcherReducer.fadeInOrOut, 
  quoteCounter: state.quoteCatcherReducer.quoteCounter,
  loggedIn: state.quoteCatcherReducer.authToken,
  quotesToDisplay: state.quoteCatcherReducer.quotesToDisplay
});

export default connect(mapStateToProps)(HomePageQuotesDisplay);