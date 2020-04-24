import React, { Component } from 'react'
import { Row, Col } from 'antd';
import { MailTwoTone, PhoneTwoTone } from '@ant-design/icons';

import Text from '../../atoms/Text'

class ContactUs2 extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        const { editable } = this.props
        const iconStyle = {
            fontSize: '40px'
        };

        const textStyle = {
            textAlign: 'center'
        }

        const blockStyle = {
            padding: '10px',
            margin: '10px',
            textAlign: 'center'
        }

        return (
            <div className="child-block" style={blockStyle}>

                <Row >
                    <Col span={12} >
                        <MailTwoTone style={iconStyle} />
                        <Text content="123@123.com.vn" style={textStyle} editable={editable} />
                    </Col>
                    <Col span={12}>
                        <PhoneTwoTone style={iconStyle} />
                        <Text content="0123456789" style={textStyle} leftModal={true} editable={editable} />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ContactUs2
