import React, { Component } from 'react';
import { Form, Radio } from 'antd';
import UploadImage from '../templates/ui-elements/shares/UploadImage';

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
  handleChange = (e) => {
    const { name, value } = e.target;
    const { onChange } = this.props;
    onChange(name, value);
  };

  onImageDrop = (url) => {
    console.log(url);
    const { onChange } = this.props;
    onChange('banner', url);
  };

  render() {
    const { isSellTicket, typeOfEvent, banner } = this.props;

    return (
      <div className="p-5">
        <Form {...layout} name="control-ref">
          <Form.Item
            label="Type of event "
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Radio.Group
              options={typeOfEvents}
              name="typeOfEvent"
              onChange={this.handleChange}
              value={typeOfEvent}
            />
          </Form.Item>

          <Form.Item label="Banner ">
            <UploadImage url={banner} handleImageDrop={this.onImageDrop} />
          </Form.Item>

          <Form.Item
            label="Sell Ticket"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Radio.Group
              options={plainOptions}
              name="isSellTicket"
              onChange={this.handleChange}
              value={isSellTicket}
            />
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default TabPane;
