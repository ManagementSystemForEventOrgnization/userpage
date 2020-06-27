import React, { Component } from 'react';
import { connect } from 'react-redux';

import EventDetail from '../containers/event/EventDetail';
import Header from 'containers/share/_layout/Header';
import NotFoundPage from './NotFoundPage';

class EventDetailPage extends Component {
  render() {
    const { errMessage, pending } = this.props;
    return (
      <>
        {errMessage && !pending ? (
          <NotFoundPage />
        ) : (
          <div>
            <Header />
            <EventDetail {...this.props}></EventDetail>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  errMessage: state.event.errMessage,
  pending: state.event.pending,
});

export default connect(mapStateToProps, null)(EventDetailPage);
