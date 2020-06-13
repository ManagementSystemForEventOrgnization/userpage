import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { eventActions } from 'action/event.action';

class Timeline extends Component {
  render() {
    const { session } = this.props;
    return (
      <div className=" p-3">
        {session.map((ss) => (
          <div className="child-block mt-2 mb-2">
            <h6>Session {moment(ss.day).format('LLLL')}</h6>
            {ss.detail.length > 0 ? (
              <Timeline mode="left" key={ss.id}>
                {ss.detail.map((item) => (
                  <Timeline.Item label={`From ${item.from} to ${item.to}`}>
                    {item.description}
                  </Timeline.Item>
                ))}
              </Timeline>
            ) : (
              <p>This session doesn't have Timeline</p>
            )}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  session: state.event.session,
});

const mapDispatchToProps = (dispatch) => ({
  storeBlocksWhenCreateEvent: (blocks) =>
    dispatch(eventActions.storeBlocksWhenCreateEvent(blocks)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
