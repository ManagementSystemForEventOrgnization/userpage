import React from 'react';
import { connect } from 'react-redux';
import { Button, Card } from 'antd';
import Header from '../containers/share/_layout/Header';
import Footer from '../containers/share/_layout/Footer';
import Banner from '../components/Banner';
import { eventActions } from '../action/event.action';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { EnvironmentOutlined } from '@ant-design/icons';
import NavBar from 'components/NavBar';
class CategoryDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    const { getListEvent } = this.props;

    const categoryEventId = localStorage.getItem('currentCategory');

    getListEvent(categoryEventId);
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

  render() {
    const { hlEvent } = this.props;
    return (
      <div className="category-detail homepage">
        <div className="fixed-top">
          <Header />

          <NavBar />
        </div>
        <Banner />
        <div className="list-event mt-5 mb-5  " style={{ marginTop: '5%' }}>
          <div className="up-coming pl-2">
            <div className="row p-5 ">
              {hlEvent.map((item, index) => (
                <div className="col-xl-4 col-lg-4 col-md-6 mt-4">
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
                                  <Button className="ml-1 mt-1 ticket">
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

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // map state of store to props
  hlEvent: state.event.hlEvent,
});

const mapDispatchToProps = (dispatch) => ({
  getListEvent: (categoryEventId) =>
    dispatch(eventActions.getListEvent(categoryEventId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetailPage);
