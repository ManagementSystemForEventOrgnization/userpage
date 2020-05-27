import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Tooltip } from 'antd';
import { Link } from 'react-router-dom';

import Header from '../containers/share/_layout/Header';
import Footer from '../containers/share/_layout/Footer';
import Banner from '../components/Banner';
import EventList from '../containers/share/EventList';
// import CartEvent from '../components/CardEvent';
import Orgnization from '../components/Orgnization';
import NavBar from '../components/NavBar';
/// import sessionCard from '../components/CardSession'
import {
  FieldTimeOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { eventActions } from '../action/event.action';
class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  // componentDidMount = () => {
  //   const { getListEvent } = this.props;

  //   getListEvent();

  // };

  render() {
    // const { events } = this.props;

    // const events = this.props.events ? this.props.events : []




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
          <EventList></EventList>
        </div>
        {/* 
        <div className="list-event">
          <div className="up-coming pl-2">
            <h1 className="">Upcoming Events </h1>
            <div className="row pl-5 ">
              {events.map((item, index) => (
                < div className="row mt-4 ml-4  shadow pb-3" key={index} >
                  <div className="col">
                    < Link to="">
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
                          <Tooltip placement="bottomLeft" title={

                            item.session ?
                              item.session.map(e =>
                                <div>
                                  <div className="d-flex ">
                                    <FieldTimeOutlined className="mt-1" />
                                    <p className="ml-2"> {e.day}</p>
                                  </div>
                                  <div className="d-flex ">
                                    <EnvironmentOutlined className="mt-1" />
                                    <p className="ml-2"> {e.address.location}</p>
                                  </div>
                                </div>

                              )
                              : "No have start time events "
                          }>
                            <h4 >{item.name}</h4>
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
                    </ Link>
                  </div>

                </div>
              ))}
            </div>
          </div>
          <hr />
          <div className="latest">
            <h1>Recent Events </h1>

            <div className="row pl-5 ">
              {events.map((item, index) => (
                < div className="row mt-4 ml-4  shadow pb-3" key={index} >
                  <div className="col">
                    < Link to="">
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
                          <Tooltip placement="bottomLeft" title={

                            item.session ?
                              item.session.map(e =>
                                <div>
                                  <div className="d-flex ">
                                    <FieldTimeOutlined className="mt-1" />
                                    <p className="ml-2"> {e.day}</p>
                                  </div>
                                  <div className="d-flex ">
                                    <EnvironmentOutlined className="mt-1" />
                                    <p className="ml-2"> {e.address.location}</p>
                                  </div>
                                </div>

                              )
                              : "No have start time events "
                          }>
                            <h4 >{item.name}</h4>
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
                    </ Link>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
 */}


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
    // events: state.event.events,
  };
};

const mapDispatchToProps = (dispatch) => ({
  // getListEvent: () => dispatch(eventActions.getListEvent()),
  getHomeData: () => dispatch(eventActions.getHomeData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
