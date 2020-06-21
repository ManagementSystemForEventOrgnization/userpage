import React, { Component } from 'react';
import { Form, Input, Select, Button } from 'antd';

const { Option } = Select;

const categories = [
  {
    _id: 1,
    isDelete: false,
    name: 'abc',
  },
  {
    _id: 2,
    isDelete: false,
    name: 'abc',
  },
  {
    _id: 3,
    isDelete: false,
    name: 'abc',
  },
];
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

class TabPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameEvent: '',
      webAddress: '',
      category: '',
    };
  }

  handleFinish = (values) => {
    console.log(values);
  };

  handleFinishFail = (values) => {
    console.log(values);
  };

  render() {
    return (
      <Form
        {...layout}
        name="control-ref"
        className="pt-5"
        onFinish={this.handleFinish}
        onFinishFailed={this.handleFinishFail}
      >
        <Form.Item
          name="name"
          label="Name of event "
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="webAddress"
          label="Web Address"
          rules={[
            {
              required: true,
            },
            {
              validator: this.checkWebAddress,
            },
          ]}
        >
          <Input addonBefore={process.env.REACT_APP_DOMAIN_EVENT} />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Choose category of event"
            name="category"
            onChange={this.handleChangeCategory}
            allowClear
          >
            {categories.map(
              (item) =>
                !item.isDelete && (
                  <Option key={item._id} value={item._id}>
                    {item.name}
                  </Option>
                )
            )}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default TabPane;
