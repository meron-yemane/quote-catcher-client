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
  //   const authToken = loadAuthToken();
  //   if (authToken) {
  //     this.props.dispatch({
  //       type: 'SET_AUTH_TOKEN',
  //       authToken
  //     })
  //     this.props.dispatch(fetchQuotes());
  //   }  
    if (!this.props.loggedIn) {
      return;
    }
    this.props.dispatch(start());
    this.props.dispatch(fetchProtectedData());

  }

  //window.location = '/login'
  //rsmith slack name

  render() {
    if (!this.props.loggedIn) {
       return <Redirect to="/login" />;
    }
    let quote;
    if (this.props.quotesToDisplay.length > 0) {
      quote = <section>
          <h2 className="displayQuotesText"><span>"</span>{this.props.quotesToDisplay[this.props.quoteCounter % (this.props.quotesToDisplay.length)].quoteString}<span>"</span></h2>
          <h4 className="displayQuotesAuthor"><span>- </span>{this.props.quotesToDisplay[this.props.quoteCounter % (this.props.quotesToDisplay.length)].author}</h4>
          <div>
            <h3>Theme(s): {this.props.quotesToDisplay[this.props.quoteCounter % (this.props.quotesToDisplay.length)].theme}</h3>
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