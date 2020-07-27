import React from 'react';
import { connect } from 'react-redux';
import { Button, Select, DatePicker, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Banner from 'components/Banner';
import NavBar from 'components/NavBar';
import EventCard from 'components/EventCard';

import { eventActions } from 'action/event.action';

const { Option } = Select;

const { RangePicker } = DatePicker;
const loadMoreStyle = {
  marginLeft: '45%',
  marginRight: '45%',
  marginBottom: '10%',
};

class CategoryDetailPage extends React.Component {
  constructor(props) {
    super(props);
    const { match } = props.match;
    this.state = {
      categoryName: match.params.id,
      listEvent: [...this.props.hlEvent],
    };
  }

  componentDidMount = () => {
    const { getListEvent, match, getCategories, categories } = this.props;
    const path = match.match.params.id;

    if (categories.length === 0) {
      getCategories();
    }

    if (path === 'all-events') {
      const sentData = {
        pageNumber: 1,
      };
      getListEvent(sentData);
    } else {
      const categoryEventId = localStorage.getItem('currentCategory');
      const sentData = {
        categoryEventId,
        pageNumber: 1,
      };
      this.setState({
        categoryEventId,
      });
      getListEvent(sentData);
    }
  };

  onChangeDates = (dates) => {
    const { getListEvent } = this.props;
    const { categoryEventId, txtSearch, fee } = this.state;

    const dataSent = {
      startDate: dates ? moment(dates[0]._d).format('YYYY/MM/DD') : '',
      endDate: dates ? moment(dates[1]._d).format('YYYY/MM/DD') : '',
      categoryEventId,
      txtSearch,
      fee,
      pageNumber: 1,
    };

    this.setState({
      startDate: dates ? moment(dates[0]._d).format('YYYY/MM/DD') : '',
      endDate: dates ? moment(dates[1]._d).format('YYYY/MM/DD') : '',
    });

    getListEvent(dataSent);
  };

  handleChangeFee = (value) => {
    const { getListEvent } = this.props;
    const { categoryEventId, txtSearch, startDate, endDate } = this.state;

    const sentData = {
      categoryEventId,
      txtSearch,
      startDate,
      endDate,
      fee: value === 'true',
      pageNumber: 1,
    };
    getListEvent(sentData);
  };

  handleSearch = (value) => {
    const { startDate, endDate, fee, categoryEventId } = this.state;
    const { getListEvent } = this.props;

    this.setState({
      txtSearch: value,
    });

    const dataSent = {
      startDate,
      endDate,
      fee,
      categoryEventId,
      txtSearch: value,
      pageNumber: 1,
    };
    getListEvent(dataSent);
  };

  componentDidUpdate = (prevProps) => {
    const { getListEvent, match } = this.props;
    const path = match.match.params.id;
    const categoryEventId = localStorage.getItem('currentCategory');

    if (prevProps.match.match.params.id !== path) {
      if (path === 'all-events') {
        let sentData = {
          pageNumber: 1,
        };
        getListEvent(sentData);
      } else {
        let sentData = {
          pageNumber: 1,
          categoryEventId,
        };
        getListEvent({ sentData });
      }
      this.setState({
        categoryEventId,
        txtSearch: '',
        startDate: '',
        endDate: '',
      });
    }
  };

  ableToLoadMore = (count) => {
    if (count === 0) return false;

    if (count === 10) return true;
    return count % 10 === 0;
  };

  onLoadMore = () => {
    const { getListEvent, hlEvent } = this.props;

    let index = Math.round(hlEvent.length / 10) + 1;
    let dataSent = {};
    dataSent.pageNumber = index;
    getListEvent(dataSent);
    this.setState({ shoulUpdate: true });
  };

  renderEvents = () => {
    const { hlEvent } = this.props;

    return hlEvent.length > 0 ? (
      <div className="row p-5 ">
        {hlEvent.map((item) => (
          <div className="col-xl-4 col-lg-4 col-md-6 mt-4 " key={item._id}>
            <EventCard eventInfo={item} />
          </div>
        ))}
        {this.ableToLoadMore(hlEvent.length) && (
          <Button
            style={loadMoreStyle}
            // loading={pending}
            type="danger"
            shape="round"
            onClick={this.onLoadMore}
          >
            Load More
          </Button>
        )}
      </div>
    ) : (
      <div style={{ textAlign: 'center' }}>
        <h6 className="mt-5 mb-5">OPPs! We cannot find any events.</h6>
        <hr />
        <img
          src="https://res.cloudinary.com/eventinyourhand/image/upload/v1592767121/LoadingGif/Free_Movement_Of_Data_umzvrl.gif"
          alt="no-high-light"
        />
      </div>
    );
  };

  render() {
    const { match, hlpending } = this.props;

    return (
      <div className=" homepage" style={{ backgroundColor: '#f1f1f1' }}>
        <NavBar />

        <Banner
          category={match.match.params.id.toUpperCase()}
          handleSearch={this.handleSearch}
        />

        <div className="row  pl-5 pr-5 mt-5">
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
              defaultValue="All Fares"
              style={{ width: '100%', height: '40px' }}
              onChange={this.handleChangeFee}
            >
              <Option value="true">Cost</Option>
              <Option>Free</Option>
            </Select>
          </div>

          <Link to="/event-list/all-events">
            <Button style={{ height: '40px' }}>View All Event</Button>
          </Link>
        </div>

        {hlpending ? (
          <Skeleton className="mt-2" avatar paragraph={{ rows: 4 }} active />
        ) : (
          <div className="list-event mt-2 mb-5  " style={{ marginTop: '5%' }}>
            {this.renderEvents()}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // map state of store to props
  hlEvent: state.event.hlEvent,
  categories: state.event.categories,
  hlpending: state.event.hightLightFinishLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getListEvent: (categoryEventId) =>
    dispatch(eventActions.getListEvent(categoryEventId)),
  getCategories: () => dispatch(eventActions.getCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetailPage);
