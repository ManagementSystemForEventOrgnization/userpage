import React, { Component } from 'react';

import EventDescription from './EventDescription';

class EventDescription3 extends Component {
  render() {
    const { editable, id } = this.props;
    return (
      <EventDescription type={3} key={id} editable={editable} {...this.props} />
    );
  }
}

export default EventDescription3;
