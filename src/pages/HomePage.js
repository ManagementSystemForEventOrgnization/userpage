import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card } from 'antd';
import { Link } from 'react-router-dom';

import moment from 'moment'
import {

  FieldTimeOutlined, EnvironmentOutlined
} from '@ant-design/icons';
import Header from '../containers/share/_layout/Header';
import Footer from '../containers/share/_layout/Footer';
import Banner from '../components/Banner';
import EventList from '../containers/share/EventList';
// import CartEvent from '../components/CardEvent';
import Orgnization from '../components/Orgnization';
import NavBar from '../components/NavBar';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
/// import sessionCard from '../components/CardSession'

import { eventActions } from '../action/event.action';
class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberRecord: 12,
      pageNumber: 1,
    };

  }

  componentDidMount = () => {
    const { getListEventUpComing, hlEvent, getListEvent } = this.props;
    const { pageNumber, numberRecord } = this.state;

    console.log(pageNumber, numberRecord);
    getListEventUpComing(pageNumber, numberRecord);
    getListEvent();




  };

  sumDiscount = (ticket, discount) => {

    let newDiscount = (1 - discount)

    let sum = newDiscount * ticket;
    let money = `${sum} VNĐ `;

    return money
  }
  percentDiscount = (discount) => {

    let newDiscount = discount * 100

    let percent = `-${newDiscount}%`

    return percent
  }

  render() {
    const { events, hlEvent } = this.props;
    console.log("hlEvent", hlEvent);


    const responsive = {
      superLargeDesktop: {

        breakpoint: { max: 3000, min: 2000 },
        items: 5
      },
      desktop: {
        breakpoint: { max: 2000, min: 1024 },
        items: 3
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
      }
    };




    const orgnizations = {
      name: 'Orgnization 1',
      src: '/star.jpg',
      description: 'description',
    };

    const temp = [1, 2, 3, 4, 5];

    return (
      <div className="homepage">
        <div className="fixed-top">
          <Header />

          <NavBar />
        </div>
        <Banner />

        <div className="high-light">
          <h1>Highlight Events</h1>

          <div className=" pl-5 mr-5 ">
            <Carousel responsive={responsive}
              swipeable={false}
              draggable={false}
              showDots={true}
              ssr={true}
              infinite={true}
              autoPlay={this.props.deviceType !== "mobile" ? true : false}
              autoPlaySpeed={2000}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={1000}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              deviceType={this.props.deviceType}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px">
              {
                hlEvent.map((item, index) =>
                  < div className=" ml-5 shadow event-list" style={{ background: '#fff' }} key={index}  >
                    {
                      item.bannerUrl &&
                      < img
                        className="cart "
                        alt="example"
                        src={item.bannerUrl}
                      />
                    }

                    <h5 className="line-clamp mt-2 ml-1 " > {item.name}</h5>



                  </div>
                )
              }
            </Carousel>
          </div>
        </div>

        <div className="list-event">
          <div className="up-coming pl-2">
            <h1 className="">Upcoming Events </h1>
            <div className=" row  pl-4 ">
              {events.map((item, index) =>
                < div className=" mt-4 ml-5 row  shadow" key={index} >

                  < Link to="" >
                    <Card

                      className="event-cart "
                      cover={
                        <div >
                          {
                            item.session ?
                              item.session.map((e, i) =>
                                item.ticket ?
                                  <div className="d-flex ">
                                    {item.ticket.discount ?


                                      <Button className="ml-1 mt-1 ticket"> {this.percentDiscount(item.ticket.discount)}</Button>


                                      : ""
                                    }
                                  </div>
                                  : <Button className="ml-1 mt-1 ticket">Free</Button>
                              ) : " "
                          }
                          {
                            item.bannerUrl &&
                            < img
                              className="img "
                              alt="example"
                              src={item.bannerUrl}
                            />
                          }

                        </div>

                      }
                    >
                      <div className="d-flex ">
                        <h5 className="ml-2 line-clamp " > {item.name}</h5>

                      </div>
                      <div className="d-flex ">
                        <FieldTimeOutlined className="mt-1" />
                        <div className="d-flex ">
                          <p className="ml-2" style={{ color: '#d1410c', fontWeight: "bold" }}> {moment(item.session[0].day).format('DD/MM/YYYY ')}</p>
                          {
                            item.session.length === 1 ? " " :
                              <p className="ml-2" style={{ color: '#d1410c', fontWeight: "bold" }}> + {item.session.length - 1}more events</p>

                          }
                        </div>
                      </div>
                      <div className="d-flex ">
                        <EnvironmentOutlined className="mt-1" />
                        <div className="d-flex ">
                          <p className="ml-2 address "> {item.session[0].address.location}</p>

                        </div>
                      </div>

                      <div className='row'>
                        <div className='col' >
                          {item.ticket ?
                            <div className="d-flex ">
                              {item.ticket.discount ?
                                <div >
                                  <p style={{ textDecoration: "line-through", fontWeight: "bold" }} className="ml-1 ">{item.ticket.price} VNĐ</p>
                                  <p style={{ fontWeight: 'bold' }}> {this.sumDiscount(item.ticket.price, item.ticket.discount)}</p>
                                </div>
                                : <p className=" mt-1 " style={{ fontWeight: 'bold' }}>{item.ticket.price} VNĐ</p>
                              }
                            </div>
                            : <p style={{ fontWeight: 'bold' }} className="ml-1  ">0 VNĐ</p>

                          }
                        </div>
                        <div className="col " >
                          <p style={{ textAlign: "center" }}>{item.eventCategories.name}</p>
                        </div>


                      </div>
                    </Card>
                  </ Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <hr />

        <div className="orgnization">
          <h1>Organizers </h1>
          <div className="d-flex justify-content-between mt-3 mb-4 pl-5">
            {temp.map((item) => (
              <Orgnization key={item} orgnization={orgnizations} />
            ))}
          </div>
        </div>

        <div className="explore">
          <Link to="/about-us">
            <Button size="large" type="primary">
              About Us
            </Button>
          </Link>
        </div>

        <Footer />
      </div >
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
  getListEventUpComing: (pageNumber, numberRecord) => dispatch(eventActions.getListEventUpComing(pageNumber, numberRecord)),
  // getListEvent: () => dispatch(eventActions.getListEvent()),
  getHomeData: () => dispatch(eventActions.getHomeData()),
  getListEvent: () => dispatch(eventActions.getListEvent()),

});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
