import React from 'react';
import { connect } from 'react-redux';

import moment from 'moment';
import { Input, Select, DatePicker, Card, Skeleton, Button } from 'antd';
import { Link } from 'react-router-dom';
import { EnvironmentOutlined } from '@ant-design/icons';
import { userActions } from 'action/user.action';
import { eventActions } from 'action/event.action';
const { Search } = Input;
const { Option } = Select;

//  { "email":"ptmaimai106@gmail.com",
//    "password":"123456"

//  }

const { RangePicker } = DatePicker;
class HistoryProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numberRecord: 10,
      categories: this.props.categories,
      listEvent: [...this.props.arrEvent],
    };
  }
  componentDidMount = () => {
    const { get_History, getCategories } = this.props;

    getCategories();
    get_History();
  };
  handleChange = (categoryEventId) => {
    const { get_History } = this.props;
    let dataSent = {};

    dataSent.categoryEventId = categoryEventId;

    get_History(dataSent);
  };

  onChangeDates = (dates) => {
    const { get_History } = this.props;

    let dataSent = {};
    dataSent.startDate = moment(dates[0]._d).format('YYYY/MM/DD')
    dataSent.endDate = moment(dates[1]._d).format('YYYY/MM/DD')

    get_History(dataSent);
  };

  onChangeSearch = (value) => {
    const { get_History } = this.props;
    this.setState({
      txtSearch: value,
    });
    let dataSent = {};
    dataSent.txtSearch = value;

    get_History(dataSent);
  };

  onChange = (pageNumber) => {
    this.setState({
      pageNumber,
    });
  };

  sumDiscount = (ticket, discount) => {
    let newDiscount = 1 - discount;

    let sum = newDiscount * ticket;
    let money = `${sum} VNĐ `;

    return money;
  };
  ableToLoadMore = (count) => {
    if (count === 0) return false;

    if (count === 10) return true;
    return count % 10 === 0;
  };
  onLoadMore = () => {
    const { get_History, arrEvent } = this.props;
    const { listEvent } = this.state;

    let index = Math.round(listEvent.length / 10) + 1;
    let dataSent = {};
    dataSent.pageNumber = index;
    get_History(dataSent);
    let Event = [...listEvent, ...arrEvent];

    this.setState({ listEvent: Event });
  };
  render() {
    const { pending, arrEvent, categories } = this.props;
    console.log('event', arrEvent);
    let { listEvent } = this.state;
    listEvent = listEvent.length > 0 ? listEvent : [...arrEvent];
    return (
      <div className="history">
        <div className="row">
          <div className="col ">
            <RangePicker
              style={{ width: '100%', height: '40px' }}
              format="YYYY-MM-DD "
              onChange={this.onChangeDates}
              onOk={this.onOk}
            />
          </div>
          <div className="col ">
            <Select
              style={{ width: '100%', height: '40px' }}
              onChange={this.handleChange}
            >
              {categories.map((item) => (
                <Option
                  style={{ width: '100%', height: '40px' }}
                  key={item._id}
                  value={item._id}
                >
                  {item.name}
                </Option>
              ))}
            </Select>
          </div>


          <div className="col ">
            <Search
              size="large"
              enterButton
              placeholder="input search text"
              // onChange={this.handleChangeSearch}
              onSearch={(value) => this.onChangeSearch(value)}
            />
          </div>
        </div>


        {pending ? (
          <Skeleton className="mt-2" avatar paragraph={{ rows: 4 }} active />
        ) : (
            <div className="row p-5 ">
              {listEvent.map((item) => (
                <div className="col-xl-4 col-lg-4 col-md-6 mt-4">
                  <Link to={'/event/' + item.urlWeb}>
                    <Card
                      className="event-cart "
                      cover={
                        <div>
                          {item.ticket ? (
                            <div className="d-flex ">
                              {item.ticket.discount ? (
                                <Button className="ml-1 mt-1 ticket">
                                  {this.percentDiscount(item.ticket.discount)}
                                </Button>
                              ) : (
                                  ''
                                )}
                            </div>
                          ) : (
                              <Button className="ml-1 mt-1 ticket" key={item._id}>
                                Free
                              </Button>
                            )}

                          {item.bannerUrl && (
                            <img
                              className="img "
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
                            {moment(item.session[0].day).format('DD/MM/YYYY ')}
                          </p>
                        </div>
                      </div>
                      <div className="d-flex ">
                        <h5 className="ml-2 line-clamp "> {item.name}</h5>
                        <div>
                          {' '}
                          {item.session.length === 1 ? (
                            ''
                          ) : (
                              <p className="ml-2" style={{ fontWeight: 'bold' }}>
                                + {item.session.length - 1}more events
                              </p>
                            )}
                        </div>
                      </div>
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
                            <p style={{ fontWeight: 'bold' }} className="ml-1  ">
                              0 VNĐ
                            </p>
                          )}
                      </div>

                      <div className="d-flex ">
                        <EnvironmentOutlined className="mt-1" />
                        <div className="d-flex ">
                          <p className="ml-2 address ">
                            {item.session[0].address.location}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </div>
              ))}
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
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // map state of store to props
  categories: state.event.categories,
  arrEvent: state.user.historyEvent,
  pending: state.user.pending,
});

const mapDispatchToProps = (dispatch) => ({
  get_History: (dataSent) => dispatch(userActions.get_History(dataSent)),

  getCategories: () => dispatch(eventActions.getCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryProfile);
