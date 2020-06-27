import React from 'react';
import { connect } from 'react-redux';

import moment from 'moment';
import { Link } from 'react-router-dom';

import {
  Input,
  Tabs,
  Card,
  Skeleton,
  message,
  Button,
  Menu,
  Row,
  Col,
  Dropdown,
  Modal,
  Radio,
} from 'antd';

import {
  EnvironmentOutlined,
  DeleteOutlined,
  EditOutlined,
  SettingOutlined,
  CloseOutlined,
  CheckCircleFilled,
} from '@ant-design/icons';
import { userActions } from 'action/user.action';
import { eventActions } from 'action/event.action';

const { Search } = Input;
const { TabPane } = Tabs;

class CreateHistory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numberRecord: 10,
      categories: this.props.categories,
      listEvent: [...this.props.arrEvent],

      collapsed: false,
      confirmLoading: false,
      eventId: '',
      typeofEvent: '',
      statusEvent: 'All',
      pageNumber: 0,
      hasMore: true,
      isfirstLoad: true,
      isSecondLoad: true,
      sessionEvent: [],
      idEventCancel: '',
      isShowCancel: false,
      isRadio: true,
      isSuccess: true,
    };
  }
  componentDidMount = () => {
    const { getCreateHistory, getCategories } = this.props;
    getCreateHistory();
    getCategories();
  };

  handleChange = (categoryEventId) => {
    const { getCreateHistory } = this.props;
    let dataSent = {};
    dataSent.categoryEventId = categoryEventId;
    getCreateHistory(dataSent);
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  onChangeDates = (dates) => {
    const { getCreateHistory } = this.props;

    let dataSent = {};
    dataSent.startDate = dates[0]._d;
    dataSent.endDate = dates[1]._d;

    getCreateHistory(dataSent);
  };

  ableToLoadMore = (count) => {
    if (count === 0) return false;

    if (count === 10) return true;
    return count % 10 === 0;
  };

  onLoadMore = () => {
    const { getCreateHistory } = this.props;
    const { listEvent } = this.state;

    let index = Math.round(listEvent.length / 10) + 1;
    let dataSent = {};
    dataSent.pageNumber = index;
    getCreateHistory(dataSent);
    // let Event = [...listEvent, ...arrEvent];

    // this.setState({ listEvent: Event });
    this.state({ isupate: true });
  };
  onFocusCancel = () => {
    this.setState({
      isSuccess: true,
    })
  }

  onChangeSearch = (value) => {
    const { getCreateHistory } = this.props;
    this.setState({
      txtSearch: value
    });
    let dataSent = {};
    dataSent.txtSearch = value;

    getCreateHistory(dataSent);
  };

  onChange = (pageNumber) => {
    this.setState({
      pageNumber,
    });
  };

  loadEvent = () => {
    const { pageNumber } = this.state;
    let number = +pageNumber + 1;
    this.setState({
      pageNumber: number,
    });

    setTimeout(this.handleFilter(), 3000);
  };

  isCancelEvent = () => {
    this.setState({
      isShowCancel: false,
      isSuccess: true
    });
  };

  showCancelEvent = (idEvent, session) => {
    this.setState({
      idEventCancel: idEvent,
      sessionEvent: session.map((item) => ({
        ...item,
        isCancel: item.isCancel,
      })),
      isShowCancel: true,
    });
  };

  sumDiscount = (ticket, discount) => {
    let newDiscount = 1 - discount;

    let sum = newDiscount * ticket;
    let money = `${sum} VNĐ `;

    return money;
  };

  percentDiscount = (discount) => {
    let newDiscount = discount * 100;
    let percent = `-${newDiscount}%`;
    return percent;
  };

  onChangeStatus = (value) => {
    const { getCreateHistory } = this.props;
    this.setState({
      statusEvent: value,
    });

    let dataSent = {};
    if (value === 'ALL') {
      this.setState({
        isRadio: true,
      });
      getCreateHistory();
    } else {
      this.setState({
        isRadio: false,
      });
      dataSent.status = value;
      getCreateHistory(dataSent);
    }
  };

  handleEditSite = (url, eventId) => {
    localStorage.setItem('webAddress', url);
    localStorage.setItem('currentId', eventId);
    localStorage.setItem('editSite', url);

    // history.push('/create');
  };

  handleURL = (url) => {
    localStorage.setItem('webAddress', url);
  };

  showDeleteConfirm = () => {
    const { deleteEvent, arrEvent } = this.props;
    const { eventId } = this.state;

    deleteEvent(eventId, (res) => {
      if (!res) {
        message.success({
          content: (
            <p
              style={{
                marginTop: '25%',
                zIndex: 100000,
              }}
            >
              <CheckCircleFilled
                className="mr-3"
                style={{
                  color: 'green',
                }}
              />
              Delete Success
            </p>
          ),
        });
      } else {
        message.error({
          content: (
            <p
              style={{
                marginTop: '25%',
                zIndex: 100000,
                color: 'red',
              }}
            >
              {res.error.message}
            </p>
          ),
        });
      }
    });

    let receiver = arrEvent.filter(
      (e) => e._id !== eventId && ((s) => s.status === 'DELETE')
    );

    setTimeout(
      this.setState({
        isfirstLoad: false,
        listEvent: receiver,
        visible: false,
      }),
      3000
    );
  };

  isShowDelete = (eventId) => {
    this.setState({
      visible: true,
      eventId: eventId,
    });
  };

  showModal = () => {
    this.setState({
      visible: false,
    });
  };

  onChaneValue = (e) => {
    const { getCreateHistory } = this.props;
    const { statusEvent } = this.state;
    this.setState({
      typeofEvent: e.target.value,
    });

    if (statusEvent === 'All') {
      let data = {};
      data.typeOfEvent = e.target.value;
      getCreateHistory(data);
    } else {
      let dataSent = {};
      dataSent.status = statusEvent;
      dataSent.typeOfEvent = e.target.value;
      getCreateHistory(dataSent);
    }
  };

  cancelSessionEvent = (idSession) => {
    const { idEventCancel } = this.state;
    let { sessionEvent } = this.state;
    const { cancelEvent } = this.props;

    cancelEvent(idEventCancel, idSession);
    let currIndex = sessionEvent.findIndex((ss) => ss.id === idSession);

    if (currIndex !== -1) {
      sessionEvent[currIndex].isCancel = true;
      this.setState({ sessionEvent });
    }
  };

  renderMenu = (item) => {
    const menu = (
      <Menu key={`menu${item._id}`}>
        <Menu.Item onClick={() => this.handleEditSite(item.urlWeb, item._id)}>
          <Link to="/create" className="d-flex">
            <EditOutlined />
            <p style={{ fontWeight: 'bolder' }} className="ml-3">
              Edit site
            </p>
          </Link>
        </Menu.Item>

        <Menu.Item onClick={() => this.isShowDelete(item._id)}>
          <div className="d-flex">
            <DeleteOutlined />
            <p style={{ fontWeight: 'bolder' }} className="ml-3">
              Delete event
            </p>
          </div>
        </Menu.Item>

        <Menu.Item onClick={() => this.handleURL(item.urlWeb)}>
          <Link to={`/manage/${item._id}`} className="d-flex">
            <SettingOutlined />
            <p style={{ fontWeight: 'bolder' }} className="ml-3">
              Manage event
            </p>
          </Link>
        </Menu.Item>
        <Menu.Item onClick={() => this.showCancelEvent(item._id, item.session)}>
          <div className="d-flex">
            <CloseOutlined />
            <p style={{ fontWeight: 'bolder' }} className="ml-3">
              {' '}
              Cancel event
            </p>
          </div>
        </Menu.Item>
      </Menu>
    );

    return menu;
  };

  showCancelConfirm = () => {
    const { idEventCancel, sessionEvent } = this.state;
    const { cancelEvent, arrEvent } = this.props;

    cancelEvent(idEventCancel);
    let receiver = arrEvent.filter(
      (e) => e._id !== idEventCancel && ((s) => s.status === 'CANCEL')
    );
    console.log("33", sessionEvent)
    //  let currIndex = sessionEvent.find((ss) => ss.isCancel === false);
    // console.log('2', currIndex);

    // if (currIndex !== -1) {
    //   sessionEvent[currIndex].isCancel = true;
    // }

    this.setState({
      isSecondLoad: false,
      listEvent: receiver,
      isSuccess: false,
      // sessionEvent: sessionEvent


    });
  };

  render() {
    const { sessionEvent, isSuccess, isupate } = this.state;
    const { pending, arrEvent, err, pendCancel, cancelSession } = this.props;
    let { listEvent } = this.state;
    listEvent = isupate ? [...listEvent, arrEvent] : [...arrEvent];

    return (
      <div className="history">
        <div
          style={{
            height: '40px',
            width: '100%',
            opacity: '1',
            color: 'white',
            textAlign: 'center',
            fontSize: '25px',
            background: 'rgb(12, 105, 126)',
            fontWeight: '700',
          }}
        >
          Manage Created Event
        </div>
        <Row className="mt-5">
          <Col span={18} push={6}>
            <div>
              <div className="row">
                <div className="col p-5">
                  <Search
                    enterButton
                    size="large"
                    placeholder="input search text"
                    onSearch={(value) => this.onChangeSearch(value)}
                  />
                </div>
              </div>
              {this.state.isRadio ? (
                ' '
              ) : (
                <div className="mt-3 ml-5" style={{ color: 'white' }}>
                  <Radio.Group
                    name="radiogroup"
                    style={{ color: 'white' }}
                    defaultValue="Public"
                    onChange={this.onChaneValue}
                  >
                    <Radio
                      style={{
                        color: 'black',
                        fontWeight: 400,
                        fontSize: '18px',
                      }}
                      value="Private"
                    >
                      Private
                    </Radio>
                    <Radio
                      style={{
                        color: 'black',
                        fontWeight: 400,
                        fontSize: '18px',
                      }}
                      value="Public"
                    >
                      Public
                    </Radio>
                  </Radio.Group>
                </div>
              )}
              {pending ? (
                <Skeleton
                  className="mt-2"
                  avatar
                  paragraph={{ rows: 4 }}
                  active
                />
              ) : (
                <div className="row p-5 ">
                  {listEvent.map((item) => (
                    <div
                      className="col-xl-12 col-lg-12 col-md-12 mt-12 mt-5"
                      key={item._id}
                    >
                      <Card
                        className="event-cart "
                        cover={
                          <div>
                            <Dropdown
                              overlay={this.renderMenu(item)}
                              placement="bottomLeft"
                            >
                              <Button className="ml-1 mt-1 ticket">
                                Action
                              </Button>
                            </Dropdown>

                            {item.bannerUrl && (
                              <img
                                className="img-baner"
                                alt="example"
                                src={item.bannerUrl}
                              />
                            )}
                          </div>
                        }
                      >
                        <div className="row">
                          <div className="d-flex col ">
                            <p
                              className="ml-2"
                              style={{
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                              }}
                            >
                              {moment(
                                (item.session &&
                                  item.session[0] &&
                                  item.session[0].day) ||
                                  new Date().toLocaleDateString()
                              ).format('DD/MM/YYYY ')}
                            </p>
                          </div>
                          <div className="d-flex col ">
                            <div>
                              {item.ticket ? (
                                <div className="d-flex ">
                                  {item.ticket.discount ? (
                                    <div className="d-flex ">
                                      <p
                                        style={{
                                          textDecoration: 'line-through',
                                          fontWeight: 'bold',
                                        }}
                                        className="ml-1 "
                                      >
                                        {item.ticket.price}
                                      </p>
                                      <p
                                        className="ml-3"
                                        style={{ fontWeight: 'bold' }}
                                      >
                                        {' '}
                                        {this.sumDiscount(
                                          item.ticket.price,
                                          item.ticket.discount
                                        )}
                                      </p>
                                      <div className="col">
                                        <h4>{item.status}</h4>
                                      </div>
                                    </div>
                                  ) : (
                                    <p
                                      className=" mt-1 "
                                      style={{ fontWeight: 'bold' }}
                                    >
                                      {item.ticket.price} VNĐ
                                    </p>
                                  )}
                                </div>
                              ) : (
                                <p
                                  style={{ fontWeight: 'bold' }}
                                  className="ml-1  "
                                >
                                  0 VNĐ
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <Link to={`/event/${item.urlWeb}`}>
                          <div className="d-flex ">
                            <h5
                              className="ml-2 line-clamp "
                              style={{
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                              }}
                            >
                              {' '}
                              {item.name}
                            </h5>
                            <div>
                              {' '}
                              {((item.session && item.session.length) || 1) ===
                              1 ? (
                                ''
                              ) : (
                                <p
                                  className="ml-2"
                                  style={{ fontWeight: 'bold' }}
                                >
                                  + {item.session.length - 1}more events
                                </p>
                              )}
                            </div>
                          </div>
                        </Link>
                        <div className="d-flex ">
                          <EnvironmentOutlined className="mt-1" />
                          <div className="d-flex ">
                            <p className="ml-2 address ">
                              {item.session &&
                                item.session[0] &&
                                item.session[0].address.location}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
              )}
              {this.ableToLoadMore(arrEvent.length) && (
                <Button
                  style={{
                    marginLeft: '45%',
                    marginRight: '45%',
                    marginBottom: '10%',
                  }}
                  loading={pending}
                  type="danger"
                  shape="round"
                  onClick={this.onLoadMore}
                >
                  Load More
                </Button>
              )}
            </div>
          </Col>

          <Col className="fixed-left" span={4} pull={18}>
            <Menu
              mode="inline"
              style={{
                borderRadius: '8px',
                color: 'white',
                fontWeight: 'bolder',
                fontSize: '30px',
                background: 'rgb(12, 105, 126)',
              }}
            >
              <Menu.Item key="1" onClick={() => this.onChangeStatus('ALL')}>
                ALL
              </Menu.Item>
              <Menu.Item key="2" onClick={() => this.onChangeStatus('DRAFT')}>
                Draft
              </Menu.Item>
              <Menu.Item key="3" onClick={() => this.onChangeStatus('WAITING')}>
                Waiting
              </Menu.Item>
              <Menu.Item key="4" onClick={() => this.onChangeStatus('PUBLIC')}>
                Public
              </Menu.Item>
              <Menu.Item key="5" onClick={() => this.onChangeStatus('EDITED')}>
                Edited
              </Menu.Item>

              <Menu.Item key="6" onClick={() => this.onChangeStatus('CANCEL')}>
                Cancel
              </Menu.Item>
            </Menu>
          </Col>
        </Row>

        <Modal
          title="Are you sure delete this event?"
          visible={this.state.visible}
          okText="yes"
          okType="danger"
          cancelText="No"
          onOk={this.showDeleteConfirm}
          onCancel={this.showModal}
          confirmLoading={this.state.confirmLoading}
        ></Modal>
        <Modal
          title="Cancel Event"
          visible={this.state.isShowCancel}
          onOk={this.isCancelEvent}

          onCancel={this.isCancelEvent}
        >
          {!this.state.isSecondLoad && err && (
            <h6 style={{ color: 'red' }}>{err}</h6>
          )}
          {cancelSession && !isSuccess && (
            <h6 style={{ color: 'green' }}>Cancel success !!</h6>
          )}

          <Tabs>
            <TabPane tab="Cancel all event" key="1" >
              <div className="d-flex" >
                <p style={{ fontWeight: 600, fontSize: '18px' }} >
                  Are you sure cancel all session this event?
                </p>

                <Button
                  loading={pendCancel}
                  shape="circle"
                  className="ml-2"
                  type="dashed"
                  onClick={this.showCancelConfirm}
                >
                  <DeleteOutlined />
                </Button>
              </div>
            </TabPane>
            <TabPane tab="Cancel  Session" key="2"  >
              <p style={{ fontWeight: 600, fontSize: '18px' }} >
                Are you sure cancel a session this event?
              </p>
              {sessionEvent.map((item) => (
                <div key={item._id} className="row">
                  <div className="col">
                    {' '}
                    <p>{item.name}</p>
                  </div>
                  <div className="col">
                    {' '}
                    <p>
                      {moment(
                        item.day || new Date().toLocaleDateString()
                      ).format('DD/MM/YYYY ')}
                    </p>
                  </div>
                  <div className="col">
                    <Button
                      shape="circle"

                      disabled={item.isCancel}
                      onClick={() => this.cancelSessionEvent(item.id)}
                    >
                      <DeleteOutlined />
                    </Button>
                  </div>
                </div>
              ))}
            </TabPane>
          </Tabs>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // map state of store to props
  categories: state.event.categories,
  arrEvent: state.user.arrEvent,
  pending: state.user.pending,
  pend: state.event.pending,
  errMessage: state.event.errMessage,
  err: state.event.errCancel,
  pendCancel: state.event.pendCancel,
  cancelSession: state.event.cancelSession,
  successDe: state.event.successDe,
});

const mapDispatchToProps = (dispatch) => ({
  getCreateHistory: (dataSent) =>
    dispatch(userActions.getCreateHistory(dataSent)),
  getCategories: () => dispatch(eventActions.getCategories()),
  deleteEvent: (eventId, cb) => dispatch(eventActions.deleteEvent(eventId, cb)),
  cancelEvent: (eventId, sessionIds) =>
    dispatch(eventActions.cancelEvent(eventId, sessionIds)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateHistory);
