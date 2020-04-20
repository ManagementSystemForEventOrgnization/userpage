import React, { Component } from 'react'
import Image from '../../atoms/Image';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';
import { Row, Col } from 'antd';

class Scheduel1 extends Component {
    constructor(props) {
        super(props)

        this.state = {
            scheduelText: [
                {
                    id: 1,
                    time: "8 : 00 AM",
                    title: " Coffee & Conversation",
                    description: "Coffee is usually brewed immediately before drinking. In most areas, coffee may be purchased unprocessed, or already roasted, or already"
                },
                {
                    id: 2,
                    time: "8 : 00 AM",
                    title: " Coffee & Conversation",
                    description: "Coffee is usually brewed immediately before drinking. In most areas, coffee may be purchased unprocessed, or already roasted, or already"
                }
            ]


        }
    }

    render() {
        const { scheduelText } = this.state;
        return (
            <div className="banner-block-3">
                <h5>Scheduel</h5>
                {scheduelText.map(scheduel =>
                    <Row className="mt-4">

                        <Col span={18} push={6}>

                            <Text content={scheduel.title}></Text>
                            <Text content={scheduel.description}></Text>
                        </Col>
                        <Col span={6} pull={18}>
                            <Text content={scheduel.time}></Text>
                        </Col>
                    </Row>,
                )}

            </div>
        )
    }
}

export default Scheduel1
