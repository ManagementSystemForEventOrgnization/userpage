import React, { Component } from 'react';
import GeneralCard from './card';

class card2 extends Component {
  render() {
    return <GeneralCard {...this.props} type={2} />;
  }
}

export default card2;
