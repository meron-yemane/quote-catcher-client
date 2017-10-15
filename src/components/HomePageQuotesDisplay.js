import React from 'react';
import {connect} from 'react-redux';
import './HomePageQuotesDisplay.css';

export class HomePageQuotesDisplay extends React.Component {
  render() {
    console.log("quotes store: " + this.props.quotes[0][0]);
    return (
      <div>

      </div>
    )
  }
}

const mapStateToProps = state => ({ 
  quotes: state.quoteCatcherReducer.quotes
});

export default connect(mapStateToProps)(HomePageQuotesDisplay);