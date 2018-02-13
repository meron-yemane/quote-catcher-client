import React from 'react';

export default class InputQuoteSearch extends React.Component {
  render() {
    const Element = this.props.element || 'input';
    let input;
    let error;
    if (this.props.meta.touched && this.props.meta.error) {
      error = <div className="form-error">{this.props.meta.error}</div>;
    }

    let warning;
    if (this.props.meta.touched && this.props.meta.warning) {
      warning = (
        <div className="form-warning">{this.props.meta.warning}</div>
      );
    }
    if (this.props.input.name === "theme") {
      input = <div className="form-input">
        <label htmlFor={this.props.input.name}>
          {this.props.label}
          {error}
          {warning}
        </label>
        <Element
          {...this.props.input}
          id={this.props.input.name}
          type={this.props.type}
          ref={input => (this.input = input)}
          // placeholder={"Search Theme"}
        />
      </div>
    }
    if (this.props.input.name === "author") {
      input = <div className="form-input">
        <label htmlFor={this.props.input.name}>
          {this.props.label}
          {error}
          {warning}
        </label>
        <Element
          {...this.props.input}
          id={this.props.input.name}
          type={this.props.type}
          ref={input => (this.input = input)}
          // placeholder={"Search Author"}
        />
      </div>
    }
    if (this.props.input.name === "quoteString") {
      input = <div className="form-input">
        <label htmlFor={this.props.input.name}>
          {this.props.label}
          {error}
          {warning}
        </label>
        <Element
          className="quoteStringSearchInput"
          {...this.props.input}
          id={this.props.input.name}
          type={this.props.type}
          ref={input => (this.input = input)}
        />
      </div>
    }

    return (
      <div>
        {input}
      </div>
    );
  }
}