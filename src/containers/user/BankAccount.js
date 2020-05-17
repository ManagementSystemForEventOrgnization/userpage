import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';

export default class BankAccount extends Component {
  render() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    const validateMessages = {
      required: '${label} is required!',
      types: {
        number: '${label} is not a validate number!',
      },
      number: {
        range: '${label} must be between ${min} and ${max}',
      },
    };

    const onFinish = (values) => {
      console.log(values);
    };

    return (
      <div className="bank-account mb-5 mt-5 p-5 border rounded bg-secondary">
        <h4>Thông tin tài khoản của bạn</h4>
        <Form
          className="mr-5 mt-5"
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={['user', 'owner']}
            label="Chủ tài khoản"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'bankNumber']}
            label="số tài khoản"
            rules={[{ required: true, type: 'number', min: 8, max: 20 }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'bankName']}
            label="Tên ngân hàng"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'branch']}
            label="Chi nhánh"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
            <Button type="primary" htmlType="submit">
              Lưu lại
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
