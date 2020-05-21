import React, { Component } from 'react';
import { Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import { FieldTimeOutlined, UserOutlined } from '@ant-design/icons';

export default class Event extends Component {
  render() {
    const { eventDetail } = this.props;
    return (
      <Link to="">
        <Card
          className="event-cart"
          cover={<img className="img" alt="example" src={eventDetail.urlWeb} />}
        >
          <h5>{eventDetail.name}</h5>
          <div className="d-flex">
            <FieldTimeOutlined className="mt-1" />
            <p className="ml-2"> {eventDetail.startTime}</p>
          </div>

          <div className="d-flex">
            <UserOutlined className="mt-1" />
            <p className="ml-2">{eventDetail.limitNumber}</p>
          </div>
          <Button type="primary">Apply</Button>
        </Card>
      </Link>
    );
  }
}
