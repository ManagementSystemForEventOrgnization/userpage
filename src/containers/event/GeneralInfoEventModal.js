import React from 'react';
import { connect } from 'react-redux';

import { Form, Input, Button, Select, Modal, DatePicker, Radio } from 'antd';
import { Link } from 'react-router-dom';
import { StarFilled } from '@ant-design/icons';
import moment from 'moment';

import AutoCompletePlace from '../share/AutoCompletePlace';
import { eventActions } from '../../action/event.action';

const { Option } = Select;
const { RangePicker } = DatePicker;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
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

const typeOfEvents = ['Công Khai', 'Bí Mật'];

const plainOptions = ['Có', 'Không'];

class GeneralInfoEventModal extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      nameEvent: '',
      typeOfEvent: '',
      category: '',
      quantity: 100,
      address: '',
      locationName: '',
      time: {},
      isSellTicket: 'Không',
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    const {
      nameEvent,
      typeOfEvent,
      category,
      quantity,
      address,
      locationName,
      time,
      isSellTicket,
    } = this.state;
    const { prepareForCreateEvent } = this.props;
    prepareForCreateEvent(
      nameEvent,
      typeOfEvent,
      category,
      quantity,
      address,
      locationName,
      time,
      isSellTicket
    );
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  onChange = (e) => {
    // normal onchange for input
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
    console.log(time);

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
      visible,
      nameEvent,
      quantity,
      locationName,
      isSellTicket,
    } = this.state;

    const activeNext = nameEvent && quantity !== 0;
    const { isLogined } = this.props;
    return (
      <div>
        {!isLogined ? (
          <Link to="/login">
            <Button type="danger" icon={<StarFilled />} size="large">
              Hãy đăng nhập để khám phá ngay
            </Button>
          </Link>
        ) : (
          <div>
            <Button
              type="danger"
              icon={<StarFilled />}
              size="large"
              onClick={this.showModal}
            >
              Khám phá ngay
            </Button>
            <Modal
              title="Hãy cho chúng tôi biết một số thông tin cơ bản dưới đây"
              visible={visible}
              onCancel={this.handleCancel}
              style={{
                overflowY: 'scroll',
                height: '500px',
              }}
              width="1000px"
              footer={[
                <Button key="back" onClick={this.handleCancel}>
                  Hủy
                </Button>,

                <Button
                  key="submit"
                  type="primary"
                  disabled={!activeNext}
                  onClick={this.handleOk}
                >
                  <Link to="/create">Tiếp tục</Link>
                </Button>,
              ]}
            >
              <Form {...layout} ref={this.formRef} name="control-ref">
                <Form.Item
                  name="name"
                  label="Tên sự kiện "
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
                  name="category"
                  label="Loại sự kiện"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    placeholder="Chọn 1 loại sự kiện ở dưới"
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
                <Form.Item
                  name="locationName"
                  label="Địa chỉ cụ thể"
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
                // thêm 1 item cho phép nhập domain => check domain hợp lệ :
                /[^\w-]/
                <Form.Item
                  name="address"
                  label="Địa chỉ "
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <AutoCompletePlace />
                </Form.Item>
                <Form.Item
                  name="time"
                  label="Thời gian"
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
                <Form.Item
                  name="typeOfEvent"
                  label="Loại hình thức"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    placeholder="Chọn hình thức cho sự kiện"
                    onChange={this.onTypeOfVentChange}
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
                  label="Bán vé"
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
            </Modal>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLogined: state.user.isLogined,
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
)(GeneralInfoEventModal);
