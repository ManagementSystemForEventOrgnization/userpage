import React, { Component } from 'react'
import { Row, Col } from 'antd'

import Text from '../../atoms/Text'

class EventDescription2 extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div className="child-block">
                <Row>
                    <Col span={16}>
                        <Text content="title 1" />
                        <Text />
                    </Col>
                    <Col span={8}>
                        <Text content="title 2" />
                        <Text />
                    </Col>
                </Row>
            </div>

        )
    }
}

export default EventDescription2
