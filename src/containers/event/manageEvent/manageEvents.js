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
} from '@ant-design/icons';

import { eventActions } from 'action/event.action';
import { applyEventActions } from 'action/applyEvent';
import EditGeneral from './EditGeneral';
const { TabPane } = Tabs;
const { Column, ColumnGroup } = Table;

class ManageEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      joinUser: [],
      txtCause: '',
      visible: false,
      joinEvent: [],
      background: '',
      backReject: '',
      backDelete: '',
    };
  }

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
    const { getUserJoinEvent, match } = this.props;

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
    const { userJoinEvent } = this.props;
    const { txtCause, joinEvent } = this.state;

    return (
      <>
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={<span className="pl-5 pr-5">General Information</span>}
            key="1"
          >
            <EditGeneral />
          </TabPane>

          <TabPane tab={<span className="pl-5 pr-5">Participant</span>} key="2">
            <Table dataSource={userJoinEvent} pagination={10}>
              <ColumnGroup
                title="FullName "
                dataIndex="fullName"
                key="FullName"
              />
              <ColumnGroup title="Email " dataIndex="email" key="Email" />
              <ColumnGroup title="Phone " dataIndex="phone" key="phone" />
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
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  errMessage: state.event.errMessage,
  userJoinEvent: state.event.userJoinEvent,
});

const mapDispatchToProps = (dispatch) => ({
  getUserJoinEvent: (dataSent, callback) =>
    dispatch(eventActions.getUserJoinEvent(dataSent, callback)),

  rejectEventMember: (joinUserId, eventId, sessionIds) =>
    dispatch(
      applyEventActions.rejectEventMember(joinUserId, eventId, sessionIds)
    ),
  reportUser: (userId, cause, eventId) =>
    dispatch(applyEventActions.reportUser(userId, cause, eventId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageEvent);
