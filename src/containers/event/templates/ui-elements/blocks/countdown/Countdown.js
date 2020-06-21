import React, { Component } from 'react';
// import { connect } from 'react-redux';
import Timer from '../../atoms/Timer';
export default class Countdown extends Component {
  render() {
    const { editable } = this.props;
    return (
      <div>
        <Timer
          editable={editable}
          {...this.props}
        />
      </div>
    );
  }

}


