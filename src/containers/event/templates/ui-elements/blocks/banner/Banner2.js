import React, { Component } from 'react';

import GeneralBanner from './GeneralBanner';

class Banner2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { editable } = this.props;
    return <GeneralBanner type={2} editable={editable} {...this.props} />;
  }
}

export default Banner2;
