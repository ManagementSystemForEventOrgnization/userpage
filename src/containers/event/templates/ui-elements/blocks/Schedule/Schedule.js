import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Modal, Button, message, Drawer } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import moment from 'moment';

import EditText from '../../shares/EditText';
import IconsHandle from '../../shares/IconsHandle';
import PaddingAndMargin from '../../shares/PaddingAndMargin';
import ChangeColorModal from '../../shares/ChangeColorModal';

import { eventActions } from 'action/event.action';
import { ScheduleState } from '../../stateInit/ScheduleState';
import { applyEventActions } from 'action/applyEvent';
import { titleBlockStyle } from '../../../constants/atom.constant';
import CreditCard from 'containers/user/BankAccount/CreditCard';

class Schedule1 extends Component {
  constructor(props) {
    super(props);
    const { style } = this.props;
    this.state = style
      ? { ...style }
      : {
          ...ScheduleState(this.props, 1),
          apply: false,
          openDrawer: false,
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

  warning = (msg) => {
    message.warning(msg || 'OPPs! Something is wrong');
  };

  success = (isApplied) => {
    message.success(`${isApplied ? 'Apply' : 'Cancel'} session successfully`);
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

  handleSuccess = (type, ssId) => {
    this.success(type);
    this.changeStatusSS(ssId, type);
  };

  handleFailure = (ssId, err) => {
    if (err.response) {
      const { data } = err.response;
      this.warning(data.error.message);
    } else this.warning();
    this.changeLoadingSS(ssId);
  };

  handleClickButton = (ssId) => {
    const { handleApply, handleCancel, eventId } = this.props;
    const temp = [];
    temp.push(ssId);

    if (this.isApplied(ssId)) {
      this.changeLoadingSS(ssId);

      handleCancel(eventId, temp)
        .then((res) => {
          this.handleSuccess(0, ssId);
        })
        .catch((err) => {
          this.handleFailure(ssId, err);
        });
    } else {
      const { ticket } = this.props;
      if (ticket.price !== 0) {
        this.setState({
          openDrawer: true,
          currSsId: ssId,
        });
      } else {
        this.changeLoadingSS(ssId);

        handleApply(eventId, temp)
          .then((res) => {
            this.handleSuccess(1, ssId);
          })
          .catch((err) => {
            this.handleFailure(ssId, err);
          });
      }
    }
  };

  handleCloseDrawer = () => {
    this.setState({
      openDrawer: false,
    });
  };

  render() {
    // need to refactor
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
      content,
      visible,
      openDrawer,
      currSsId,
    } = this.state;

    const { key, editable, leftModal, ticket, eventId } = this.props;

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

    const titleStyle = {
      fontWeight: 'bold',
      fontSize: '20px',
      color: 'blue',
    };

    const calendar = {
      border: '#f7bdbd solid 1px',
      width: '83px',
      height: '90px',
      textAlign: 'center',
      fontSize: '15px',
      fontWeight: 'bold',
      borderRadius: '3px',
    };

    const monthStyle = {
      background: 'red',
      fontWeight: 'bolder',
      borderRadius: '3px',
    };

    return (
      <div className="p-5 child-block" key={key}>
        <h2 style={titleBlockStyle}>Sessions</h2>
        <div className="d-flex">
          <div style={divStyle} className="flex-fill">
            {content.map((ss) => (
              <div
                className="row child-block p-3 shadow-sm mt-2 mb-3"
                style={divStyle}
                key={ss.id}
              >
                <div className="col-3 col-md-3">
                  <div style={calendar} className="mb-2 p-1">
                    <p style={monthStyle} className="p-1">
                      {moment(ss.time).format('MMM')}
                    </p>
                    <p>{moment(ss.time).format('D')}</p>
                    <p style={{ fontSize: '13px' }}>
                      {moment(ss.time).format('dddd')}
                    </p>
                  </div>
                </div>

                <div className="col-6 col-md-6">
                  <div style={titleStyle}>{ss.name}</div>

                  <p className="mt-4" style={{ fontSize: '14px' }}>
                    {ss.location}
                  </p>
                </div>
                <div className="col-3 col-md-3">
                  <p
                    style={{ fontSize: '14px' }}
                  >{`Limit number : ${ss.limitNumber}`}</p>

                  <Button
                    icon={<CalendarOutlined />}
                    type="primary"
                    className="mt-2"
                    loading={ss.pending}
                    onClick={() => this.handleClickButton(ss.id)}
                  >
                    {this.isApplied(ss.id)
                      ? 'Cancel this session'
                      : ticket.price !== 0
                      ? 'Buy Ticket'
                      : 'Register free'}
                  </Button>
                </div>
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

        <Drawer
          title="Payment transaction"
          width={780}
          closable={false}
          onClose={this.handleCloseDrawer}
          visible={openDrawer}
        >
          <h6>Let's complete some last steps.</h6>
          <p>
            You have to pay{' '}
            <b
              style={{
                fontSize: '17px',
                color: 'blue',
                fontWeight: 'bolder',
                textShadow: '0 0 3px #fb2020',
              }}
            >
              {ticket.price - ticket.price * ticket.discount}
            </b>{' '}
            VND
          </p>
          <hr />
          <CreditCard
            currSsId={currSsId}
            eventId={eventId}
            handleFinishPayment={this.handleCloseDrawer}
            changeStatus={() => this.changeStatusSS(currSsId, 1)}
          />
        </Drawer>

        <Modal
          title="Edit Schedule"
          visible={visible}
          onOk={this.closeModal}
          onCancel={this.closeModal}
          width={700}
          className={
            leftModal ? ' mt-3 float-left ml-5' : 'float-right mr-3 mt-3'
          }
          style={leftModal ? { top: 40, left: 200 } : { top: 40 }}
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
  blocks: state.event.blocks,
  isSellTicket: state.event.isSellTicket,
  session: state.event.session,
  eventId: state.event.id,
  ticket: state.event.ticket,
});

const mapDispatchToProps = (dispatch) => ({
  storeBlocksWhenCreateEvent: (blocks) =>
    dispatch(eventActions.storeBlocksWhenCreateEvent(blocks)),
  deleteBlock: (id) => dispatch(eventActions.deleteBlock(id)),
  duplicateBlock: (id) => dispatch(eventActions.duplicateBlock(id)),

  handleApply: (eventId, sessionIds) =>
    dispatch(applyEventActions.applyEvent(eventId, sessionIds)),
  handleCancel: (eventId, sessionIds) =>
    dispatch(applyEventActions.cancelEvent(eventId, sessionIds)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Schedule1);
