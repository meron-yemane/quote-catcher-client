import React from 'react';
import {connect} from 'react-redux';
import {setCurrentUser, setAuthToken} from '../actions/index';
import {clearAuthToken} from '../local-storage';
import {Link, Redirect} from 'react-router-dom';
import './NavBar.css';
import {displayLandingPage} from '../actions/index';
import {addQuoteDisplay} from '../actions/index';
import {API_BASE_URL} from '../config';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import store from '../store';

export class NavBar extends React.Component {
  logOut() {
    this.props.dispatch(setCurrentUser(null));
    this.props.dispatch(setAuthToken(null));
    this.props.dispatch(addQuoteDisplay([]));
    clearAuthToken(); 
  }

  // <div className="navLinksToBeCentered">  
  //           <div className="navigationLinks navigationLogo"><Link to='/'>QuoteCatcher</Link></div>
  //           <div className="navigationLinks navHomeLink"><Link to='/'><span className="fa fa-home fa-2x navHomeLink"></span></Link></div>
  //           <div className="navigationLinks"><Link to='/addquote'>Add Quote</Link></div>
  //           <div className="navigationLinks"><Link to='/quotes'><span className="fa fa-search"></span>&nbsp;Search</Link></div>
  //           <div className="navigationLinks navigationLinkLogout">{logOutButton}</div>
  // </div>
      //   <nav className="navbar navbar-inverse navbar-static-top" role="navigation">
      //   <div className="container-fluid">
      //     <div className="navbar-header">
      //           <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
      //             <span className="sr-only">Toggle navigation</span>
      //             <span className="icon-bar"></span>
      //             <span className="icon-bar"></span>
      //             <span className="icon-bar"></span>
      //           </button>
      //       </div>
      //     <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
      //       <ul class="nav navbar-nav">
      //         <div className="navigationLinks navigationLogo"><Link to='/'>QuoteCatcher</Link></div>
      //         <div className="navigationLinks"><Link to='/addquote'>Add Quote</Link></div>
      //         <div className="navigationLinks"><Link to='/quotes'><span className="fa fa-search"></span>&nbsp;Search</Link></div>
      //       </div>
      //       <div class="nav navbar-nav navbar-right">
      //         <div className="navigationLinks navigationLinkLogout">{logOutButton}</div>
      //       </div>
      //     </div>
      //   </div>
      // </nav>
  render () {
    let logOutButton;
    if (this.props.loggedIn) {
      logOutButton = (
        <button className="navigationLinkLogout" onClick={() => this.logOut()}>Logout</button>
      );
    }
    return (
      <Navbar collapseOnSelect className="navbarCustom">
        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer to='/' className="navigationLinks navigationLogo"><a className="navigationLinks navigationLogo">QuoteCatcher</a></LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav className="navLinksToBeCentered">
            <LinkContainer to='/'><NavItem eventKey={1} className="navigationLinks navHomeLink"><span className="fa fa-home fa-2x navHomeLink"></span></NavItem></LinkContainer>
            <LinkContainer to='/addquote'><NavItem eventKey={2} className="navigationLinks">Add Quote</NavItem></LinkContainer>
            <LinkContainer to='/quotes'><NavItem eventKey={3} className="navigationLinks"><span className="fa fa-search"></span>&nbsp;Search</NavItem></LinkContainer>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} className="navigationLinks navigationLinkLogout">{logOutButton}</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.quoteCatcherReducer.authToken
});

export default connect(mapStateToProps)(NavBar);