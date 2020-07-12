import React, { Component } from 'react';

import GeneralBanner from './GeneralBanner';

class Banner3 extends Component {
  render() {
    const { editable, id } = this.props;
    return (
      <GeneralBanner type={3} key={id} editable={editable} {...this.props} />
    );
  }
}

export default Banner3;
