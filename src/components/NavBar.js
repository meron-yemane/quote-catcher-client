import React from 'react';
import {connect} from 'react-redux';
import {setCurrentUser, setAuthToken} from '../actions/index';
import {clearAuthToken} from '../local-storage';
import {Link, Redirect} from 'react-router-dom';
import './NavBar.css';
import {displayLandingPage} from '../actions/index';
import {addQuoteDisplay} from '../actions/index';
import {API_BASE_URL} from '../config';
import store from '../store';

export class NavBar extends React.Component {
  logOut() {
    this.props.dispatch(setCurrentUser(null));
    this.props.dispatch(setAuthToken(null));
    this.props.dispatch(addQuoteDisplay([]));
    clearAuthToken(); 
  }
  
  render () {
    let logOutButton;
    if (this.props.loggedIn) {
      logOutButton = (
        <button onClick={() => this.logOut()}>Log out</button>
      );
    }
    return (
      <nav className="navigationBar">
        <div className="navigationLinks"><Link to='/'><span className="fa fa-home"></span></Link></div>
        <div className="navigationLinks"><Link to='/addquote'>Add Quote</Link></div>
        <div className="navigationLinks"><Link to='/quotes'><span className="fa fa-search"></span>&nbsp;Search</Link></div>
        <div className="navigationLinks navigationLinkLogout">{logOutButton}</div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.quoteCatcherReducer.currentUser !== null
});

export default connect(mapStateToProps)(NavBar);