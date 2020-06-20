import React from 'react';
import { Button, Tabs, Table, Collapse, Popconfirm, Input } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import What from '../event/EventInfor/WhatTabPane';
import Which from '../event/EventInfor/WhichTabPane';
import When from '../event/EventInfor/WhenTabPane';
import { eventActions } from 'action/event.action';
import { applyEventActions } from 'action/applyEvent';
const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Column, ColumnGroup } = Table;
class ManageEvent extends React.Component {
  constructor(props) {
    // get category
    super(props);
    let urlWeb = localStorage.getItem('webAddress');
    console.log('1', props)
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
    };
  }

  onChange = (type, value) => {
    if (type === 'isSellTicket') {
      console.log(value);
    }
    this.setState({
      [type]: value,
      isFirstLoad: true,
    });
  };

  componentDidMount = () => {
    const { getCategories, categories, getUserJoinEvent, match, getEventInfo } = this.props;
    console.log('test', match);
    if (categories.length === 0) {
      getCategories();
    }
    let id = match.match.params.id;
    let dataSent = {};
    dataSent.eventId = id;
    getUserJoinEvent(dataSent, (data) => {
      this.setState({
        joinUser: data.map(item => ({
          userId: item._id,
          sessions: item.session.map(ss => ({ sessionId: ss.id })),
          eventId: id
        }))
      })
    })
    let urlWeb = localStorage.getItem('webAddress');
    getEventInfo(urlWeb).then(res => {
      console.log('promise: ', res)
      this.setState({
        nameEvent: res.name,
        typeOfEvent: res.typeOfEvent,
        category: res.eventCategory.name,
        session: res.session,
        isSellTicket: res.isSellTicket,
        webAddress: res.urlWeb,
        isFirstLoad: true,
        banner: res.bannerUrl,
      })
    })


  };


  onApproveMember = (joinUserId, sessionIds) => {
    const { verifyEventMember, match } = this.props;
    let id = match.match.params.id;
    verifyEventMember(joinUserId, id, sessionIds);
  }
  onRejectEventMember = (joinUserId, sessionIds) => {
    const { rejectEventMember, match } = this.props;
    let id = match.match.params.id;
    rejectEventMember(joinUserId, id, sessionIds);
  }
  confirm = (userId) => {
    // reportUser: (userId, cause, eventId)

    const { txtCause } = this.state;
    const { reportUser, match } = this.props;
    let id = match.match.params.id;
    reportUser(userId, txtCause, id);

  }
  onChangeCause = (e) => {
    this.setState({
      txtCause: e.target.value,

    })
  }



  render() {
    const { categories, userJoinEvent } = this.props;
    const {
      nameEvent,
      isSellTicket,
      webAddress,
      typeOfEvent,
      banner, joinUser, txtCause
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
    const text = 'Are you sure to delete this task?';
    const src =
      'https://res.cloudinary.com/dwt4njhmt/image/upload/v1591667844/logoEvent_wvpplo.png';

    console.log('TCL : ', userJoinEvent)
    return (
      <div className="manageEvent  ">
        <div className="card-container">
          <div className="site-card-border-less-wrapper">
            <div className="row   ">
              <div className="col">
                <img className="image" src={banner} alt="logo" />
              </div>
              <div className="col" style={{ padding: '8%' }}>
                <h1>{nameEvent}</h1>
                {/* <Link to="">https://hanlinh010198.wixsite.com/mysite</Link> */}
                {/* <Button className="ticket">PENDING</Button> */}
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

              <Which
                isSellTicket={isSellTicket}
                onChange={this.onChange}
                typeOfEvent={typeOfEvent}
                banner={banner}
              />
            </TabPane>
            <TabPane tab="Participant" key="2">
              <Table dataSource={userJoinEvent}>
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
                <Column title="apply time" dataIndex="createdAt" key="time" />
                <Column
                  title="session"
                  dataIndex="session"
                  key="session"
                  render={(session) => (
                    <div className="d-flex">
                      <p>{session.length}</p>
                      <Collapse className="ml-2">
                        <Panel>
                          {userJoinEvent.map((join, index) =>
                            <div key={index}>

                              {join.session.map((item) => (
                                <div>
                                  <div className="row">
                                    <div className="col">
                                      <p>{item.name}</p>
                                    </div>
                                    <div className="col">
                                      <p>{item.day}</p>
                                    </div>

                                    <div className="col">
                                      <button onClick={() => this.onApproveMember(join._id, item.id)}>approve </button>
                                    </div>
                                    <div className="col">
                                      <button onClick={() => this.onRejectEventMember(join._id, item.id)}>reject </button>
                                    </div>
                                    <div className="col">
                                      <Popconfirm
                                        placement="topRight"
                                        title={
                                          <div>
                                            <p>Are you sure to report this user?</p>
                                            <Input value={txtCause} onChange={this.onChangeCause} ></Input>
                                          </div>
                                        }
                                        onConfirm={() => this.confirm(join._id)}
                                        okText="Yes"
                                        cancelText="No"
                                      >
                                        <Button>report</Button>
                                      </Popconfirm>

                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </Panel>
                      </Collapse>
                    </div>
                  )}
                />
              </Table>
              ,
            </TabPane>
          </Tabs>
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
  session: state.event.session

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
  verifyEventMember: (joinUserId, eventId, sessionIds) => dispatch(applyEventActions.verifyEventMember(joinUserId, eventId, sessionIds)),
  rejectEventMember: (joinUserId, eventId, sessionIds) => dispatch(applyEventActions.rejectEventMember(joinUserId, eventId, sessionIds)),
  reportUser: (userId, cause, eventId) => dispatch(applyEventActions.reportUser(userId, cause, eventId)),

});

export default connect(mapStateToProps, mapDispatchToProps)(ManageEvent);
