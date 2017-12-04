import React from 'react';

export default class Input extends React.Component {
  render() {
    const Element = this.props.element || 'input';

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
    console.log(this.props.input.name)
    return (
      <div className="form-input">
        <label htmlFor={this.props.input.name}>
          {this.props.label}
          <div className="spacer"></div>
          {error}
          {warning}
        </label>
        <Element
          {...this.props.input}
          id={this.props.input.name}
          type={this.props.type}
          ref={input => (this.input = input)}
          placeholder={this.props.input.name.charAt(0).toUpperCase() + this.props.input.name.slice(1)}
        />
      </div>
    );
  }
}