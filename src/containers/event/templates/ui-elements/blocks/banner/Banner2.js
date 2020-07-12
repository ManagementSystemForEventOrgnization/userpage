import React, { Component } from 'react';

import GeneralBanner from './GeneralBanner';

class Banner2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { editable, id } = this.props;
    return (
      <GeneralBanner type={2} key={id} editable={editable} {...this.props} />
    );
  }
}

export default Banner2;
