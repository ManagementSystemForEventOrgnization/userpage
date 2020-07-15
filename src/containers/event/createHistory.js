import React from 'react';
import { connect } from 'react-redux';
import QRCodes from '../user/QRCode';

import moment from 'moment';
import { Link } from 'react-router-dom';

import {
  Input,
  Tabs,
  Card,
  Skeleton,
  Button,
  Menu,
  Row,
  Col,
  Dropdown,
  Modal,
  Alert,
  Radio,
  message
} from 'antd';

import {
  EnvironmentOutlined,
  DeleteOutlined,
  EditOutlined,
  SettingOutlined,
  CloseOutlined,
  QrcodeOutlined,
} from '@ant-design/icons';
import { userActions } from 'action/user.action';
import { eventActions } from 'action/event.action';

const { Search } = Input;
const { TabPane } = Tabs;

const titleStyle = {
  height: '300px',
  width: '100%',
  color: 'white',
  fontSize: '40px',
  fontWeight: '700',
  backgroundImage:
    'url(https://static.ticketbox.vn/site/global/content-v2/img/home-search-bg-01.jpg)',
};

const menuStyle = {
  borderRadius: '8px',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '18px',
  background: 'linear-gradient(to right, rgb(20, 81, 220), rgb(144, 202, 199))',
};

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
      isOpenQrCode: false,
      list: [],
      isDeleteMess: true,
      isdeletSucces: true,
    };
  }

  componentDidMount = () => {
    const { getCreateHistory, getCategories, categories } = this.props;
    getCreateHistory();
    if (categories.length === 0) {
      getCategories();
    }
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
    const { getCreateHistory, arrEvent } = this.props;
    const { listEvent } = this.state;

    let index = Math.round(listEvent.length / 10) + 1;
    let dataSent = {};
    dataSent.pageNumber = index;
    getCreateHistory(dataSent);
    //  let Event = [...listEvent, ...arrEvent];

    this.setState({ isupdate: true, listEvent: [...arrEvent] });
  };

  onFocusCancel = () => {
    this.setState({
      isSuccess: true,
    });
  };

  onChangeSearch = (value) => {
    const { getCreateHistory } = this.props;
    this.setState({
      txtSearch: value,
    });
    let dataSent = {};
    dataSent.txtSearch = value;

    getCreateHistory(dataSent);
    this.setState({ isupdate: false });
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
      isSuccess: true,
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


  };

  handleURL = (url) => {
    localStorage.setItem('webAddress', url);
  };

  showDeleteConfirm = () => {
    const { deleteEvent } = this.props;
    const { eventId } = this.state;

    deleteEvent(eventId).then(res => {

      this.setState({
        isDeleteMess: false,
        isupdate: false,
        isdeletSucces: false,
        visible: false
      });
      message.success({
        content: 'you have deleted a event',
        className: 'custom-class',
        style: {
          marginTop: '20vh',
        },
      });

    }).catch(error => {
      console.log(error);
    }

    )

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
      isDeleteMess: true,
      isdeletSucces: true,
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
    this.setState({ isupdate: false });
  };

  cancelSessionEvent = (idSession) => {
    const { idEventCancel } = this.state;
    let { sessionEvent } = this.state;
    const { cancelEvent } = this.props;

    cancelEvent(idEventCancel, idSession);
    let currIndex = sessionEvent.findIndex((ss) => ss.id === idSession);

    if (currIndex !== -1) {
      sessionEvent[currIndex].isCancel = true;
    }
    this.setState({ sessionEvent });
  };

  showCancelConfirm = () => {
    const { idEventCancel } = this.state;
    const { cancelEvent } = this.props;

    cancelEvent(idEventCancel);

    this.setState({
      isSecondLoad: false,
      isSuccess: false,
      isupdate: false,
    });
  };

  renderMenu = (item) => {
    const qrCodes = (sess, eventId) => (
      <Menu>
        {sess.map((item, key) => (
          <Menu.Item key={key}>
            {console.log(item)}
            <QRCodes
              QrValue={eventId + item._id}
              day={item.day}
              title={'Session: ' + item.joinNumber}
            />
          </Menu.Item>
        ))}
      </Menu>
    );
    const menu = (
      <Menu key={`menu${item._id}`}>
        <Menu.Item onClick={() => this.handleEditSite(item.urlWeb, item._id)}>
          <Link to="/create" className="d-flex">
            <EditOutlined />
            <p style={{ fontWeight: 'bold' }} className="ml-3">
              Edit site
            </p>
          </Link>
        </Menu.Item>

        <Menu.Item onClick={() => this.isShowDelete(item._id)}>
          <div className="d-flex">
            <DeleteOutlined />
            <p style={{ fontWeight: 'bold' }} className="ml-3">
              Delete event
            </p>
          </div>
        </Menu.Item>

        <Menu.Item onClick={() => this.handleURL(item.urlWeb)}>
          <Link to={`/manage/${item._id}`} className="d-flex">
            <SettingOutlined />
            <p style={{ fontWeight: 'bold' }} className="ml-3">
              Manage event
            </p>
          </Link>
        </Menu.Item>
        <Menu.Item onClick={() => this.showCancelEvent(item._id, item.session)}>
          <div className="d-flex">
            <CloseOutlined />
            <p style={{ fontWeight: 'bold' }} className="ml-3">
              {' '}
              Cancel event
            </p>
          </div>
        </Menu.Item>
        <Menu.Item>
          <Dropdown overlay={qrCodes(item.session, item._id)}>
            <p style={{ fontWeight: 'bolder' }}>
              <QrcodeOutlined className="mr-3" /> QR Code
            </p>
          </Dropdown>
        </Menu.Item>
      </Menu>
    );

    return menu;
  };

  renderTypeMenu = () => {
    return (
      <Menu mode="inline" style={menuStyle} defaultSelectedKeys="1">
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
    );
  };

  renderTypeEvent = () => {
    return (
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
    );
  };

  render() {
    const {
      sessionEvent,
      isSuccess,
      isupdate,
      isDeleteMess,
      isdeletSucces,
    } = this.state;
    const {
      pending,
      arrEvent,
      err,
      pendCancel,
      cancelSession,
      errDelete,
      penDelet,
      successDe,
    } = this.props;
    // console.log('arrEvent', arrEvent);
    let { listEvent } = this.state;
    listEvent = isupdate ? [...listEvent, ...arrEvent] : [...arrEvent];

    return (
      <div className="history">
        <div
          style={titleStyle}
          className="d-flex align-items-center justify-content-center"
        >
          Manage Created Events
        </div>

        <Row className="mt-2 pl-3 pr-5">
          <Col span={18} push={6}>
            <div>
              <Search
                className="p-2"
                enterButton
                size="large"
                placeholder="input search text"
                onSearch={(value) => this.onChangeSearch(value)}
              />

              {this.state.isRadio ? ' ' : this.renderTypeEvent()}
              {pending ? (
                <Skeleton
                  className="mt-2 mb-5"
                  avatar
                  paragraph={{ rows: 4 }}
                  active
                />
              ) : (
                <div className="row p-2 ">
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
                              {item.name}
                            </h5>
                            <div>
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

          <Col span={4} pull={18}>
            {this.renderTypeMenu()}
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
          // footer={null}
          confirmLoading={penDelet}
        >
          {!isDeleteMess && errDelete && (
            <h6 style={{ color: 'red' }}>{errDelete}</h6>
          )}
          {!isdeletSucces && successDe && (
            <Alert
              message="you delete success in event "
              type="success"
              showIcon
            />
          )}
        </Modal>
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
            <TabPane tab="Cancel all event" key="1">
              <div className="d-flex">
                <p style={{ fontWeight: 600, fontSize: '18px' }}>
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
            <TabPane tab="Cancel  Session" key="2">
              <p style={{ fontWeight: 600, fontSize: '18px' }}>
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
  arrEvent: state.user.createdEvents,
  pending: state.user.pending,
  pend: state.event.pending,
  errMessage: state.event.errMessage,
  err: state.event.errCancel,
  pendCancel: state.event.pendCancel,
  cancelSession: state.event.cancelSession,
  successDe: state.user.successDe,
  errDelete: state.user.errDelete,
  penDelet: state.user.penDelet,
});

const mapDispatchToProps = (dispatch) => ({
  getCreateHistory: (dataSent) =>
    dispatch(userActions.getCreateHistory(dataSent)),
  getCategories: () => dispatch(eventActions.getCategories()),
  deleteEvent: (eventId) => dispatch(userActions.deleteEvent(eventId)),
  cancelEvent: (eventId, sessionIds) =>
    dispatch(eventActions.cancelEvent(eventId, sessionIds)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateHistory);
