import React, { Component } from 'react';
import GeneralCard from './card';

class card1 extends Component {
  render() {
    const { id } = this.props;
    return <GeneralCard {...this.props} type={1} key={id} />;
  }
}

export default card1;
