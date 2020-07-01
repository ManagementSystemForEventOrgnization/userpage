import React from 'react';
import { connect } from 'react-redux';
import { Button, Card, Select, DatePicker, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { EnvironmentOutlined } from '@ant-design/icons';

import Header from 'containers/share/_layout/Header';
import Footer from 'containers/share/_layout/Footer';
import Banner from 'components/Banner';
import NavBar from 'components/NavBar';

import { eventActions } from 'action/event.action';
const { Option } = Select;

const { RangePicker } = DatePicker;
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
      getListEvent();
    } else {
      const categoryEventId = localStorage.getItem('currentCategory');
      const sentData = {
        categoryEventId,
      };
      this.setState({
        categoryEventId,
      });
      getListEvent(sentData);
    }
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

  onChangeDates = (dates) => {
    const { getListEvent } = this.props;
    const { categoryEventId, txtSearch, fee } = this.state;

    const dataSent = {
      startDate: dates ? moment(dates[0]._d).format('YYYY/MM/DD') : '',
      endDate: dates ? moment(dates[1]._d).format('YYYY/MM/DD') : '',
      categoryEventId,
      txtSearch,
      fee,
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
    };
    getListEvent(dataSent);
  };

  componentDidUpdate = (prevProps) => {
    const { getListEvent, match } = this.props;
    const path = match.match.params.id;
    const categoryEventId = localStorage.getItem('currentCategory');

    if (prevProps.match.match.params.id !== path) {
      if (path === 'all-events') {
        getListEvent();
      } else {
        getListEvent({ categoryEventId });
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
    const { getListEvent } = this.props;
    const { listEvent } = this.state;

    let index = Math.round(listEvent.length / 10) + 1;
    let dataSent = {};
    dataSent.pageNumber = index;
    getListEvent(dataSent);
    this.setState({ shoulUpdate: true });
  };

  renderEvents = () => {
    const { hlEvent } = this.props;
    let { listEvent, shoulUpdate } = this.state;
    listEvent = shoulUpdate ? [...listEvent, ...hlEvent] : [...hlEvent];

    return listEvent.length > 0 ? (
      <div className="row p-5 ">
        {listEvent.map((item, index) => (
          <div className="col-xl-4 col-lg-4 col-md-6 mt-4 " key={item._id}>
            <Link to={'/event/' + item.urlWeb} target="_blank">
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
                  <div className="col">
                    <p
                      style={{
                        textAlign: 'center',
                        background: '#ff4d4f',
                        color: '#fff',
                        fontWeight: 'bold',
                        padding: '3px 10px 2px 10px',
                        marginRight: '13px',
                      }}
                    >
                      {item.eventCategories.name}
                    </p>
                  </div>
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
                          <p className="ml-3" style={{ fontWeight: 'bold' }}>
                            {' '}
                            {this.sumDiscount(
                              item.ticket.price,
                              item.ticket.discount
                            )}
                          </p>
                        </div>
                      ) : (
                        <p className=" mt-1 " style={{ fontWeight: 'bold' }}>
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
        {this.ableToLoadMore(hlEvent.length) && (
          <Button
            style={{
              marginLeft: '45%',
              marginRight: '45%',
              marginBottom: '10%',
            }}
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
      <div
        className="category-detail homepage"
        style={{ backgroundColor: '#f1f1f1' }}
      >
        <div className="fixed-top">
          <Header />
          <NavBar />
        </div>

        <Banner
          category={match.match.params.id.toUpperCase()}
          handleSearch={this.handleSearch}
        />

        <div className="row  pl-5 pr-5 mt-5">
          <div className="col ">
            <RangePicker
              style={{ width: '100%', height: '30px' }}
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
              {/* <Option>All Fares</Option> */}
              <Option value="true">Cost</Option>
              <Option>Free</Option>
            </Select>
          </div>

          <Link to="/event-list/all-events">
            <Button>View All Event</Button>
          </Link>
        </div>

        {hlpending ? (
          <Skeleton className="mt-2" avatar paragraph={{ rows: 4 }} active />
        ) : (
          <div className="list-event mt-2 mb-5  " style={{ marginTop: '5%' }}>
            {this.renderEvents()}
          </div>
        )}
        <Footer />
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
