import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {fetchProtectedData} from '../actions/index'
import './HomePageQuotesDisplay.css';

export class HomePageQuotesDisplay extends React.Component {
  componentDidMount() {
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
      <div className="home-page-quotes">

      </div>
    );
  }
}

const mapStateToProps = state => ({ 
  quotes: state.quoteCatcherReducer.quotes
});

export default connect(mapStateToProps)(HomePageQuotesDisplay);