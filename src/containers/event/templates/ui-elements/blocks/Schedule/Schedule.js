import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Modal, Button } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import moment from 'moment';

import EditText from '../../shares/EditText';
import IconsHandle from '../../shares/IconsHandle';
import TextsBlock from '../../atoms/Text';
import PaddingAndMargin from '../../shares/PaddingAndMargin';
import ChangeColorModal from '../../shares/ChangeColorModal';

import { eventActions } from 'action/event.action';
import { ScheduleState } from '../../stateInit/ScheduleState';
import { applyEventAction } from 'action/applyEvent';

class Schedule1 extends Component {
  constructor(props) {
    super(props);
    const { style } = this.props;
    this.state = style
      ? { ...style }
      : {
          ...ScheduleState(this.props, 1),
          apply: false,
        };
  }

  //show modal
  showModal = () => {
    const { visible } = this.state;
    this.setState({
      visible: !visible,
    });
  };

  onClickAddSchedule = (id) => {
    const { scheduleText } = this.state;
    const item = scheduleText.find((ele) => ele.id === id);

    scheduleText.push({
      id: uuid(),
      time: item.time,
      title: item.title,
      description: item.description,
    });
    this.setState({
      scheduleText,
    });
  };

  onChangeValue(newValue, valueParam) {
    this.setState({
      [valueParam]: newValue,
    });
    setTimeout(this.handleStoreBlock(), 3000);
  }

  removeOption = (schedule) => {
    const scheduleText = this.state.scheduleText.filter(
      (e) => e.id !== schedule.id
    );
    this.setState({
      scheduleText,
    });
  };

  handleUpdateSchedule = (idItem, content, newParam) => {
    const { scheduleText } = this.state;
    let item = scheduleText.find((ele) => ele.id === idItem);
    const index = scheduleText.indexOf(item);
    item[`${newParam}`] = content;

    if (index === -1) return;
    else {
      this.setState({
        scheduleText: [
          ...scheduleText.slice(0, index),
          item,
          ...scheduleText.slice(index + 1, scheduleText.length),
        ],
      });
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

  isApplied = (idSession) => {
    const { content } = this.state;
    const index = content.findIndex((item) => item.id === idSession);
    return content[index].status && content[index].status === 'JOINED' ? 1 : 0;
  };

  changeLoadingSS = (idSession) => {
    let { content } = this.state;
    let index = content.findIndex((ss) => ss.id === idSession);

    if (index !== -1) {
      content[index].pending = !content[index].pending;
      this.setState({ content });
    }
  };

  changeStatusSS = (idSession, status) => {
    let { content } = this.state;
    let index = content.findIndex((ss) => ss.id === idSession);

    if (index !== -1) {
      content[index].status = status ? 'JOINED' : 'CANCEL';
      content[index].pending = false;
      this.setState({ content });
    }
  };

  handleClickButton = (ssId) => {
    const { handleApply, handleCancel, eventId } = this.props;
    const temp = [];
    temp.push(ssId);

    if (this.isApplied(ssId)) {
      this.changeLoadingSS(ssId);
      handleCancel(eventId, temp)
        .then((res) => {
          this.changeStatusSS(ssId, 0);
        })
        .catch((err) => {
          this.changeLoadingSS(ssId);
        });
    } else {
      this.changeLoadingSS(ssId);
      handleApply(eventId, temp)
        .then((res) => this.changeStatusSS(ssId, 1))
        .catch((err) => this.changeLoadingSS(ssId));
    }
  };

  render() {
    // need to refactor
    const {
      margin,
      padding,
      background,
      fontSize,
      fonts,
      lineText,
      letterSpacing,
      textAlign,
      transform,
      color,
      fontWeight,
      scheduleName,
      content,
      visible,
    } = this.state;
    const { key, editable, leftModal, isSellTicket } = this.props;
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
      fontFamily: fonts,
      lineHeight: `${lineText}%`,
      letterSpacing: letterSpacing,
      textAlign: textAlign,
      textTransform: transform,
      fontWeight: fontWeight,
      width: '100 %',
    };

    const titleStyle = {
      fontWeight: 'bold',
      fontSize: '20px',
      color: 'blue',
    };

    const calendar = {
      border: 'brown solid 1px',
      width: '83px',
      height: '90px',
      textAlign: 'center',
      fontSize: '13px',
      fontWeight: 'bold',
    };

    const monthStyle = {
      background: 'red',
      fontWeight: 'bolder',
    };

    return (
      <div className="child-block " key={key}>
        <TextsBlock
          content={scheduleName}
          child={true}
          newStyle={{ fontWeight: 'bold' }}
        />
        <div style={divStyle}>
          {content.map((ss) => (
            <div className="row child-block" style={divStyle} key={ss.id}>
              <div className="col-3 col-md-3">
                <div style={calendar} className="mb-2 p-1">
                  <p style={monthStyle} className="p-1">
                    {moment(ss.time).format('MMM')}
                  </p>
                  <p>{moment(ss.time).format('D')}</p>
                  <p>{moment(ss.time).format('dddd')}</p>
                </div>
              </div>

              <div className="col-6 col-md-6">
                <div style={titleStyle}>{ss.name}</div>

                <div className="mt-4">{ss.location}</div>
              </div>
              <div className="col-3 col-md-3">
                <div>{`Limit number : ${ss.limitNumber}`}</div>

                <Button
                  icon={<CalendarOutlined />}
                  type="primary"
                  className="mt-2"
                  loading={ss.pending}
                  onClick={() => this.handleClickButton(ss.id)}
                >
                  {this.isApplied(ss.id)
                    ? 'Cancel'
                    : isSellTicket
                    ? 'Buy Ticket'
                    : 'Register free'}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {editable && (
          <IconsHandle
            collapseModal={this.showModal}
            handleDuplicate={this.handleDuplicate}
            handleDelete={this.handleDelete}
          />
        )}

        <Modal
          title="Edit Schedule"
          visible={visible}
          onOk={this.showModal}
          onCancel={this.showModal}
          width={700}
          className={
            leftModal ? ' mt-3 float-left ml-5' : 'float-right mr-3 mt-3'
          }
          style={leftModal ? { top: 40, left: 200 } : { top: 40 }}
        >
          <EditText
            fonts={fonts}
            fontSize={fontSize}
            lineText={lineText}
            letterSpacing={letterSpacing}
            handleChangeFonts={(value) => this.onChangeValue(value, 'fonts')}
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
  blocks: state.event.blocks,
  isSellTicket: state.event.isSellTicket,
  session: state.event.session,
  eventId: state.event.id,
});

const mapDispatchToProps = (dispatch) => ({
  storeBlocksWhenCreateEvent: (blocks) =>
    dispatch(eventActions.storeBlocksWhenCreateEvent(blocks)),
  deleteBlock: (id) => dispatch(eventActions.deleteBlock(id)),
  duplicateBlock: (id) => dispatch(eventActions.duplicateBlock(id)),

  handleApply: (eventId, sessionIds) =>
    dispatch(applyEventAction.applyEvent(eventId, sessionIds)),
  handleCancel: (eventId, sessionIds) =>
    dispatch(applyEventAction.cancelEvent(eventId, sessionIds)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Schedule1);
