import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {fetchProtectedData} from '../actions/index'
import './HomePageQuotesDisplay.css';
import NavBar from './NavBar';
import store from '../store';

export class HomePageQuotesDisplay extends React.Component {
  componentDidlMount() {
    if (!this.props.loggedIn) {
      return;
    }
    this.props.dispatch(fetchProtectedData());
  }

  render() {
    if (!this.props.loggedIn) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <NavBar />
      </div>
    );
  }
}

const mapStateToProps = state => ({ 
  loggedIn: state.quoteCatcherReducer.currentUser !== null,
  quotesToDisplay: state.quoteCatcherReducer.quoteToDisplay
});

export default connect(mapStateToProps)(HomePageQuotesDisplay);