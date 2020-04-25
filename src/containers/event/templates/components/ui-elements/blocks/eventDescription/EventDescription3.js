import React, { Component } from 'react'

import EventDescription from './EventDescription';

class EventDescription3 extends Component {

    render() {
        const { editable } = this.props;
        return (
            <EventDescription type={3} editable={editable} />

        )
    }
}

export default EventDescription3
