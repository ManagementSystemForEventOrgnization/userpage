import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';

const { Option } = Select;

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

class TabPane extends Component {
  handleChange = (e) => {
    const { value, name } = e.target;
    const { onChange } = this.props;
    onChange(name, value);
  };

  handleChangeCategory = (value) => {
    const { onChange } = this.props;
    onChange('category', value);
  };

  checkWebAddress = (rule, value, callback) => {
    const regex = /[^\w-_.]/;
    if (regex.test(value) === true) {
      return callback('URL  must not contain special letter');
    }
    return;
  };

  render() {
    const { nameEvent, webAddress, categories } = this.props;

    return (
      <Form {...layout} name="control-ref" className="pt-5">
        <Form.Item
          name="name"
          label="Name of event "
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            value={nameEvent}
            name="nameEvent"
            onChange={this.handleChange}
          />
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
          <Input
            addonBefore={process.env.REACT_APP_DOMAIN_EVENT}
            value={webAddress}
            name="webAddress"
            onChange={this.handleChange}
          />
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
      </Form>
    );
  }
}

export default TabPane;
