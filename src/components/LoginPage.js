import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from "react-router-dom";
import LoginForm from './LoginForm';
import './LoginPage.css';
import 'bootstrap/dist/css/bootstrap.css';

export function LandingPage(props) {
  if (props.loggedIn) {
    return <Redirect to="/" />;
  }

  return (
  <div>
    <nav className="logInNav">
      <a className="logInAnchorTag" href="#scrollToLogin">
        Login
      </a>
      <Link to="/register" className="logInAnchorTag signUpAnchorTag">Sign Up</Link>
    </nav>
    <div className="home">
      <h2 className="logoTitleLoginPage">QuoteCatcher</h2>
      <h3 className="logoDescriptionLoginPage">life's quotes, captured and organized conveniently</h3>
      <section>
        <div className="aboutCardContainer">
          <div className="aboutCard">
            <i className="fa fa-pencil fa-5x aboutCardImg" aria-hidden="true"></i>
            <h3 className="aboutCardTitle">Jot Down Quotes</h3>
            <hr className="shortLine cardsLine"/>
            <p className="aboutCardDescription">Ever have trouble storing interesting or inspirational
            quotes? Look no further! QuoteCatcher gives you an easy and accessible way to 
            keep track of anything jot down worthy.
            </p>
          </div>

          <div className="aboutCard">
            <i className="fa fa-folder-open-o fa-5x aboutCardImg" aria-hidden="true"></i>
            <h3 className="aboutCardTitle">Organize Your Quotes</h3>
            <hr className="shortLine cardsLine"/>
            <p className="aboutCardDescription">Organize quotes by theme so you can have them handy just
            for that special occasion. QuoteCatcher also allows you to search by author and quote passage. 
            </p>
          </div>
        </div>
      </section>
      <section>
        <a id="scrollToLogin"><span className="anchorToHide">War and Peace </span></a>
        <div className="loginSection">
              <h2 className="loginTitle">Login</h2>
              <div className="LoginBox">
                <LoginForm />
                <Link to="/register">Not a member? Click here to sign-up!</Link>
                <h4 className="demoUserHeader">Demo User Account</h4>
                <p className="demoUserAccountLogin">Username: abc&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Password: demouser</p>
              </div>
        </div>
      </section>
    </div>
  </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.quoteCatcherReducer.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);