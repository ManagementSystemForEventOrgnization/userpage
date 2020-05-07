import React, { Component } from 'react';
import { Form, DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

class TabPane extends Component {
  onChangeTime = (dates, dateStrings) => {
    const { onChange } = this.props;
    const time = {
      from: dates[0],
      to: dates[1],
      fromString: dateStrings[0],
      toString: dateStrings[1],
    };
    onChange('time', time);
  };
  render() {
    return (
      <Form {...layout} name="control-ref" className="pt-5">
        <Form.Item
          name="time"
          label="Time"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <RangePicker
            ranges={{
              Today: [moment(), moment()],
              'This Month': [
                moment().startOf('month'),
                moment().endOf('month'),
              ],
            }}
            showTime
            format="YYYY/MM/DD HH:mm:ss"
            onChange={this.onChangeTime}
          />
        </Form.Item>
      </Form>
    );
  }
}

export default TabPane;
