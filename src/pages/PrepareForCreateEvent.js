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

const typeOfEvents = ['Public', 'Private'];

const plainOptions = ['Yes', 'No'];

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
      isFirstLoad: true,
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      isFirstLoad: true,
    });
  };

  checkWebAddress = (rule, value, callback) => {
    const regex = /[^\w-_.]/;
    if (regex.test(value) === true) {
      callback('URL  must not contain special letter');
    } else {
      callback();
    }
  };

  onChoose = (type, value) => {
    this.setState({
      [type]: value,
      isFirstLoad: true,
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
      isFirstLoad: true,
    });
  };

  handleNext = () => {
    const {
      nameEvent,
      typeOfEvent,
      category,
      quantity,
      address,
      locationName,
      time,
      isSellTicket,
      webAddress,
      map,
    } = this.state;
    const { prepareForCreateEvent } = this.props;
    prepareForCreateEvent(
      nameEvent,
      typeOfEvent,
      category,
      quantity,
      address,
      locationName,
      map,
      time,
      isSellTicket,
      webAddress
    );
    this.setState({
      isFirstLoad: false,
    });
  };

  render() {
    const { pending, errMessage, categories } = this.props;
    const {
      nameEvent,
      quantity,
      locationName,
      isSellTicket,
      webAddress,
      category,
      time,
      typeOfEvent,
      isFirstLoad,
      map,
    } = this.state;

    const next =
      nameEvent &&
      quantity &&
      locationName &&
      webAddress &&
      category &&
      time &&
      typeOfEvent &&
      map;

    const errorStyle = {
      backgroundColor: '#e8b3b3',
      color: '#7d0200',
      borderRadius: '5px ',
      lineHeight: '35px',
      margin: '10px 100px',
      padding: '1px 20px',
    };
    const urlIMG =
      'https://res.cloudinary.com/dklfyelhm/image/upload/v1584932729/Event/hand_iind0n.png';

    return (
      <div className="pt-3 pl-5 pr-5">
        <div className="d-flex justify-content-center">
          <Link to="/">
            <img alt="logo" src={urlIMG} />
          </Link>
        </div>

        {/* {errMessage && (
          <div className="error-message mt-2 mb-2">{errMessage}</div>
        )} */}

        {errMessage && !isFirstLoad && (
          <div style={errorStyle}>{errMessage}</div>
        )}

        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <span className="p-5">
                <SettingTwoTone />
                What
              </span>
            }
            key="1"
          >
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
                  {
                    validator: this.checkWebAddress,
                  },
                ]}
              >
                <Input
                  addonBefore="http://event-in-your-hand/event/"
                  value={webAddress}
                  name="webAddress"
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
                  name="category"
                  onChange={(value) => this.onChoose('category', value)}
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
          </TabPane>
          <TabPane
            tab={
              <span className="p-5">
                <InfoCircleTwoTone />
                Which
              </span>
            }
            key="2"
          >
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
                  onChange={(value) => this.onChoose('typeOfEvent', value)}
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
                  name="isSellTicket"
                  onChange={this.onChange}
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
                <AutoCompletePlace
                  handleAddressChange={(value) =>
                    this.onChoose('address', value)
                  }
                  handleMapChange={(value) => this.onChoose('map', value)}
                />
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

          <Button
            size="large"
            type="primary"
            className="ml-3"
            disabled={!next}
            loading={pending}
            onClick={this.handleNext}
          >
            Finish
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.event.categories,
  pending: state.event.pending,
  errMessage: state.event.errMessage,
});

const mapDispatchToProps = (dispatch) => ({
  prepareForCreateEvent: (
    nameEvent,
    typeOfEvent,
    category,
    quantity,
    address,
    locationName,
    map,
    time,
    isSellTicket,
    webAddress
  ) =>
    dispatch(
      eventActions.prepareForCreateEvent(
        nameEvent,
        typeOfEvent,
        category,
        quantity,
        address,
        locationName,
        map,
        time,
        isSellTicket,
        webAddress
      )
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrepareForCreateEvent);
