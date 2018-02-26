import React from 'react';

export default class Input extends React.Component {
  render() {
    const Element = this.props.element || 'input';
    let error;
    let input;
    if (this.props.meta.touched && this.props.meta.error) {
      error = <div className="form-error">{this.props.meta.error}</div>;
    }
    let warning;
    if (this.props.meta.touched && this.props.meta.warning) {
      warning = (
        <div className="form-warning">{this.props.meta.warning}</div>
      );
    }
    if (this.props.input.name === "firstName") {
      input =   <div className="form-input">
        <label htmlFor={this.props.input.name}>
          {this.props.label}
          <div className="spacer"></div>
          {error}
          {warning}
        </label>
        <Element
          className="signUpFirstName"
          {...this.props.input}
          id={this.props.input.name}
          type={this.props.type}
          ref={input => (this.input = input)}
          placeholder={"First Name"}
        />
      </div>
    }

    if (this.props.input.name === "lastName") {
      input =   <div className="form-input">
        <label htmlFor={this.props.input.name}>
          {this.props.label}
          <div className="spacer"></div>
          {error}
          {warning}
        </label>
        <Element
          className="signUpLastName"
          {...this.props.input}
          id={this.props.input.name}
          type={this.props.type}
          ref={input => (this.input = input)}
          placeholder={"Last Name"}
        />
      </div>
    }

    if (this.props.input.name === "password") {
      if (error) {
        if (error.props.children === "Required") {
          input =   <div className="form-input">
            <label htmlFor={this.props.input.name}>
              {this.props.label}
              <div className="spacer"></div>
              {error}
              {warning}
            </label>
            <Element
              className="signUpUsername"
              {...this.props.input}
              id={this.props.input.name}
              type={this.props.type}
              ref={input => (this.input = input)}
              placeholder={"Password"}
            />
          </div>
        } else {
          input =   <div className="form-input">
            <label htmlFor={this.props.input.name}>
              {this.props.label}
              <div className="spacerMinimumChar"></div>
              {error}
              {warning}
            </label>
            <Element
              className="passwordCon"
              {...this.props.input}
              id={this.props.input.name}
              type={this.props.type}
              ref={input => (this.input = input)}
              placeholder={"Password"}
            />
          </div>
        }
      } else {
        input =   <div className="form-input">
          <label htmlFor={this.props.input.name}>
            {this.props.label}
            <div className="spacerMinimumChar"></div>
            {error}
            {warning}
          </label>
          <Element
            className="passwordCon"
            {...this.props.input}
            id={this.props.input.name}
            type={this.props.type}
            ref={input => (this.input = input)}
            placeholder={"Password"}
          />
        </div>
      }
    }

    if (this.props.input.name === "passwordConfirm") {
      if (error) {
        if (error.props.children === "Required") {
          input =   <div className="form-input">
            <label htmlFor={this.props.input.name}>
              {this.props.label}
              <div className="spacer"></div>
              {error}
              {warning}
            </label>
            <Element
              className="signUpUsername"
              {...this.props.input}
              id={this.props.input.name}
              type={this.props.type}
              ref={input => (this.input = input)}
              placeholder={"Confirm Password"}
            />
          </div>
      } else {
        input =   <div className="form-input">
          <label htmlFor={this.props.input.name}>
            {this.props.label}
            <div className="spacerDoesNotMatch"></div>
            {error}
            {warning}
          </label>
          <Element
            className="passwordMatch"
            {...this.props.input}
            id={this.props.input.name}
            type={this.props.type}
            ref={input => (this.input = input)}
            placeholder={"Confirm Password"}
          />
        </div>
        }
      } else {
        input =   <div className="form-input">
          <label htmlFor={this.props.input.name}>
            {this.props.label}
            <div className="spacerDoesNotMatch"></div>
            {error}
            {warning}
          </label>
          <Element
            className="passwordMatch"
            {...this.props.input}
            id={this.props.input.name}
            type={this.props.type}
            ref={input => (this.input = input)}
            placeholder={"Confirm Password"}
          />
        </div>
      }
    }

    if (this.props.input.name === "username") {
      input =   <div className="form-input">
        <label htmlFor={this.props.input.name}>
          {this.props.label}
          <div className="spacer"></div>
          {error}
          {warning}
        </label>
        <Element
          className="signUpUsername"
          {...this.props.input}
          id={this.props.input.name}
          type={this.props.type}
          ref={input => (this.input = input)}
          placeholder={"Username"}
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