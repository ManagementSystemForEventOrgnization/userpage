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
/// import sessionCard from '../components/CardSession'

import Chat from 'containers/chat/ChatWidget';

import { eventActions } from '../action/event.action';
import { responsive } from 'containers/event/templates/constants/atom.constant';
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
    const { getListEventUpComing, getListEvent, getCategories } = this.props;
    const { pageNumber, numberRecord } = this.state;
    let type = 'HEIGHT_LIGHT';
    // getHomeData();
    getListEventUpComing(pageNumber, numberRecord);
    getListEvent(type);
    getCategories();
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

  render() {
    const { events, hlEvent } = this.props;

    const HIGHT = {
      textAlign: 'center',
      color: '333333',
      fontWeight: '700',
      fontSize: '36px',
      fontFamily: `Oswald`,

      marginBottom: '15px',
      textTransform: 'capitalize',
    };

    const orgnizations = {
      name: 'DIANA L. CACERES',
      src:
        'https://res.cloudinary.com/dwt4njhmt/image/upload/v1591865822/images_qukx6e.jpg',
      description: 'Developer',
    };

    const temp = [1, 2, 3, 4, 5];

    return (
      <div className="homepage">
        <div className="fixed-top">
          <Header />

          <NavBar />
        </div>
        <Banner />

        <div style={{ marginTop: '10%' }}>
          <h1 style={HIGHT}> Highlight Event</h1>
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
                <div className="  shadow ml-2" key={index}>
                  <div className=" event-list">
                    {item.bannerUrl && (
                      <img
                        className="img "
                        alt="example"
                        src={item.bannerUrl}
                      />
                    )}
                    <div className="title">
                      <h5 className="title-name"> {item.name}</h5>
                      <div className="title-time ">
                        <p>
                          {moment(item.session[0].day).format('DD/MM/YYYY ')}
                        </p>
                        {item.session.length === 1 ? (
                          ''
                        ) : (
                          <p>+ {item.session.length - 1}more events</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>

        <hr />
        <div className="list-event mt-5 mb-5  " style={{ marginTop: '5%' }}>
          <div className="up-coming pl-2">
            <h1 style={HIGHT} className="mt-5 mb-5">
              Upcomming Events
            </h1>
            <div className="row p-5 ">
              {events.map((item, index) => (
                <div className="col-xl-4 col-lg-4 col-md-6 mt-4" key={item._id}>
                  <Link to="">
                    <Card
                      className="event-cart "
                      cover={
                        <div>
                          {item.session
                            ? item.session.map((e, i) =>
                                item.ticket ? (
                                  <div className="d-flex ">
                                    {item.ticket.discount ? (
                                      <Button className="ml-1 mt-1 ticket">
                                        {' '}
                                        {this.percentDiscount(
                                          item.ticket.discount
                                        )}
                                      </Button>
                                    ) : (
                                      ''
                                    )}
                                  </div>
                                ) : (
                                  <Button
                                    className="ml-1 mt-1 ticket"
                                    key={e.id}
                                  >
                                    Free
                                  </Button>
                                )
                              )
                            : ' '}
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
          </div>
        </div>

        <hr
          style={{
            fontSize: '30px',
            background: `linear-gradient(to right, #0d0d8b, #44aea9)`,
          }}
        />

        <div className="orgnization">
          <h1>Organizers </h1>
          <div className="d-flex justify-content-between mt-3 mb-4 pl-5">
            {temp.map((item) => (
              <Orgnization key={item} orgnization={orgnizations} />
            ))}
          </div>
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
  };
};

const mapDispatchToProps = (dispatch) => ({
  getListEventUpComing: (pageNumber, numberRecord) =>
    dispatch(eventActions.getListEventUpComing(pageNumber, numberRecord)),
  // getListEvent: () => dispatch(eventActions.getListEvent()),
  getHomeData: () => dispatch(eventActions.getHomeData()),
  getListEvent: (type) => dispatch(eventActions.getListEvent(type)),
  getCategories: () => dispatch(eventActions.getCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
