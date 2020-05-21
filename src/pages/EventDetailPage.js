import React, { Component } from 'react';
import EventDetail from '../containers/event/EventDetail';
import Header from '../containers/share/_layout/Header';

export default class EventDetailPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <EventDetail></EventDetail>
      </div>
    );
  }
}
