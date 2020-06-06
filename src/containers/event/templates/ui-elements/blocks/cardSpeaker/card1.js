import React, { Component } from 'react';
import GeneralCard from './card';

class card1 extends Component {
  render() {
    return <GeneralCard {...this.props} type={1} />;
  }
}

export default card1;
