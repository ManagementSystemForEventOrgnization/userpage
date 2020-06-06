import React, { Component } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export default class ChangePassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            password: "",
            newPassword: "",
            confirmPassword: ""
        }
    }

    onHandleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            userInfor: {
                ...this.state.userInfor,
                [name]: value,
            },
            isSaved: false
        });
    };

    render() {

        const onFinish = values => {
            console.log('Success:', values);
        };

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };

        return (
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >

                <Form.Item
                    label="Your password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password   onChange={this.onHandleChange}/>
                </Form.Item>

                <Form.Item
                    label="New password"
                    name="newpassword"
                    rules={[{ required: true, message: 'Please input your new password!' }]}
                  
                >
                    <Input.Password   onChange={this.onHandleChange}/>

                </Form.Item>

                <Form.Item
                    label="Confirm password"
                    name="confirmpassword"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password   onChange={this.onHandleChange}/>
                    {this.state.newPassword === this.state.confirmPassword ? (
                        <div></div>
                    ) : (
                            <div className="text-danger">Invalid confirm password</div>
                        )}
                </Form.Item>


                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                </Button>
                </Form.Item>
            </Form>
        );
    }
}
