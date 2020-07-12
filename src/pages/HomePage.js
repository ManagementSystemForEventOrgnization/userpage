import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';

import Banner from 'components/Banner';
import Orgnization from 'components/Orgnization';
import NavBar from 'components/NavBar';
import Chat from 'containers/chat/ChatWidget';
import EventCard from 'components/EventCard';

import { eventActions } from '../action/event.action';
import { responsive } from 'containers/event/templates/constants/atom.constant';

const HIGHT = {
  textAlign: 'center',
  color: '333333',
  fontWeight: '700',
  fontSize: '36px',

  marginBottom: '20px',
  textTransform: 'capitalize',
  textShadow: '0 0 3px #161821',
};

const seeAllButton = {
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
    getListEventUpComing(pageNumber, numberRecord);
    getListEvent(sentData);
  };

  renderHighLightEvent = () => {
    let { hlEvent } = this.props;
    hlEvent = hlEvent || [];
    return hlEvent.length > 0 ? (
      <div
        className="slide-container p-4 ml-5 mt-5 "
        style={{
          backgroundColor: ' #f1f1f1',
        }}
      >
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
            <Link key={index} to={'/event/' + item.urlWeb} target="_blank">
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
    let { events } = this.props;
    events = events || [];
    return events.length > 0 ? (
      <div
        className="row p-5  "
        style={{
          backgroundColor: ' #f1f1f1',
        }}
      >
        {events.map((item) => (
          <div className="col-xl-4 col-lg-4 col-md-6 mt-4 " key={item._id}>
            <EventCard eventInfo={item} />
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
        <NavBar />
        <Banner />
        <div style={{ marginTop: '10%' }}>
          <h1 style={HIGHT}> Highlight Event</h1>

          {hightLightFinishLoading ? (
            <div
              style={{ textAlign: 'center', backgroundColor: ' #f1f1f1' }}
              className="pt-5 pb-5"
            >
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
            <div
              style={{ textAlign: 'center', backgroundColor: ' #f1f1f1' }}
              className="pt-5 pb-5"
            >
              <img
                src="https://res.cloudinary.com/eventinyourhand/image/upload/v1592767124/LoadingGif/download_cojul1.gif"
                alt="no-upcoming"
              />
            </div>
          ) : (
            this.renderUpcomingEvent()
          )}
        </div>
        <hr></hr>' '{' '}
        <Link to="/event-list/all-events">
          <Button style={seeAllButton}>View All Events</Button>
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
