import React from 'react';
import { connect } from 'react-redux';
import { Input, Select, DatePicker, Card, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import { FieldTimeOutlined, EnvironmentOutlined } from '@ant-design/icons';

import { userActions } from '../../action/user.action';

const { Search } = Input;
const { Option } = Select;

//  { "email":"ptmaimai106@gmail.com",
//    "password":"123456"

//  }

const { RangePicker } = DatePicker;

const src =
  'https://res.cloudinary.com/dwt4njhmt/image/upload/v1588052185/por9cvfqtxvzmmdrvlsw.jpg';
class HistoryProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      categoryEventId: " ",
      startDate: "",
      endDate: " ",
      txtSearch: '  ',
      pageNumber: 1,
      numberRecord: 10,
      categories: this.props.categories,
      arrEvent:
        this.props.arrEvent !== null
          ? this.props.arrEvent
          : [
            {
              _id: 1,
              events: [
                {
                  urlWeb: src,
                  name: 'Nâng Cao Nghiệp Vụ Hướng Dẫn Viên Châu Âu',
                  startTime: 'T2, 13 Tháng 4 2020 3:00 PM',
                  address:
                    '02 Tôn Đức Thắng Street,Bến Nghé Ward, Quận 1, Thành Phố Hồ Chí Minh',
                },
              ],
            },
          ],
    };
  }

  handleChange = (categoryEventId) => {
    this.setState({
      categoryEventId,
    });
    this.handleFilter();
  };

  onChangeDates = (dates, dateStrings) => {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    this.setState({
      startDate: dateStrings[0],
      endDate: dateStrings[1],
    });
    this.handleFilter();
  };

  onChangeSearch = (value) => {
    console.log(value);
    this.setState({
      txtSearch: value,
    });

    this.handleFilter();
  };

  onChange = (pageNumber) => {
    this.setState({
      pageNumber,
    });
    this.handleFilter();
  };
  handleFilter = () => {
    const { get_History, arrEvent } = this.props;
    const {
      categoryEventId,
      startDate,
      endDate,
      txtSearch,
      pageNumber,
      numberRecord,
    } = this.state;
    get_History(
      categoryEventId,
      startDate,
      endDate,
      txtSearch,
      pageNumber,
      numberRecord
    );
    if (arrEvent !== null) {
      this.setState({ arrEvent });
    }
  };

  render() {
    const { categories, arrEvent } = this.state;
    console.log("TEV:", arrEvent);

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
              placeholder="input search text"
              onSearch={(value) => this.onChangeSearch(value)}
            />
          </div>
        </div>
        <div className="row ">
          {arrEvent.map((item, index) => (
            <div key={index} className="col mt-4">
              {item.events.map((event) => (
                <Link to="">
                  <Card
                    className="event-cart"
                    cover={
                      <img className="img" alt="example" src={event.urlWeb} />
                    }
                  >
                    <b>{event.name}</b>
                    <div className="d-flex">
                      <FieldTimeOutlined className="mt-1" />
                      <p className="ml-2"> {event.startTime}</p>
                    </div>
                    <div className="d-flex">
                      <EnvironmentOutlined className="mt-1" />
                      <p className="ml-2"> {event.address}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-5" style={{ textAlign: 'center' }}>
          <Pagination onChange={this.onChange} defaultCurrent={1} total={500} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // map state of store to props
  categories: state.event.categories,
  arrEvent: state.user.arrEvent,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryProfile);
