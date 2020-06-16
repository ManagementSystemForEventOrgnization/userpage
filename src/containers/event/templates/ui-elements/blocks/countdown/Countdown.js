import React, { Component } from 'react';
import Timer from '../../atoms/Timer';
export default class Countdown extends Component {
  render() {
    const { editable } = this.props;
    return (
      <div>
        <Timer
          startCount={this.props.startCount}
          editable={editable}
          {...this.props}
        />
      </div>
    );
  }
}
