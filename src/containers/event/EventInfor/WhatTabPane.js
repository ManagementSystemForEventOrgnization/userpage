import React, { Component } from 'react';
import { connect } from 'react-redux';
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
  handleChange = (value, name) => {
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
    const { nameEvent, webAddress, categories, category } = this.props;
    return (
      <Form
        {...layout}
        name="control-ref"
        className="pt-5 " style={{ fontSize: '24px', fontWeight: 500 }}
        initialValues={{ nameEvent, webAddress }}
      >
        <Form.Item
          name="nameEvent"
          label="Name of event "
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            onChange={(e) => this.handleChange(e.target.value, 'nameEvent')}
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
            onChange={(e) => this.handleChange(e.target.value, 'webAddress')}
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
            onChange={this.handleChangeCategory}
            defaultValue={category}
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

export default connect(null, null)(TabPane);
