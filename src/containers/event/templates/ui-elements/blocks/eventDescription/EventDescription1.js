import React, { Component } from 'react';

import EventDescription from './EventDescription';

class EventDescription1 extends Component {
  render() {
    const { editable, id } = this.props;
    return (
      <EventDescription type={1} editable={editable} key={id} {...this.props} />
    );
  }
}

export default EventDescription1;
