import React from 'react';
import { connect } from 'react-redux';

import moment from 'moment';
import { Input, Select, DatePicker, Skeleton, Button } from 'antd';
import EventCard from 'components/EventCard';

import { userActions } from 'action/user.action';
import { eventActions } from 'action/event.action';

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const titleStyle = {
  height: '300px',
  width: '100%',
  color: 'white',
  fontSize: '40px',
  fontWeight: '700',
  backgroundImage:
    'url(https://static.ticketbox.vn/site/global/content-v2/img/home-search-bg-01.jpg)',
};

const loadMoreStyle = {
  marginLeft: '45%',
  marginRight: '45%',
  marginBottom: '10%',
};

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
    const { get_History, getCategories, categories } = this.props;

    if (categories.length === 0) {
      getCategories();
    }
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
    dataSent.startDate = moment(dates[0]._d).format('YYYY/MM/DD');
    dataSent.endDate = moment(dates[1]._d).format('YYYY/MM/DD');

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
    let { listEvent } = this.state;
    listEvent = listEvent.length > 0 ? listEvent : [...arrEvent];
    return (
      <div className="history">
        <div
          style={titleStyle}
          className="d-flex align-items-center justify-content-center mb-3"
        >
          Registered events
        </div>

        <div className="row pr-5 pl-5">
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
              <div className="col-xl-4 col-lg-4 col-md-6 mt-4" key={item._id}>
                <EventCard eventInfo={item} />
              </div>
            ))}
            {this.ableToLoadMore(arrEvent.length) && (
              <Button
                style={loadMoreStyle}
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
  arrEvent: state.user.arrEvent,
  pending: state.user.pending,
});

const mapDispatchToProps = (dispatch) => ({
  get_History: (dataSent) => dispatch(userActions.get_History(dataSent)),

  getCategories: () => dispatch(eventActions.getCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryProfile);
