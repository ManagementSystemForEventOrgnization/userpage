import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Card, Button } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';

const categoryStyle = {
  textAlign: 'center',
  background: '#ff4d4f',
  color: '#fff',
  fontWeight: 'bold',
  padding: '3px 10px 2px 10px',
  marginRight: '13px',
};

const timeStyle = {
  fontWeight: 'bold',
  textTransform: 'uppercase',
};
const priceStyle = {
  textDecoration: 'line-through',
  fontWeight: 'bold',
};

const netPriceStyle = { fontWeight: 'bold' };

class EventCard extends Component {
  percentDiscount = (discount) => {
    let newDiscount = discount * 100;
    let percent = `-${newDiscount}%`;
    return percent;
  };

  sumDiscount = (ticket, discount) => {
    let newDiscount = 1 - discount;
    let sum = newDiscount * ticket;
    let money = `${sum} VNĐ `;
    return money;
  };

  render() {
    const { eventInfo } = this.props;
    const category = eventInfo.eventCategory || eventInfo.eventCategories;
    return (
      <Link to={'/event/' + eventInfo.urlWeb} target="_blank">
        <Card
          className="event-cart "
          cover={
            <div>
              {eventInfo.isSellTicket === true ||
              eventInfo.isSellTicket === 'Yes' ? (
                <div className="d-flex ">
                  {eventInfo.ticket.discount ? (
                    <Button className="ml-1 mt-1 ticket">
                      {this.percentDiscount(eventInfo.ticket.discount)}
                    </Button>
                  ) : (
                    ''
                  )}
                </div>
              ) : (
                <Button className="ml-1 mt-1 ticket">Free</Button>
              )}
              {eventInfo.bannerUrl && (
                <img className="img " alt="example" src={eventInfo.bannerUrl} />
              )}
            </div>
          }
        >
          <div className="row">
            <p className="col" style={categoryStyle}>
              {category.name}
            </p>
            <p className="ml-2 col" style={timeStyle}>
              {moment(eventInfo.session[0].day).format('DD/MM/YYYY ')}
            </p>
          </div>

          <div className="d-flex ">
            <h5 className="ml-2 line-clamp "> {eventInfo.name}</h5>
            <div>
              {eventInfo.session.length === 1 ? (
                ''
              ) : (
                <p className="ml-2" style={{ fontWeight: 'bold' }}>
                  + {eventInfo.session.length - 1}more events
                </p>
              )}
            </div>
          </div>

          <div>
            {eventInfo.ticket ? (
              <div className="d-flex ">
                {eventInfo.ticket.discount ? (
                  <div className="d-flex ">
                    <p style={priceStyle} className="ml-1 ">
                      {eventInfo.ticket.price}
                    </p>
                    <p className="ml-3" style={netPriceStyle}>
                      {this.sumDiscount(
                        eventInfo.ticket.price,
                        eventInfo.ticket.discount
                      )}
                    </p>
                  </div>
                ) : (
                  <p className=" mt-1 " style={netPriceStyle}>
                    {eventInfo.ticket.price} VNĐ
                  </p>
                )}
              </div>
            ) : (
              <p style={netPriceStyle} className="ml-1  ">
                0 VNĐ
              </p>
            )}
          </div>

          <div className="d-flex ">
            <EnvironmentOutlined className="mt-1" />
            <p className="ml-2 address ">
              {eventInfo.session[0].address.location}
            </p>
          </div>
        </Card>
      </Link>
    );
  }
}

export default EventCard;
