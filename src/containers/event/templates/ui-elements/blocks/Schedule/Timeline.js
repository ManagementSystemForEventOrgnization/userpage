import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Timeline } from 'antd';
import { DeleteTwoTone, ClockCircleOutlined } from '@ant-design/icons';

import { eventActions } from 'action/event.action';
import { iconStyle, titleBlockStyle } from '../../../constants/atom.constant';
import IconsHandle from '../../shares/IconsHandle';

class TimelineBlock extends Component {
  constructor(props) {
    super(props);
    const { style, session } = props;
    this.state = style
      ? { ...style }
      : {
          padding: [1, 1, 1, 1],
          session,
        };
  }

  handleDeleteSS = (id) => {
    const { session } = this.state;
    const index = session.findIndex((item) => item.id === id);
    if (index !== -1) {
      const newSS = [
        ...session.slice(0, index),
        ...session.slice(index + 1, session.length),
      ];
      this.setState({
        session: newSS,
      });

      setTimeout(this.handleStoreBlock(), 3000);
    }
  };

  handleStoreBlock = () => {
    const { blocks, storeBlocksWhenCreateEvent, id } = this.props;
    const currentStyle = this.state;

    let item = blocks.find((ele) => ele.id === id);

    if (item) {
      const index = blocks.indexOf(item);
      item.style = currentStyle;
      storeBlocksWhenCreateEvent([
        ...blocks.slice(0, index),
        item,
        ...blocks.slice(index + 1, blocks.length),
      ]);
    }
  };

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
    const { editable } = this.props;
    const { session } = this.state;

    return (
      <div className="child-block d-flex ">
        <div className="p-5 flex-fill">
          <h2 style={titleBlockStyle}>Timeline</h2>

          {session &&
            session.map((ss) => (
              <div key={ss.id} className="d-flex">
                <div className="child-block mt-3 mb-5 p-5 shadow-sm flex-fill ">
                  <h6>
                    Session {ss.name} : {moment(ss.day).format('LLLL')}
                  </h6>

                  {ss.detail.length !== 0 ? (
                    <Timeline mode="left" key={ss.id} className="mt-5">
                      <Timeline.Item
                        dot={
                          <ClockCircleOutlined style={{ fontSize: '20px' }} />
                        }
                        color="red"
                      >
                        Start
                      </Timeline.Item>
                      {ss.detail.map((item) => (
                        <Timeline.Item
                          label={`From ${item.from} to ${item.to}`}
                          key={item.id}
                        >
                          {item.description}
                        </Timeline.Item>
                      ))}
                      <Timeline.Item
                        dot={
                          <ClockCircleOutlined style={{ fontSize: '20px' }} />
                        }
                        color="red"
                        label="Finish"
                      ></Timeline.Item>
                    </Timeline>
                  ) : (
                    <p>This session doesn't have Timeline</p>
                  )}
                </div>

                {editable && (
                  <div className="ml-auto icons-handle d-flex flex-column justify-content-around">
                    <DeleteTwoTone
                      style={iconStyle}
                      onClick={() => this.handleDeleteSS(ss.id)}
                    />
                  </div>
                )}
              </div>
            ))}
        </div>

        {editable && (
          <IconsHandle
            collapseModal={this.openModal}
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
  blocks: state.event.blocks,
});

const mapDispatchToProps = (dispatch) => ({
  storeBlocksWhenCreateEvent: (blocks) =>
    dispatch(eventActions.storeBlocksWhenCreateEvent(blocks)),

  deleteBlock: (id) => dispatch(eventActions.deleteBlock(id)),
  duplicateBlock: (id) => dispatch(eventActions.duplicateBlock(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TimelineBlock);
