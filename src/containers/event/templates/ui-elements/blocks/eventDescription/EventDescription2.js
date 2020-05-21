import React, { Component } from 'react';

import EventDescription from './EventDescription';

class EventDescription2 extends Component {
  render() {
    const { editable } = this.props;
    return <EventDescription type={2} editable={editable} {...this.props} />;
  }
}

export default EventDescription2;
