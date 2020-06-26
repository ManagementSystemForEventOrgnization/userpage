import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { EnvironmentOutlined } from '@ant-design/icons';

import Header from '../containers/share/_layout/Header';
import Footer from '../containers/share/_layout/Footer';
import Banner from '../components/Banner';
import Orgnization from '../components/Orgnization';
import NavBar from '../components/NavBar';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Chat from 'containers/chat/ChatWidget';

import { eventActions } from '../action/event.action';
import { responsive } from 'containers/event/templates/constants/atom.constant';

const HIGHT = {
  textAlign: 'center',
  color: '333333',
  fontWeight: '700',
  fontSize: '36px',
  fontFamily: `Oswald`,

  marginBottom: '15px',
  textTransform: 'capitalize',
  textShadow: '0 0 3px #161821',
};

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberRecord: 12,
      pageNumber: 1,
      visible: false,
    };
  }

  componentDidMount = () => {
    const { getListEventUpComing, getListEvent } = this.props;
    const { pageNumber, numberRecord } = this.state;
    let type = 'HEIGHT_LIGHT';
    let sentData = {};
    sentData.type = type;
    // getHomeData();
    getListEventUpComing(pageNumber, numberRecord);
    getListEvent(sentData);
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

  splitAddress = (add) => {
    const words = add.split(', ');
    let str = words[2];
    let str1 = words[3];
    let a = str + ',' + str1;
    return a;
  };

  handleVisibleChange = () => {
    const { visible } = this.state;
    this.setState({
      visible: !visible,
    });
  };

  renderHighLightEvent = () => {
    const { hlEvent } = this.props;
    return hlEvent.length > 0 ? (
      <div className="slide-container p-4 ml-5 mt-5 ">
        <Carousel
          responsive={responsive}
          swipeable={false}
          draggable={false}
          // showDots={true}

          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={this.props.deviceType !== 'mobile' ? true : false}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          transitionDuration={2000}
          containerClass="carousel-container"
          removeArrowOnDeviceType={['tablet', 'mobile']}
          deviceType={this.props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {hlEvent.map((item, index) => (
            <Link to={'/event/' + item.urlWeb} target="_blank">
              <div className="  shadow ml-2 highlight-item" key={index}>
                <div className=" event-list">
                  {item.bannerUrl && (
                    <img className="img " alt="example" src={item.bannerUrl} />
                  )}
                  <div className="title">
                    <h5 className="title-name"> {item.name}</h5>
                    <div className="title-time ">
                      <p>{moment(item.session[0].day).format('DD/MM/YYYY ')}</p>
                      {item.session.length === 1 ? (
                        ''
                      ) : (
                        <p>+ {item.session.length - 1}more events</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    ) : (
      <div style={{ textAlign: 'center' }}>
        <p>No highlight event at this time</p>
        <img
          src="https://res.cloudinary.com/eventinyourhand/image/upload/v1592767121/LoadingGif/Free_Movement_Of_Data_umzvrl.gif"
          alt="no-high-light"
        />
      </div>
    );
  };

  renderUpcomingEvent = () => {
    const { events } = this.props;
    return events.length > 0 ? (
      <div className="row p-5 ">
        {events.map((item, index) => (
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
      </div>
    ) : (
      <div style={{ textAlign: 'center' }}>
        <p>No upcoming event at this time</p>
        <img
          src="https://res.cloudinary.com/eventinyourhand/image/upload/v1592767124/LoadingGif/download_cojul1.gif"
          alt="no-upcoming"
        />
      </div>
    );
  };

  render() {
    const { hightLightFinishLoading, upcomingFinishLoading } = this.props;
    return (
      <div className="homepage">
        <div className="fixed-top">
          <Header />
          <NavBar />
        </div>
        <Banner />

        <div style={{ marginTop: '10%' }}>
          <h1 style={HIGHT}> Highlight Event</h1>

          {!hightLightFinishLoading ? (
            <div style={{ textAlign: 'center' }}>
              <img
                src="https://res.cloudinary.com/eventinyourhand/image/upload/v1592767121/LoadingGif/Free_Movement_Of_Data_umzvrl.gif"
                alt="no-high-light"
              />
            </div>
          ) : (
            this.renderHighLightEvent()
          )}
        </div>

        <div className="list-event mt-5 mb-5  " style={{ marginTop: '5%' }}>
          <div className="up-coming pl-2">
            <h1 style={HIGHT} className="mt-5 mb-5">
              Upcomming Events
            </h1>
          </div>

          {!upcomingFinishLoading ? (
            <div style={{ textAlign: 'center' }}>
              <img
                src="https://res.cloudinary.com/eventinyourhand/image/upload/v1592767124/LoadingGif/download_cojul1.gif"
                alt="no-upcoming"
              />
            </div>
          ) : (
            this.renderUpcomingEvent()
          )}
        </div>
        <hr></hr>
        <Link to="/event-list/all-events">
          <Button
            style={{
              marginLeft: '40%',
              marginTop: '5%',
              marginBottom: '10%',
              width: '20%',
              height: '50px',
              fontWeight: 'bolder',
              fontSize: '25px',
              borderWidth: '3px',
              borderColor: 'var(--eds-ui-500,#a9a8b3)',
              borderRadius: '4px',
            }}
          >
            View All Events
          </Button>
        </Link>
        <hr
          style={{
            fontSize: '30px',
            background: `linear-gradient(to right, #0d0d8b, #44aea9)`,
          }}
        />

        <div className="orgnization">
          <h1 style={HIGHT}>Organizers </h1>
          <Orgnization />
        </div>
        <Chat />

        <hr />
        <div className="explore d-flex justify-content-center mt-5 mb-5  p-5">
          <Link to="/about-us">
            <Button size="large" type="primary">
              About Us
            </Button>
          </Link>
        </div>

        <Footer />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    events: state.event.events,
    hlEvent: state.event.hlEvent,
    upcomingFinishLoading: state.event.upcomingFinishLoading,
    hightLightFinishLoading: state.event.hightLightFinishLoading,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getListEventUpComing: (pageNumber, numberRecord) =>
    dispatch(eventActions.getListEventUpComing(pageNumber, numberRecord)),
  getHomeData: () => dispatch(eventActions.getHomeData()),
  getListEvent: (sentData) => dispatch(eventActions.getListEvent(sentData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
