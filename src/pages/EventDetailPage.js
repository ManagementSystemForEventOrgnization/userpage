import React, { Component } from 'react';
import { connect } from 'react-redux';

import EventDetail from '../containers/event/EventDetail';
import Header from 'containers/share/_layout/Header';
import NotFoundPage from './NotFoundPage';

class EventDetailPage extends Component {
  render() {
    const { errMessage } = this.props;
    return (
      <>
        {errMessage ? (
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
});

export default connect(mapStateToProps, null)(EventDetailPage);
