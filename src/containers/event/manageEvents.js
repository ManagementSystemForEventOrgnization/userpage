import React from 'react';
import {
  Button,
  Tabs,
  Table,
  Popconfirm,
  Input,
  Modal,
  notification,
} from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';

import {
  FileDoneOutlined,
  CloseOutlined,
  DeleteOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import What from '../event/EventInfor/WhatTabPane';
import When from '../event/EventInfor/WhenTabPane';

import { eventActions } from 'action/event.action';
import { applyEventActions } from 'action/applyEvent';

const { TabPane } = Tabs;
const { Column, ColumnGroup } = Table;

class ManageEvent extends React.Component {
  constructor(props) {
    super(props);
    let urlWeb = localStorage.getItem('webAddress');

    this.state = {
      nameEvent: props.nameEvent,
      typeOfEvent: 'Public',
      category: '',
      session: props.session,
      isSellTicket: props.isSellTicket,
      webAddress: urlWeb,
      isFirstLoad: true,
      banner: props.banner,
      joinUser: [],
      txtCause: ' ',
      visible: false,
      joinEvent: [],
      background: '',
      backReject: '',
      backDelete: '',
    };
  }

  onChange = (type, value) => {
    if (type === 'isSellTicket') {
    }
    this.setState({
      [type]: value,
      isFirstLoad: true,
    });
  };

  showModalSession = (join) => {
    let event = join.session.findIndex((ss) => ss.isConfirm === true);
    if (event !== -1) {
      this.setState({ background: 'green' });
    }
    let event1 = join.session.findIndex((ss) => ss.isReject === true);

    if (event1 !== -1) {
      this.setState({ backReject: 'red' });
    }
    this.setState({
      visible: true,
      joinEvent: join,
    });
  };

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  componentDidMount = () => {
    const {
      getCategories,
      categories,
      getUserJoinEvent,
      match,
      getEventInfo,
    } = this.props;

    if (categories.length === 0) {
      getCategories();
    }
    let id = match.match.params.id;
    let dataSent = {};
    dataSent.eventId = id;
    getUserJoinEvent(dataSent, (data) => {
      this.setState({
        joinUser: data.map((item) => ({
          userId: item._id,
          sessions: item.session.map((ss) => ({ sessionId: ss.id })),
          eventId: id,
        })),
      });
    });
    let urlWeb = localStorage.getItem('webAddress');
    getEventInfo(urlWeb).then((res) => {
      this.setState({
        nameEvent: res.name,
        typeOfEvent: res.typeOfEvent,
        category: res.eventCategory.name,
        session: res.session,
        isSellTicket: res.isSellTicket,
        webAddress: res.urlWeb,
        isFirstLoad: true,
        banner: res.bannerUrl,
      });
    });
  };

  onApproveMember = (joinUserId, sessionIds) => {
    const { verifyEventMember, match } = this.props;
    let id = match.match.params.id;
    verifyEventMember(joinUserId, id, sessionIds)
      .then((res) => {
        this.setState({
          background: 'green',
        });
      })
      .catch((err) => {
        const { data } = err.response;
        if (data.error) {
          console.log('1', data.error.message);
          notification.error({
            message: data.error.message,
            style: {
              marginTop: '20%',
            },
          });
        }
        // message.error(data.error || 'This is an error something wrong');
      });
  };

  onRejectEventMember = (joinUserId, sessionIds) => {
    const { rejectEventMember, match } = this.props;
    let id = match.match.params.id;
    rejectEventMember(joinUserId, id, sessionIds)
      .then((res) => {
        this.setState({
          backReject: 'red',
        });
      })
      .catch((err) => {
        const { data } = err.response;
        if (data.error) {
          console.log('1', data.error.message);
          notification.error({
            message: data.error.message,
            style: {
              marginTop: '20%',
            },
          });
        }
      });
  };

  confirm = (userId) => {
    const { txtCause } = this.state;
    const { reportUser, match } = this.props;
    let id = match.match.params.id;
    reportUser(userId, txtCause, id);
    this.setState({
      backDelete: true,
    });
  };

  onChangeCause = (e) => {
    this.setState({
      txtCause: e.target.value,
    });
  };

  render() {
    const { categories, userJoinEvent } = this.props;
    const {
      nameEvent,
      webAddress,
      banner,
      txtCause,
      joinEvent,
      background,
    } = this.state;

    const HIGHT = {
      color: '333333',
      fontWeight: '700',
      fontSize: '36px',
      fontFamily: `Oswald`,
      marginBottom: '15px',
      textTransform: 'capitalize',
      marginLeft: '20px',
    };

    return (
      <div className="manageEvent  ">
        <div className="card-container">
          <div className="site-card-border-less-wrapper">
            <div className="row   ">
              <div className="col">
                <img className="image" src={banner} alt="logo" />
              </div>
              <div className="col" style={{ padding: '8%', color: 'white' }}>
                <h1 style={{ color: 'white', textAlign: 'center' }}>
                  {nameEvent}
                </h1>
              </div>
            </div>
          </div>

          <Tabs defaultActiveKey="1">
            <TabPane tab="General Information" key="1">
              <div className="d-flex">
                <div
                  style={{
                    background: 'rgb(255, 52, 37)',
                    textAlign: 'center',
                    color: 'white',
                    width: '10px',
                    height: '50px',
                  }}
                ></div>
                <h2 className=" mt-2 " style={HIGHT}>
                  What
                </h2>
              </div>

              <What
                nameEvent={nameEvent}
                webAddress={webAddress}
                categories={categories}
                onChange={this.onChange}
              />

              <div
                style={{
                  background: 'rgb(255, 52, 37)',
                  width: '100%',
                  height: '3px',
                }}
              ></div>

              <div className="d-flex mt-3">
                <div
                  style={{
                    background: 'rgb(255, 52, 37)',
                    textAlign: 'center',
                    color: 'white',
                    width: '10px',
                    height: '50px',
                  }}
                ></div>
                <h2 className=" mt-2 " style={HIGHT}>
                  Where
                </h2>
              </div>

              <When onChange={this.onChange} />
              <div
                style={{
                  background: 'rgb(255, 52, 37)',
                  width: '100%',
                  height: '3px',
                }}
              ></div>
              <div className="d-flex mt-3">
                <div
                  style={{
                    background: 'rgb(255, 52, 37)',
                    textAlign: 'center',
                    color: 'white',
                    width: '10px',
                    height: '50px',
                  }}
                ></div>
                <h2 className=" mt-2 " style={HIGHT}>
                  Which
                </h2>
              </div>
            </TabPane>

            <TabPane tab="Participant" key="2">
              <Table dataSource={userJoinEvent} pagination={10}>
                <ColumnGroup
                  title="FullName "
                  dataIndex="fullName"
                  key="FullName"
                ></ColumnGroup>
                <ColumnGroup
                  title="Email "
                  dataIndex="email"
                  key="Email"
                ></ColumnGroup>
                <ColumnGroup
                  title="Phone "
                  dataIndex="phone"
                  key="phone"
                ></ColumnGroup>
                <Column
                  title="session"
                  dataIndex="session"
                  key="session"
                  render={(session) => (
                    <div className="d-flex">
                      <h4>{session.length}</h4>
                      {userJoinEvent.map((join) =>
                        join.session === session ? (
                          <Button
                            key={join._id}
                            className="ml-3"
                            type="primary"
                            onClick={() => this.showModalSession(join)}
                            shape="circle"
                          >
                            {' '}
                            <FileDoneOutlined style={{ fontSize: '17px' }} />
                          </Button>
                        ) : (
                          ' '
                        )
                      )}
                    </div>
                  )}
                ></Column>

                <ColumnGroup
                  title="Report"
                  dataIndex="_id"
                  key="_id"
                  render={(_id) => (
                    <div className="col">
                      <Popconfirm
                        placement="topRight"
                        title={
                          <div>
                            <p>Are you sure to report this user?</p>
                            <Input
                              value={txtCause}
                              onChange={this.onChangeCause}
                            ></Input>
                          </div>
                        }
                        onConfirm={() => this.confirm(_id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button
                          type="danger"
                          disabled={this.state.backDelete}
                          shape="circle"
                        >
                          <DeleteOutlined style={{ fontSize: '15px' }} />
                        </Button>
                      </Popconfirm>
                    </div>
                  )}
                ></ColumnGroup>
              </Table>
              ,
            </TabPane>
          </Tabs>

          <Modal
            title="User take part in  session this event"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            width={700}
          >
            <div>
              <div className="d-flex">
                <p>Name :</p>
                <h6 className="ml-3">{joinEvent.fullName}</h6>
              </div>

              <Table dataSource={joinEvent.session}>
                <ColumnGroup
                  title="Name"
                  dataIndex="name"
                  key="name"
                ></ColumnGroup>
                <ColumnGroup
                  title="Day session"
                  dataIndex="day"
                  key="day"
                  render={(day) =>
                    moment(day || new Date().toLocaleDateString()).format(
                      'DD/MM/YYYY '
                    )
                  }
                ></ColumnGroup>
                <ColumnGroup
                  title="Time Apply"
                  dataIndex="createdAt"
                  key="createdAt"
                  render={(createdAt) =>
                    moment(createdAt || new Date().toLocaleDateString()).format(
                      'DD/MM/YYYY '
                    )
                  }
                ></ColumnGroup>
                <ColumnGroup
                  title="address"
                  dataIndex="address"
                  key="address"
                  render={(address) => <p>{address.location}</p>}
                ></ColumnGroup>
                <Column
                  title="Action"
                  dataIndex="id"
                  key="action"
                  render={(id) => (
                    <div className="row">
                      <div className="col">
                        <Button
                          style={{ background }}
                          onClick={() =>
                            this.onApproveMember(joinEvent._id, id)
                          }
                          shape="circle"
                        >
                          <CheckOutlined style={{ fontSize: '15px' }} />{' '}
                        </Button>
                      </div>
                      <div className="col">
                        <Button
                          style={{ background: this.state.backReject }}
                          onClick={() =>
                            this.onRejectEventMember(joinEvent._id, id)
                          }
                          shape="circle"
                        >
                          <CloseOutlined style={{ fontSize: '15px' }} />
                        </Button>
                      </div>
                    </div>
                  )}
                />
              </Table>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  categories: state.event.categories,
  pending: state.event.pending,
  errMessage: state.event.errMessage,
  userJoinEvent: state.event.userJoinEvent,
  banner: state.event.banner,
  nameEvent: state.event.nameEvent,
  isSellTicket: state.event.isSellTicket,
  ticket: state.event.ticket,
  session: state.event.session,

  // isSellTicket: action.eventInfo.isSellTicket,
  // session: action.eventInfo.session,
  // banner: action.eventInfo.bannerUrl,
  // ticket: action.eventInfo.ticket,

  // webAdd:state.event.
});
const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(eventActions.getCategories()),
  getUserJoinEvent: (dataSent, callback) =>
    dispatch(eventActions.getUserJoinEvent(dataSent, callback)),
  getEventInfo: (urlWeb) => dispatch(eventActions.getEventInfo(urlWeb)),
  verifyEventMember: (joinUserId, eventId, sessionIds) =>
    dispatch(
      applyEventActions.verifyEventMember(joinUserId, eventId, sessionIds)
    ),
  rejectEventMember: (joinUserId, eventId, sessionIds) =>
    dispatch(
      applyEventActions.rejectEventMember(joinUserId, eventId, sessionIds)
    ),
  reportUser: (userId, cause, eventId) =>
    dispatch(applyEventActions.reportUser(userId, cause, eventId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageEvent);
