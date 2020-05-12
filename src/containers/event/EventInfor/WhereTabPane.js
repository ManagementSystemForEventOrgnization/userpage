import React, { Component } from 'react';
import { Form, Input } from 'antd';

import AutoCompletePlace from '../../share/AutoCompletePlace';

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

class TabPane extends Component {
  handleChangeLocation = (e) => {
    const { onChange } = this.props;
    const { name, value } = e.target;
    onChange(name, value);
  };

  handleChangeAddress = (value) => {
    const { onChange } = this.props;
    onChange('address', value);
  };

  handleChangeMap = (value) => {
    const { onChange } = this.props;
    onChange('map', value);
  };
  render() {
    const { locationName } = this.props;

    return (
      <Form {...layout} name="control-ref" className="pt-5">
        <Form.Item
          name="locationName"
          label="Detail Address"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            value={locationName}
            name="locationName"
            onChange={this.handleChangeLocation}
          />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <AutoCompletePlace
            handleAddressChange={this.handleChangeAddress}
            handleMapChange={this.handleChangeMap}
          />
        </Form.Item>
      </Form>
    );
  }
}

export default TabPane;
