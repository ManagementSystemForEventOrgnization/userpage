import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Form, Input, Button } from 'antd';

import Text from '../../atoms/Text';


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 14,
        span: 10,
    },
};

class ContactUs1 extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }



    onFinish = values => {
        console.log('Success:', values);
    };

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    render() {
        const style = {
            margin: '10px',
            padding: '10px'
        }
        const titleStyle = {
            fontWeight: 'bolder',
            fontSize: '40'
        }
        return (
            <div className="child-block" style={style}>
                <Row >
                    <Col span={10}>
                        <Text content="Contact Us" style={titleStyle} />
                        <Text />
                    </Col>
                    <Col span={14} className="pt-5 pr-5">
                        <Form
                            {...layout}
                            name="basic"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}
                        >
                            <Form.Item
                                label="Fullname"
                                name="fullname"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your name!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item label="Content"
                                name="content"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input content!',
                                    },
                                ]} >
                                <Input />
                            </Form.Item>

                            <Form.Item  {...tailLayout}>
                                <Button type="primary" htmlType="submit">
                                    Send
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ContactUs1
