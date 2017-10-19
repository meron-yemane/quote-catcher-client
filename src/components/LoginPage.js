import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from "react-router-dom"
import NavBar from './NavBar';
import WelcomeMessage from './WelcomeMessage';
import LoginForm from './LoginForm';
import {addQuotesToLandingPage} from '../actions/index';
import {API_BASE_URL} from '../config';
import HomePageQuotesDisplay from './HomePageQuotesDisplay';

export function LandingPage(props) {
  if (props.logginIn) {
    return <Redirect to="/" />
  }

  return (
    <div className="home">
      <h2>Welcome to QuoteCatcher!</h2>
      <LoginForm />
      <Link to="/register">Register</Link>
    </div>
  );
}
  // addQuotesToLandingPage(quotes) {
  //   this.props.dispatch(addQuotesToLandingPage(quotes))
  // }

  // handleLoad() {
  //   console.log("Inside handleload")
  //   return fetch(`${API_BASE_URL}/api/quotes/all`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer ' + localStorage.getItem('access_token')
  //     }
  //   })
  //   .then(res => {
  //     if (!res.ok) {
  //       if (
  //         res.headers.has('content-type') &&
  //         res.headers
  //           .get('content-type')
  //           .startsWith('application/json')
  //       ) {
  //         return res.json().then(err => Promise.reject(err));
  //       }
  //       return Promise.reject({
  //         code: res.status,
  //         message: res.statusText
  //       });
  //     }
  //     return res
  //   })
  //   .then(response => {
  //     return response.json()
  //   })
  //   .then(responses => {
  //     return responses
  //   })
  //   .then(res => {
  //     return this.addQuotesToLandingPage(res)
  //   })
  // }

//   render() {
//     var landingPage;
//     if (!this.props.showLandingPage) {
//       landingPage = <LoginForm />;
//     } else {
//       landingPage = <HomePageQuotesDisplay onpageshow={() => this.handleLoad()} />;
//     }
//     return (
//       <div>
//         <NavBar />
//         {landingPage}
//       </div> 
//     );
//   }
// }


const mapStateToProps = state => ({
  logginIn: state.quoteCatcherReducer.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);