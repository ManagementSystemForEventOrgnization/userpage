import React, { Component } from 'react';

import EventDescription from './EventDescription';

class EventDescription2 extends Component {
  render() {
    const { editable, id } = this.props;
    return (
      <EventDescription type={2} key={id} editable={editable} {...this.props} />
    );
  }
}

export default EventDescription2;
