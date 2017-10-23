import React from 'react';
import {connect} from 'react-redux';
import './AddQuoteDisplay.css';

export class AddQuoteDisplay extends React.Component {
  render() {
    if (this.props.addQuoteDisplay.length !== 0) {
      console.log(this.props.addQuoteDisplay)
      return (
        <section>
          <h2 className="quoteText"><span>"</span>{this.props.addQuoteDisplay.quoteString}<span>"</span></h2>
          <h4 className="searchResultsAuthor"><span>- </span>{this.props.addQuoteDisplay.author}</h4>
          <div>
            <h3>Theme(s): {this.props.addQuoteDisplay.theme}</h3>
          </div>
        </section>
      )
    }
    return (
      <div>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  addQuoteDisplay: state.quoteCatcherReducer.addQuoteDisplay
});

export default connect(mapStateToProps)(AddQuoteDisplay);