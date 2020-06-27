import React, { Component } from 'react';
import CreateEvent from '../containers/event/manageEvent/CreateEvent';

export default class UserEventPage extends Component {
  render() {
    const { match } = this.props;
    return (
      <div>
        <CreateEvent match={match} />
      </div>
    );
  }
}
