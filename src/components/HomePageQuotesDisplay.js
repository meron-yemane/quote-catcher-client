import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {fetchProtectedData} from '../actions/index';
import './HomePageQuotesDisplay.css';
import NavBar from './NavBar';
import {loadAuthToken} from '../local-storage';
import {nextQuoteToBeDisplayedAndFadeIn} from '../actions/index';
import {fadeInOrOut} from '../actions/index';
import {v4} from 'node-uuid';

export class HomePageQuotesDisplay extends React.Component {
  handleTransitionEnd() {
    if (this.props.fadeInOrOut === "fadeIn") {
      this.props.dispatch(fadeInOrOut("fadeOut"))
    }
    else if (this.props.fadeInOrOut === "fadeOut") {
      this.props.dispatch(nextQuoteToBeDisplayedAndFadeIn())
      .then(() => {
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
      this.props.dispatch(fadeInOrOut("fadeOut"))
      setTimeout(() => this.props.dispatch(fadeInOrOut("fadeIn")), 2000)
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
      this.props.quotesToDisplay[this.props.quoteCounter % (this.props.quotesToDisplay.length)].theme.map((theme, index) => {
        if (themeCounter + 1 === this.props.quotesToDisplay[this.props.quoteCounter % (this.props.quotesToDisplay.length)].theme.length) {
          themesToDisplay.push(<div key={v4()} className="homePageQuoteThemes">{theme}</div>)
        } else {
          themesToDisplay.push(<div key={v4()} className="homePageQuoteThemes">{theme}<span>,&nbsp;</span></div>)
        }
        return themeCounter += 1
      });
      quote = <section className="quotesSection">
          <div className={this.props.fadeInOrOut} onTransitionEnd={() =>  this.handleTransitionEnd()}>
            <h2 className="displayQuotesText"><span>&ldquo;</span>{this.props.quotesToDisplay[this.props.quoteCounter % (this.props.quotesToDisplay.length)].quoteString}<span>&rdquo;</span></h2>
            <h4 className="displayQuotesAuthor"><span>~ </span>{this.props.quotesToDisplay[this.props.quoteCounter % (this.props.quotesToDisplay.length)].author}</h4>
            <div>
              <h3 className="themeWord">Theme(s): {themesToDisplay}</h3>
            </div>
          </div>
        </section>
    }
    if (this.props.quotesToDisplay.length === 0) {
      quote = <div className="noQuotesToDisplayMsg"></div>
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