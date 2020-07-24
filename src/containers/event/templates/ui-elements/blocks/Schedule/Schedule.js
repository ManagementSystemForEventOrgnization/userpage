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
import { ScheduleConstant } from '../../stateInit/ScheduleState';
import { applyEventActions } from 'action/applyEvent';
import { titleBlockStyle } from '../../../constants/atom.constant';
import TextBlock from '../../atoms/Text';
import TransferType from 'containers/user/BankAccount/TransferType';
import history from 'utils/history';
class Schedule1 extends Component {
  constructor(props) {
    super(props);
    const { style } = this.props;
    this.state = style
      ? { ...style, openDrawer: false }
      : {
          ...ScheduleConstant.ScheduleState(this.props, 1),
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

  handleChangeContent = (type, idTem, value) => {
    const { content } = this.state;
    let item = content.find((ele) => ele.id === idTem);
    const index = content.indexOf(item);
    item[`${type}`] = value;

    if (index === -1) return;
    else {
      this.setState({
        content: [
          ...content.slice(0, index),
          item,
          ...content.slice(index + 1, content.length),
        ],
      });
    }

    setTimeout(this.handleStoreBlock(), 2000);
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

  warning = (msg) => {
    message.warn({
      content: msg || 'OPPs! Something is wrong',
      style: {
        marginTop: '20vh',
        fontSize: '16px',
        fontWeight: 'bold',
      },
    });
  };

  success = (type) => {
    message.success({
      content: `${!type ? 'Apply' : 'Cancel'} session successfully`,
      style: {
        marginTop: '20vh',
        fontSize: '16px',
        fontWeight: 'bold',
      },
    });
  };

  changeLoadingSS = (idSession) => {
    let { content } = this.state;
    let index = content.findIndex((ss) => ss.id === idSession);

    if (index !== -1) {
      content[index].pending = !content[index].pending;
      this.setState({ content });
    }
  };

  handleFailure = (ssId, err) => {
    if (err.response) {
      const { data } = err.response;
      this.warning(data.error.message);
    } else this.warning();
    this.changeLoadingSS(ssId);
  };

  handleUpdateSessionStatus = () => {
    const { handleGetEventInfo, eventId } = this.props;
    // console.log('SCHEDULE: ', eventId, localStorage.getItem('currentId'));

    handleGetEventInfo(eventId, (eventInfo) => {
      if (!eventInfo) {
      } else {
        this.setState({
          content: eventInfo.session.map((item) => ({
            ...item,
            pending: false,
            status: item.status || 'error',
          })),
        });
      }
    });
  };

  onClickButton = (ssId, type) => {
    const isLogined = localStorage.getItem('isLogined');
    if (!isLogined) {
      history.push('/login');
    } else {
      const { eventId, handleCancel, handleRePay, handleApply } = this.props;
      const { content } = this.state;
      const index = content.findIndex((ss) => ss.id === ssId);

      let temp = [];
      temp.push(ssId);

      this.changeLoadingSS(ssId);

      if (type === 'APPLY') {
        const { isSellTicket } = this.props;

        if (isSellTicket === 'Yes' || isSellTicket === true) {
          this.setState({
            openDrawer: true,
            currSsId: ssId,
          });
        } else {
          handleApply(eventId, temp)
            .then((res) => {
              this.handleUpdateSessionStatus();
              this.success(0);
            })
            .catch((err) => {
              this.handleFailure(ssId, err);
            });
        }
      } else if (type === 'CANCEL') {
        handleCancel(eventId, temp)
          .then((res) => {
            this.handleUpdateSessionStatus();
            this.success(1);
          })
          .catch((err) => {
            this.handleFailure(ssId, err);
          });
      } else {
        handleRePay(
          eventId,
          content[index].paymentId.payType,
          temp,
          (res, type) => {
            if (type === 1) {
              window.open(res.orderurl, '_blank');
              this.handleUpdateSessionStatus();
            } else {
              if (res.response) {
                const { data } = res.response;
                message.error({
                  content: data.error.message,
                  style: {
                    marginTop: '20vh',
                    fontSize: '16px',
                    fontWeight: 'bold',
                  },
                });
              } else
                message.error({
                  content: 'Repay fail',
                  style: {
                    marginTop: '20vh',
                    fontSize: '16px',
                    fontWeight: 'bold',
                  },
                });
            }
          }
        );
      }
    }
  };

  handleCloseDrawer = () => {
    const { content } = this.state;
    this.setState({
      openDrawer: false,
      content: content.map((item) => ({ ...item, pending: false })),
    });
  };

  getCustomStyle = () => {
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

    return divStyle;
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.session !== this.props.session) {
      this.setState({
        content: this.props.session.map((ss) => ({ ...ss, pending: false })),
      });
    }
  };

  render() {
    // need to refactor
    const {
      content,
      visible,
      openDrawer,
      currSsId,
      scheduleName,
      fontSize,
      lineText,
      letterSpacing,
      padding,
      margin,
      color,
      background,
    } = this.state;

    const {
      id,
      editable,
      leftModal,
      ticket,
      eventId,
      status,
      isSellTicket,
    } = this.props;

    const divStyle = this.getCustomStyle();

    return (
      <div className="p-5 child-block" key={id}>
        <TextBlock
          content={scheduleName}
          editable={editable}
          child={true}
          newStyle={titleBlockStyle}
        />
        <div className="d-flex">
          <div style={divStyle} className="flex-fill">
            {content.map((ss) => (
              <div
                className="row child-block p-3 shadow-sm mt-2 mb-3"
                style={divStyle}
                key={ss.id}
              >
                <div className=" col-md-3">
                  <div style={ScheduleConstant.calendar} className="mb-2 p-1">
                    <p style={ScheduleConstant.monthStyle} className="p-1">
                      {moment(ss.day).format('MMM')}
                    </p>
                    <p>{moment(ss.day).format('D')}</p>
                    <p style={{ fontSize: '13px' }}>
                      {moment(ss.day).format('dddd')}
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <TextBlock
                    content={ss.name}
                    editable={editable}
                    child={true}
                    newStyle={ScheduleConstant.titleStyle}
                    handleChangeSchedule={(value) =>
                      this.handleChangeContent('name', ss.id, value)
                    }
                  />

                  <div className="mt-4" style={{ fontSize: '14px' }}>
                    <TextBlock
                      content={ss.address.location}
                      editable={editable}
                      child={true}
                      handleChangeSchedule={(value) =>
                        this.handleChangeContent('location', ss.id, value)
                      }
                    />
                  </div>
                </div>

                <div className="col-md-3">
                  {editable || status !== 'PUBLIC' ? (
                    <Button
                      icon={<CalendarOutlined />}
                      type="primary"
                      className="mt-2"
                      disabled={ss.isCancel}
                    >
                      {ss.status === 'JOINED'
                        ? 'Cancel Session'
                        : 'Apply Session'}
                    </Button>
                  ) : !ss.paymentId ? (
                    ss.status === 'JOINED' ? (
                      <Button
                        icon={<CalendarOutlined />}
                        type="primary"
                        className="mt-2"
                        disabled={ss.isCancel}
                        loading={ss.pending}
                        onClick={() => this.onClickButton(ss.id, 'CANCEL')}
                      >
                        Cancel Session
                      </Button>
                    ) : (
                      <Button
                        icon={<CalendarOutlined />}
                        type="primary"
                        className="mt-2"
                        disabled={ss.isCancel}
                        loading={ss.pending}
                        onClick={() => this.onClickButton(ss.id, 'APPLY')}
                      >
                        {!isSellTicket || isSellTicket === 'No'
                          ? 'Register free'
                          : 'Buy Ticket '}
                      </Button>
                    )
                  ) : ss.paymentId.status === 'PAID' ? (
                    <Button
                      icon={<CalendarOutlined />}
                      type="primary"
                      className="mt-2"
                      loading={ss.pending}
                      disabled={ss.isCancel}
                      onClick={() => this.onClickButton(ss.id, 'CANCEL')}
                    >
                      Cancel this session
                    </Button>
                  ) : (
                    <div className="d-flex">
                      <Button
                        onClick={() => this.onClickButton(ss.id, 'REPAY')}
                        type="primary"
                        className="mr-2"
                        disabled={ss.isCancel}
                      >
                        RePay
                      </Button>

                      <Button
                        onClick={() => this.onClickButton(ss.id, 'CANCEL')}
                        disabled={ss.isCancel}
                        type="danger"
                        loading={ss.pending}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
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
            <b style={ScheduleConstant.moneyStyle}>
              {ticket.price - (ticket.price * ticket.discount) / 100}
            </b>{' '}
            VND
          </p>
          <hr />

          <TransferType
            currSsId={currSsId}
            eventId={eventId}
            handleFinishPayment={this.handleCloseDrawer}
            handleUpdateSessionStatus={this.handleUpdateSessionStatus}
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
  status: state.event.status,
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
  handleRePay: (eventId, payType, sessionIds, cb) =>
    dispatch(applyEventActions.handleRePay(eventId, payType, sessionIds, cb)),

  handleGetEventInfo: (eventId, cb) =>
    dispatch(eventActions.getEventInfoUsingID(eventId, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Schedule1);
