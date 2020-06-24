import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Timeline, Modal } from 'antd';
import { DeleteTwoTone, ClockCircleOutlined } from '@ant-design/icons';

import { eventActions } from 'action/event.action';
import { iconStyle, titleBlockStyle } from '../../../constants/atom.constant';

import IconsHandle from '../../shares/IconsHandle';
import EditText from '../../shares/EditText';
import PaddingAndMargin from '../../shares/PaddingAndMargin';
import ChangeColorModal from '../../shares/ChangeColorModal';

class TimelineBlock extends Component {
  constructor(props) {
    super(props);
    const { style, session } = props;
    this.state = style
      ? { ...style }
      : {
          session,
          margin: [1, 1, 1, 1],
          padding: [1, 1, 1, 1],
          background: 'none',
          fontSize: props.newStyle
            ? props.newStyle.fontSize
              ? props.newStyle.fontSize
              : 15
            : 15,

          letterSpacing: 0,
          textAlign: props.newStyle
            ? props.newStyle.textAlign
              ? props.newStyle.textAlign
              : 'left'
            : 'left',
          transform: ' ',
          color: props.newStyle
            ? props.newStyle.color
              ? props.newStyle.color
              : 'black'
            : 'black',
          fontWeight: props.newStyle
            ? props.newStyle.fontWeight
              ? props.newStyle.fontWeight
              : 'normal'
            : 'normal',
        };
  }

  openModal = () => {
    this.setState({
      visible: true,
    });
  };

  closeModal = () => {
    this.setState({
      visible: false,
    });
    this.handleStoreBlock();
  };

  onChangeValue(newValue, valueParam) {
    this.setState({
      [valueParam]: newValue,
    });
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

      setTimeout(this.handleStoreBlock(), 1000);
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

    const {
      margin,
      padding,
      background,
      fontSize,
      lineText,
      letterSpacing,
      textAlign,
      transform,
      color,
      fontWeight,
      visible,
    } = this.state;

    const divStyle = {
      marginTop: `${margin[0]}%`,
      marginLeft: `${margin[1]}%`,
      marginRight: `${margin[2]}%`,
      marginBottom: `${margin[3]}%`,
      paddingTop: `${padding[0]}%`,
      paddingLeft: `${padding[1]}%`,
      paddingRight: `${padding[2]}%`,
      paddingBottom: `${padding[3]}%`,
      color: color,
      wordBreak: 'break-word',
      alignContent: 'center',
      background: background,
      fontSize: `${fontSize}px`,
      lineHeight: `${lineText}%`,
      letterSpacing: letterSpacing,
      textAlign: textAlign,
      textTransform: transform,
      fontWeight: fontWeight,
      width: '100 %',
    };

    return (
      <div className="child-block  p-5">
        <h2 style={titleBlockStyle}>Timeline</h2>
        <div className="d-flex" style={divStyle}>
          <div className="p-5 flex-fill">
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

        <Modal
          title="Edit Timline"
          visible={visible}
          onOk={this.closeModal}
          onCancel={this.closeModal}
          width={700}
          //   className={'float-right mr-3 mt-3'}
        >
          <EditText
            fontSize={fontSize}
            lineText={lineText}
            letterSpacing={letterSpacing}
            handleChangeFontSize={(value) =>
              this.onChangeValue(value, 'fontSize')
            }
            handleChangeLetterSpacing={(value) =>
              this.onChangeValue(value, 'letterSpacing')
            }
            handleChangeLineHeight={(value) =>
              this.onChangeValue(value, 'lineText')
            }
            handleChangeTextAlign={(value) =>
              this.onChangeValue(value, 'textAlign')
            }
            handleChangeTextTransform={(value) =>
              this.onChangeValue(value, 'transform')
            }
          />
          <div className="mt-5 pl-2">
            <PaddingAndMargin
              padding={padding}
              margin={margin}
              handleChangeMargin={(value) =>
                this.onChangeValue(value, 'margin')
              }
              handleChangePadding={(value) =>
                this.onChangeValue(value, 'padding')
              }
            />
          </div>

          <div className="d-flex mt-5 pl-2">
            <ChangeColorModal
              title="Change Text Color"
              color={color}
              handleChangeColor={(value) => this.onChangeValue(value, 'color')}
            />
            <ChangeColorModal
              title="Change background"
              color={background}
              handleChangeColor={(value) =>
                this.onChangeValue(value, 'background')
              }
            />
          </div>
        </Modal>
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
