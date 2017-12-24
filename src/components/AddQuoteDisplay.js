import React from 'react';
import {connect} from 'react-redux';
import './AddQuoteDisplay.css';

export class AddQuoteDisplay extends React.Component {
  render() { 
    if (this.props.addQuoteDisplay.length !== 0) {
      let themeCounter = 0; 
      let themesToDisplay = [];
      const themes = this.props.addQuoteDisplay.theme.map((theme, index) => {
        if (themeCounter + 1 === this.props.addQuoteDisplay.theme.length) {
          themesToDisplay.push(<h3 key={index} className="addQuoteDisplayThemes">{theme}</h3>)
        } else {
          themesToDisplay.push(<h3 key={index} className="addQuoteDisplayThemes">{theme}<span>,&nbsp;</span></h3>)
        }
        themeCounter += 1
      });
      return (
        <section className="addQuoteSuccessSection">
          <h2 className="quoteText"><span>&ldquo;</span>{this.props.addQuoteDisplay.quoteString}<span>&rdquo;</span></h2>
          <h4 className="searchResultsAuthor"><span>- </span>{this.props.addQuoteDisplay.author}</h4>
          <div>
            <h3>Theme(s): {themesToDisplay}</h3>
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