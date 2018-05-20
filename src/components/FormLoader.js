import React from 'react';
import {connect} from 'react-redux';
import Loader from 'react-loader-spinner';
import './FormLoader.css';

export class FormLoader extends React.Component {
  render() {
    if (this.props.isFetching) {
      return (
        <div className="LoginSpinner">
          <Loader className="LoginSpinner" type="TailSpin" height={100} width={100}/>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  isFetching: state.quoteCatcherReducer.isFetching
});

export default connect(mapStateToProps)(FormLoader);