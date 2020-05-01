import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Tabs, Form, Input, Button, Select, DatePicker, Radio } from 'antd';
import moment from 'moment';
import {
  SettingTwoTone,
  HourglassTwoTone,
  EnvironmentTwoTone,
  InfoCircleTwoTone,
} from '@ant-design/icons';

import AutoCompletePlace from '../containers/share/AutoCompletePlace';
import { eventActions } from '../action/event.action';

const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const categoryEvents = [
  'Hội nghị',
  'Thể thao',
  'Du lịch',
  'Sân khấu-Nghệ thuật',
  'Tình nguyện',
  'Workshop',
  'Talkshow',
];

const plainOptions = ['Yes', 'No    '];

function callback(key) {
  console.log(key);
}

class PrepareForCreateEvent extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      nameEvent: '',
      typeOfEvent: '',
      category: '',
      quantity: 100,
      address: '',
      locationName: '',
      time: {},
      isSellTicket: 'Không',
      webAddress: '',
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onTypeOfVentChange = (value) => {
    this.setState({
      typeOfEvent: value,
    });
  };

  onCategoryChange = (value) => {
    this.setState({
      category: value,
    });
  };

  onChangeTime = (dates, dateStrings) => {
    const time = {
      from: dates[0],
      to: dates[1],
      fromString: dateStrings[0],
      toString: dateStrings[1],
    };
    this.setState({
      time,
    });
  };

  onChangeSellTicket = (e) => {
    this.setState({
      isSellTicket: e.target.value,
    });
  };

  render() {
    const {
      nameEvent,
      quantity,
      locationName,
      isSellTicket,
      webAddress,
      category,
      time,
      typeOfEvent,
    } = this.state;

    const next =
      nameEvent &&
      quantity &&
      locationName &&
      webAddress &&
      category &&
      time &&
      typeOfEvent;
    const { categories } = this.props;
    const listCategory = categories.length === 0 ? categoryEvents : categories;

    const urlIMG =
      'https://res.cloudinary.com/dklfyelhm/image/upload/v1584932729/Event/hand_iind0n.png';

    return (
      <div className="pt-3 pl-5 pr-5">
        <div className="d-flex justify-content-center">
          <Link to="/">
            <img alt="logo" src={urlIMG} />
          </Link>
        </div>

        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane
            tab={
              <span className="p-5">
                <SettingTwoTone />
                What
              </span>
            }
            key="1"
          >
            <Form
              {...layout}
              ref={this.formRef}
              name="control-ref"
              className="pt-5"
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
                <Input
                  value={nameEvent}
                  name="nameEvent"
                  onChange={this.onChange}
                />
              </Form.Item>

              <Form.Item
                name="webAddress"
                label="Web Address"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  value={webAddress}
                  name="webAddess"
                  onChange={this.onChange}
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
                  onChange={this.onCategoryChange}
                  allowClear
                >
                  {categoryEvents.map((item) => (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane
            tab={
              <span className="p-5">
                <InfoCircleTwoTone />
                When
              </span>
            }
            key="2"
          >
            <Form
              {...layout}
              ref={this.formRef}
              name="control-ref"
              className="pt-5"
            >
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
                  onChange={this.onTypeOfVentChange}
                  allowClear
                >
                  {listCategory.map((item) => (
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
                  onChange={this.onChange}
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
                  onChange={this.onChangeSellTicket}
                  value={isSellTicket}
                />
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane
            tab={
              <span className="p-5">
                <HourglassTwoTone />
                When
              </span>
            }
            key="3"
          >
            <Form
              {...layout}
              ref={this.formRef}
              name="control-ref"
              className="pt-5"
            >
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
          </TabPane>
          <TabPane
            tab={
              <span className="p-5">
                <EnvironmentTwoTone />
                Where
              </span>
            }
            key="4"
          >
            <Form
              {...layout}
              ref={this.formRef}
              name="control-ref"
              className="pt-5"
            >
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
                  onChange={this.onChange}
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
                <AutoCompletePlace />
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
        <hr className="shadow border-bottom" />
        <div className="d-flex float-right">
          <Link to="/">
            <Button size="large" type="primary">
              Back to home
            </Button>
          </Link>
          <Link to="/create">
            <Button
              disabled={!next}
              size="large"
              type="primary"
              className="ml-3"
            >
              Next
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.event.categories,
});

const mapDispatchToProps = (dispatch) => ({
  prepareForCreateEvent: (
    nameEvent,
    typeOfEvent,
    category,
    quantity,
    address,
    locationName,
    time,
    isSellTicket
  ) =>
    dispatch(
      eventActions.prepareForCreateEvent(
        nameEvent,
        typeOfEvent,
        category,
        quantity,
        address,
        locationName,
        time,
        isSellTicket
      )
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrepareForCreateEvent);
