import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { eventActions } from 'action/event.action';
import IconsHandle from '../../shares/IconsHandle';

class Timeline extends Component {
  handleDuplicate = () => {
    const { id, duplicateBlock } = this.props;
    if (duplicateBlock) {
      duplicateBlock(id);
    }
  };

  handleDelete = () => {
    const { id, deleteBlock } = this.props;
    if (deleteBlock) {
      deleteBlock(id);
    }
  };

  render() {
    const { session, editable } = this.props;
    return (
      <div className="d-flex">
        {session.map((ss) => (
          <div className="child-block mt-2 mb-2" key={ss.id}>
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

        {editable && (
          <IconsHandle
            collapseModal={this.collapseModal}
            handleDuplicate={this.handleDuplicate}
            handleDelete={this.handleDelete}
          />
        )}
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
  duplicateBlock: (id) => dispatch(eventActions.duplicateBlock(id)),
  deleteBlock: (id) => dispatch(eventActions.deleteBlock(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
