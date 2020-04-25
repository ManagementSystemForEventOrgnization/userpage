import React, { Component } from 'react'

import EventDescription from './EventDescription';

class EventDescription1 extends Component {

    render() {
        const { editable } = this.props;
        return (
            <EventDescription type={1} editable={editable} />
        )
    }
}

export default EventDescription1
