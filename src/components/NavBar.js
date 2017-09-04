import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './NavBar.css';

export default class NavBar extends React.Component {
  render () {
    return (
      <nav className="navigationBar">
        <div className="navigationLinks"><Link to='/'><span className="fa fa-home"></span></Link></div>
        <div className="navigationLinks"><Link to='/addquote'>Add Quote</Link></div>
        <div className="navigationLinks"><Link to='/quotes'><span className="fa fa-search"></span>&nbsp;Search</Link></div>
        <div className="navigationLinks navigationLinkLogout">Logout</div>
      </nav>
    );
  }
}