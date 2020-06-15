import React from 'react';
import { connect } from 'react-redux';

import moment from 'moment'
import {
  Input,
  Select,
  DatePicker,
  Card,

  Skeleton,

  Button,
} from 'antd';
import { Link } from 'react-router-dom';
import {

  EnvironmentOutlined,

} from '@ant-design/icons';
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
      arrEvent: this.props.arrEvent,

    };
  }
  componentDidMount = () => {
    const { get_History, getCreateHistory, match, getCategories } = this.props;


    if (match.location.pathname === '/registered-event') {
      getCategories();
      get_History(
      );

    } else {
      getCategories();
      getCreateHistory();
    }
  };
  handleChange = (categoryEventId) => {
    const { get_History, getCreateHistory, match } = this.props;
    let dataSent = {};

    dataSent.categoryEventId = categoryEventId;
    if (match.location.pathname === '/registered-event') {
      get_History(
        dataSent
      );
    } else {
      getCreateHistory(
        dataSent
      );
    }
  };

  onChangeDates = (dates) => {
    const { get_History, getCreateHistory, match } = this.props;
    // this.setState({
    //   startDate: dates[0]._d,
    //   endDate: dates[1]._d,
    // });
    let dataSent = {};
    dataSent.startDate = dates[0]._d;
    dataSent.endDate = dates[1]._d;

    if (match.location.pathname === '/registered-event') {
      get_History(
        dataSent
      );
    } else {
      getCreateHistory(
        dataSent
      );
    }

  };


  onChangeSearch = (value) => {
    const { get_History, getCreateHistory, match } = this.props;
    this.setState({
      txtSearch: value,
    });
    let dataSent = {};
    dataSent.txtSearch = value;
    if (match.location.pathname === '/registered-event') {
      get_History(
        dataSent
      );
    } else {
      getCreateHistory(
        dataSent
      );
    }
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
    })




    setTimeout(this.handleFilter(), 3000);
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

  render() {
    const { categories } = this.state;
    const { pending, arrEvent } = this.props;
    return (
      <div className="history">
        <div className="row">
          <div className="col ">
            <RangePicker
              format="YYYY-MM-DD "
              onChange={this.onChangeDates}
              onOk={this.onOk}
            />
          </div>
          <div className="col ">
            <Select style={{ width: '100%' }} onChange={this.handleChange}>
              {categories.map((item) => (
                <Option key={item._id} value={item._id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </div>
          <div className="col ">
            <Search
              // value={this.state.txtSearch}
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
              {arrEvent.map((item) => (
                <div className="col-xl-4 col-lg-4 col-md-6 mt-4">
                  <Link to="">
                    <Card
                      className="event-cart "
                      cover={
                        <div>
                          <Button className="ml-1 mt-1 ticket">
                            {item.status}
                          </Button>

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
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // map state of store to props
  categories: state.event.categories,
  arrEvent: state.user.arrEvent,
  pending: state.user.pending,
});

const mapDispatchToProps = (dispatch) => ({
  get_History: (
    dataSent
  ) =>
    dispatch(
      userActions.get_History(
        dataSent
      )
    ),
  getCreateHistory: (
    dataSent

  ) =>
    dispatch(
      userActions.getCreateHistory(
        dataSent

      )
    ),
  getCategories: () => dispatch(eventActions.getCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryProfile);
