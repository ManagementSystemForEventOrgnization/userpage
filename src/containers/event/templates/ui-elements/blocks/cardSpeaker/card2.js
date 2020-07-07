import React, { Component } from 'react';
import GeneralCard from './card';

class card2 extends Component {
  render() {
    const { id } = this.props;
    return <GeneralCard {...this.props} type={2} key={id} />;
  }
}

export default card2;
