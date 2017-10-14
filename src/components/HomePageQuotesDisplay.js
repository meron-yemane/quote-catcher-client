import React from 'react';
import {connect} from 'react-redux';
import './HomePageQuotesDisplay.css';

export class HomePageQuotesDisplay extends React.Component {
  render() {
    console.log("quotes store: " + this.props.quotes);
    return (
      <div>
       {JSON.stringify(this.props.quotes)}
      </div>
    )
  }
}

const mapStateToProps = state => console.log("state:", state) || ({ 
  quotes: state.quoteCatcherReducer.quotesToDisplay
});

export default connect(mapStateToProps)(HomePageQuotesDisplay);