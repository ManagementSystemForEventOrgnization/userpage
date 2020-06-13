import React from 'react';
import { connect } from 'react-redux';
import {
  Input,
  Select,
  DatePicker,
  Card,
  Pagination,
  Skeleton,
  Tooltip,
  Button,
} from 'antd';
import { Link } from 'react-router-dom';
import {
  FieldTimeOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { userActions } from '../../action/user.action';

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
      categoryEventId: ' ',
      startDate: '',
      endDate: ' ',
      txtSearch: '  ',
      pageNumber: 1,
      numberRecord: 10,
      categories: this.props.categories,
      arrEvent: this.props.arrEvent,
    };
  }
  componentDidMount = () => {
    const { get_History, getCreateHistory, match } = this.props;

    if (match.location.pathname === '/registered-event') {
      get_History();
    } else {
      getCreateHistory();
    }
  };
  handleChange = (categoryEventId) => {
    this.setState({
      categoryEventId,
    });
    this.handleFilter();
  };

  onChangeDates = (dates) => {
    this.setState({
      startDate: dates[0]._d,
      endDate: dates[1]._d,
    });
    this.handleFilter();
  };

  onChangeSearch = () => {
    this.handleFilter();
  };
  handleChangeSearch = (e) => {
    this.setState({
      txtSearch: e.target.value,
    });
  };

  onChange = (pageNumber) => {
    this.setState({
      pageNumber,
    });
    this.handleFilter();
  };
  handleFilter = () => {
    const { get_History, getCreateHistory, match } = this.props;
    const {
      categoryEventId,
      startDate,
      endDate,
      txtSearch,
      pageNumber,
      numberRecord,
    } = this.state;
    console.log('before filter', startDate, endDate);
    if (match.location.pathname === '/registered-event') {
      get_History(
        categoryEventId,
        startDate,
        endDate,
        txtSearch,
        pageNumber,
        numberRecord
      );
    } else {
      getCreateHistory(
        categoryEventId,
        startDate,
        endDate,
        txtSearch,
        pageNumber,
        numberRecord
      );
    }
  };

  render() {
    const { categories } = this.state;
    const { pending, arrEvent } = this.props;
    console.log('match', this.props.match);
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
              value={this.state.txtSearch}
              placeholder="input search text"
              onChange={this.handleChangeSearch}
              onSearch={this.onChangeSearch}
            />
          </div>
        </div>
        {pending ? (
          <Skeleton />
        ) : (
            <div>
              <div className="row pl-5 ">
                {arrEvent.map((item, index) => (
                  <div className="row mt-4 ml-5  shadow pb-3" key={index}>
                    <div className="col">
                      <Link to="">
                        <Card
                          className="event-cart"
                          cover={
                            <img
                              className="img"
                              alt="example"
                              src={item.urlWeb}
                            />
                          }
                        >
                          <div className="d-flex ">
                            <Tooltip
                              placement="bottomLeft"
                              title={
                                item.session
                                  ? item.session.map((e) => (
                                    <div>
                                      <div className="d-flex ">
                                        <FieldTimeOutlined className="mt-1" />
                                        <p className="ml-2"> {e.day}</p>
                                      </div>
                                      <div className="d-flex ">
                                        <EnvironmentOutlined className="mt-1" />
                                        <p className="ml-2">
                                          {' '}
                                          {e.address.location}
                                        </p>
                                      </div>
                                    </div>
                                  ))
                                  : 'No have start time events '
                              }
                            >
                              <h4>{item.name}</h4>
                            </Tooltip>

                            <div className="d-flex mt-1">
                              <UserOutlined className="mt-1 ml-2" />
                              <p className="ml-1 mt-1">{item.limitNumber}</p>
                            </div>
                          </div>

                          <div className="d-flex ">
                            <FieldTimeOutlined className="mt-1" />
                            <p className="ml-2"> {item.startTime}</p>
                          </div>

                          <Button type="primary">Apply</Button>
                        </Card>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5" style={{ textAlign: 'center' }}>
                <Pagination
                  onChange={this.onChange}
                  defaultCurrent={1}
                  total={500}
                />
              </div>
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
    categoryEventId,
    startDate,
    endDate,
    txtSearch,
    pageNumber,
    numberRecord
  ) =>
    dispatch(
      userActions.get_History(
        categoryEventId,
        startDate,
        endDate,
        txtSearch,
        pageNumber,
        numberRecord
      )
    ),
  getCreateHistory: (
    categoryEventId,
    startDate,
    endDate,
    txtSearch,
    pageNumber,
    numberRecord
  ) =>
    dispatch(
      userActions.getCreateHistory(
        categoryEventId,
        startDate,
        endDate,
        txtSearch,
        pageNumber,
        numberRecord
      )
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryProfile);
