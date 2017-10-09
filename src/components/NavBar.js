import React from 'react';
import {connect} from 'react-redux';

import {Link} from 'react-router-dom';
import './NavBar.css';
import {displayLandingPage} from '../actions/index';
import {API_BASE_URL} from '../config';

export class NavBar extends React.Component {
  displayLandingPage(showLandingPage) {
    this.props.dispatch(displayLandingPage(showLandingPage));
  }

  handleClick() {
    localStorage.removeItem('access_token');
    return this.displayLandingPage(!this.props.showLandingPage)
  }
  
  render () {
    return (
      <nav className="navigationBar">
        <div className="navigationLinks"><Link to='/'><span className="fa fa-home"></span></Link></div>
        <div className="navigationLinks"><Link to='/addquote'>Add Quote</Link></div>
        <div className="navigationLinks"><Link to='/quotes'><span className="fa fa-search"></span>&nbsp;Search</Link></div>
        <div className="navigationLinks navigationLinkLogout"><Link onClick={() => this.handleClick()} to='/'>Logout</Link></div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  showLandingPage: state.quoteCatcherReducer.showLandingPage
});

export default connect(mapStateToProps)(NavBar);