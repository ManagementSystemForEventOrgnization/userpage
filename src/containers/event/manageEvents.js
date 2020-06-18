import React from 'react';
import { Button, Tabs, Table, Collapse } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import What from '../event/EventInfor/WhatTabPane';
import Which from '../event/EventInfor/WhichTabPane';
import When from '../event/EventInfor/WhenTabPane';
import { eventActions } from 'action/event.action';
const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Column, ColumnGroup } = Table;
class ManageEvent extends React.Component {
  constructor(props) {
    // get category
    super(props);
    this.state = {
      nameEvent: '',
      typeOfEvent: 'Public',
      category: '',
      session: [],
      isSellTicket: 'No',
      webAddress: '',
      isFirstLoad: true,
      banner: '/bg-2.jpg',
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
    const { getCategories, categories, getUserJoinEvent } = this.props;
    if (categories.length === 0) {
      getCategories();
    }
    let dataSent = {};
    dataSent.eventId = '5ed378fdbb0a102b7ce00903';
    getUserJoinEvent(dataSent);
  };

  render() {
    const { categories, userJoinEvent } = this.props;
    const {
      nameEvent,
      isSellTicket,
      webAddress,

      typeOfEvent,

      banner,
    } = this.state;
    // const data =userJoinEvent ||[
    //     {
    //         key: '1',
    //         FullName: 'John',
    //         Email: 'hongmo0909@gmail.com',
    //         time: 32,

    //         session: ['nice', 'developer'],
    //     },

    // ];

    const HIGHT = {
      color: '333333',
      fontWeight: '700',
      fontSize: '36px',
      fontFamily: `Oswald`,

      marginBottom: '15px',
      textTransform: 'capitalize',
      marginLeft: '20px',
    };

    const src =
      'https://res.cloudinary.com/dwt4njhmt/image/upload/v1591667844/logoEvent_wvpplo.png';
    return (
      <div className="manageEvent  ">
        <div className="card-container">
          <div className="site-card-border-less-wrapper">
            <div className="row   ">
              <div className="col">
                <img className="image" src={src} alt="logo" />
              </div>
              <div className="col" style={{ padding: '8%' }}>
                <h1>My Site</h1>
                <Link to="">https://hanlinh010198.wixsite.com/mysite</Link>
                <Button className="ticket">PENDING</Button>
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
                          <div></div>
                          {session.map((item) => (
                            <div>
                              <div className="row">
                                <div className="col">
                                  <p>{item.name}</p>
                                </div>
                                <div className="col">
                                  <p>{item.day}</p>
                                </div>

                                <div className="col">
                                  <button>approve </button>
                                </div>
                                <div className="col">
                                  <button>approve </button>
                                </div>
                                <div className="col">
                                  <button>approve </button>
                                </div>
                              </div>
                            </div>
                          ))}
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
});
const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(eventActions.getCategories()),
  getUserJoinEvent: (dataSent) =>
    dispatch(eventActions.getUserJoinEvent(dataSent)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageEvent);
