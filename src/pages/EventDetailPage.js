import React, { Component } from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';

import EventDetail from '../containers/event/EventDetail';
import NotFoundPage from './NotFoundPage';
import { eventActions } from 'action/event.action';

class EventDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      webAddress:
        props.match.match.params.id || localStorage.getItem('webAddress'),
    };
  }

  componentDidMount = () => {
    const {
      getEventDetail,
      getComment,
      handleGetEventInfo,
      currentIndex,
      match,
    } = this.props;
    const { webAddress } = this.state;
    const { name } = match.match.params;

    const index = !name ? 0 : currentIndex;
    const isLogined = localStorage.getItem('isLogined');

    if (isLogined) {
      getEventDetail(webAddress, index).then((eventId) => {
        handleGetEventInfo(eventId, () => { });
        getComment(eventId);
      });
    } else {
      getEventDetail(webAddress, index).then((eventId) => {
        getComment(eventId);
      });
    }
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.currentIndex !== this.props.currentIndex) {
      const { id, name } = this.props.match.match.params;
      this.props.getEventDetail(id, name ? this.props.currentIndex : 0);
    }
  };

  componentWillUnmount = () => {
    localStorage.removeItem('currentId');
    localStorage.removeItem('currentIndex');
  };

  render() {
    const { errMessage, pending } = this.props;
    return (
      <>
        {pending ? (
          <Spin
            className="loading-gif d-flex justify-content-center pt-2"
            size="large"
          />
        ) : errMessage ? (
          <NotFoundPage />
        ) : (
              <EventDetail {...this.props}></EventDetail>
            )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  errMessage: state.event.errMessage,
  pending: state.event.pendingEvent,
  //   currentPage: state.event.currentPage,
  currentIndex: state.event.currentIndex,
});

const mapDispatchToProps = (dispatch) => ({
  getEventDetail: (eventId, index) =>
    dispatch(eventActions.getEventDetail(eventId, index)),

  getComment: (eventId, pageNumber, numberRecord) =>
    dispatch(eventActions.getComment(eventId, pageNumber, numberRecord)),

  handleGetEventInfo: (eventId, cb) =>
    dispatch(eventActions.getEventInfoUsingID(eventId, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailPage);
