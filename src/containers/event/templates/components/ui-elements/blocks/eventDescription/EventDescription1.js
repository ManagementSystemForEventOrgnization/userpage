import React, { Component } from 'react'
import { Row, Col } from 'antd'

import Text from '../../atoms/Text'

class EventDescription1 extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        const style = {
            margin: '10px',
            padding: '10px'
        }
        const titleStyle = {
            fontWeight: 'bolder',
            fontSize: '40',
            textAlign: 'left'
        }
        return (
            <div className="child-block" style={style}>
                <Row>
                    <Col span={12}>
                        <Text content="Title 1"
                            style={titleStyle}
                        />
                        <Text />
                    </Col>
                    <Col span={12} >
                        <Text content="Title 2" leftModal={true}
                            style={titleStyle}
                        />
                        <Text leftModal={true} />
                    </Col>
                </Row>
            </div>

        )
    }
}

export default EventDescription1
