import React, { Component } from 'react';

import GeneralBanner from './GeneralBanner';

class Banner3 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { editable } = this.props;
    return <GeneralBanner type={3} editable={editable} {...this.props} />;
  }
}

export default Banner3;
