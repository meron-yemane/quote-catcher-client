import React from 'react';
import {connect} from 'react-redux';

import {Link} from 'react-router-dom';
import './NavBar.css';
import {displayLandingPage} from '../actions/index';

export class NavBar extends React.Component {
  displayLandingPage(showLandingPage) {
    this.props.dispatch(displayLandingPage(showLandingPage));
  }
  render () {
    return (
      <nav className="navigationBar">
        <div className="navigationLinks"><Link to='/'><span className="fa fa-home"></span></Link></div>
        <div className="navigationLinks"><Link to='/addquote'>Add Quote</Link></div>
        <div className="navigationLinks"><Link to='/quotes'><span className="fa fa-search"></span>&nbsp;Search</Link></div>
        <div className="navigationLinks navigationLinkLogout"><Link to='/'>Logout</Link></div>
      </nav>
    );
  }
}

export default connect()(NavBar);