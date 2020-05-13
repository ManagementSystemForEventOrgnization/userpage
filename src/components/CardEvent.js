import React, { Component } from 'react'
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import {
    FieldTimeOutlined,
} from '@ant-design/icons';

export default class Event extends Component {
    render() {
        const { eventDetail } = this.props;
        return (
            <Link to="">
                <Card
                    className="event-cart"
                    cover={
                        <img className="img"
                            alt="example"
                            src={eventDetail.urlWeb}
                        />
                    }
                >
                    <b >{eventDetail.name}</b>
                    <p ><FieldTimeOutlined /> {eventDetail.startTime}</p>
                    <p > {eventDetail.address}</p>
                </Card>
            </Link>
        )
    }
}
