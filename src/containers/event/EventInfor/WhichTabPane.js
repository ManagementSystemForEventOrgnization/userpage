import React, { Component } from 'react';
import { Form, Input, Select, Radio } from 'antd';

const { Option } = Select;

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const typeOfEvents = ['Public', 'Private'];

const plainOptions = ['Yes', 'No'];

class TabPane extends Component {
  handleChangeType = (value) => {
    const { onChange } = this.props;
    onChange('typeOfEvent', value);
  };

  handleChangeSellTicket = (e) => {
    const { name, value } = e.target;
    const { onChange } = this.props;
    onChange(name, value);
  };

  handleChangeQuantity = (e) => {
    const { name, value } = e.target;
    const { onChange } = this.props;
    onChange(name, value);
  };
  render() {
    const { quantity, isSellTicket } = this.props;

    return (
      <Form {...layout} name="control-ref" className="pt-5">
        <Form.Item
          name="typeOfEvent"
          label="Type of event"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Type of event"
            onChange={this.handleChangeType}
            allowClear
          >
            {typeOfEvents.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Số lượng người tham gia dự kiến"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            value={quantity}
            name="quantity"
            onChange={this.handleChangeQuantity}
          />
        </Form.Item>
        <Form.Item
          label="Ticket"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Radio.Group
            options={plainOptions}
            name="isSellTicket"
            onChange={this.handleChangeSellTicket}
            value={isSellTicket}
          />
        </Form.Item>
      </Form>
    );
  }
}

export default TabPane;
