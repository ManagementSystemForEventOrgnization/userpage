import React, { Component } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import { TimePicker, Input, Button, Form, InputNumber } from 'antd';
import { PlusCircleTwoTone, DeleteOutlined } from '@ant-design/icons';
import AutoCompletePlace from '../../share/AutoCompletePlace';

import 'react-day-picker/lib/style.css';

const { RangePicker } = TimePicker;

class TabPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDays: [],
      session: [],
    };
  }

  handleDayClick = (day, { selected }) => {
    const { selectedDays, session } = this.state;
    const { onChange } = this.props;
    if (selected) {
      const selectedIndex = selectedDays.findIndex((selectedDay) =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDays.splice(selectedIndex, 1);
      const indexSS = session.findIndex((ss) => ss.id === day.toString());
      session.splice(indexSS, 1);
    } else {
      if (DateUtils.isPastDay(day)) {
        return;
      }
      selectedDays.push(day);
      session.push({
        id: day.toString(),
        day,
        address: {},
        quantity: 100,
        detail: [
          {
            id: 0,
            from: '',
            to: '',
            description: '',
          },
        ],
      });
    }

    this.setState({ selectedDays, session });
    onChange('session', session);
  };

  handleChangeAddress = (id, address) => {
    const { session } = this.state;
    const { onChange } = this.props;
    const index = session.findIndex((item) => item.id === id);
    if (index !== -1) {
      let item = { ...session[index] };
      item.address['location'] = address;
      const newSS = [
        ...session.slice(0, index),
        item,
        ...session.slice(index + 1, session.length),
      ];

      this.setState({ session: newSS });
      onChange('session', session);
    }
  };

  handleChangeMap = (id, map) => {
    let { session } = this.state;
    const { onChange } = this.props;
    const index = session.findIndex((item) => item.id === id);
    if (index !== -1) {
      let item = { ...session[index] };
      item.address['map'] = map;
      session = [
        ...session.slice(0, index),
        item,
        ...session.slice(index + 1, session.length),
      ];
      this.setState({ session });
      onChange('session', session);
    }
  };

  handleAddTime = (id) => {
    const { session } = this.state;
    const { onChange } = this.props;
    const index = session.findIndex((item) => item.id === id);
    if (index !== -1) {
      session[index].detail.push({
        id: session[index].detail.length,
        from: '',
        to: '',
        description: '',
      });
      this.setState({ session });
      onChange('session', session);
    }
  };

  handleDeleteTime = (idSs, idTime) => {
    const { session } = this.state;
    const { onChange } = this.props;
    const indexSS = session.findIndex((item) => item.id === idSs);
    if (indexSS !== -1) {
      const indexItem = session[indexSS].detail.findIndex(
        (item) => item.id === idTime
      );
      session[indexSS].detail.splice(indexItem, 1);
      this.setState({
        session,
      });
      onChange('session', session);
    }
  };

  handleChangeTime = (idSs, idTime, time, timeString) => {
    const { session } = this.state;
    const { onChange } = this.props;
    const index = session.findIndex((item) => item.id === idSs);
    if (index !== -1) {
      let item = { ...session[index] };
      item.detail[idTime].from = timeString[0];
      item.detail[idTime].to = timeString[1];

      const newSS = [
        ...session.slice(0, index),
        item,
        ...session.slice(index + 1, session.length),
      ];
      this.setState({
        session: newSS,
      });
      onChange('session', newSS);
    }
  };

  handleChangeDescription = (idSs, idTime, value) => {
    const { session } = this.state;
    const { onChange } = this.props;
    const index = session.findIndex((item) => item.id === idSs);
    if (index !== -1) {
      let item = { ...session[index] };
      item.detail[idTime].description = value;
      const newSS = [
        ...session.slice(0, index),
        item,
        ...session.slice(index + 1, session.length),
      ];
      this.setState({
        session: newSS,
      });
      onChange('session', newSS);
    }
  };

  handleChangeQuantity = (id, value) => {
    let { session } = this.state;
    const { onChange } = this.props;
    const index = session.findIndex((item) => item.id === id);
    if (index !== -1) {
      let item = { ...session[index] };
      item.quantity = value;
      session = [
        ...session.slice(0, index),
        item,
        ...session.slice(index + 1, session.length),
      ];
      this.setState({ session });
      onChange('session', session);
    }
  };

  render() {
    const { selectedDays, session } = this.state;
    const count = selectedDays.length;
    const dayStyle = {
      color: 'blue',
    };

    return (
      <div className="row container justify-content-md-center">
        <div className={count === 0 ? 'col-md-auto ' : 'col-6 col-md-6 pl-5'}>
          <h5 className="mt-3 mb-3">Choose day(s) for the session(s)</h5>
          <DayPicker
            selectedDays={selectedDays}
            onDayClick={this.handleDayClick}
          />
        </div>

        {count !== 0 && (
          <div className="col-6 col-md-6">
            <h5 className="mt-3 mb-3">Fill information for each session</h5>
            {session.map((ss) => (
              <div className="mt-2 " key={ss.id}>
                <div className="mt-1 mb-1" style={dayStyle}>
                  {ss.day.toString()}
                </div>
                <div className="d-flex mb-2">
                  <p className="mr-2">Max quantity : </p>

                  <InputNumber
                    min={1}
                    value={ss.quantity}
                    onChange={(value) =>
                      this.handleChangeQuantity(ss.id, value)
                    }
                  />
                </div>
                <div className=" row">
                  <p className="col-sm-2">Address :</p>
                  <div className="col-sm-10">
                    <AutoCompletePlace
                      address={ss.address}
                      handleAddressChange={(value) =>
                        this.handleChangeAddress(ss.id, value)
                      }
                      handleMapChange={(value) =>
                        this.handleChangeMap(ss.id, value)
                      }
                    />
                  </div>
                </div>

                {ss.detail.map((item, index) => (
                  <Form className="mt-1  d-flex" key={index}>
                    <Form.Item>
                      <RangePicker
                        className="mr-2"
                        onChange={(time, timeString) =>
                          this.handleChangeTime(
                            ss.id,
                            item.id,
                            time,
                            timeString
                          )
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      name={`desc${index}`}
                      className="mr-2"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        placeholder="description"
                        name={`desc${index}`}
                        className="mr-2"
                        onChange={(value) =>
                          this.handleChangeDescription(ss.id, item.id, value)
                        }
                      />
                    </Form.Item>
                    <Form.Item>
                      <DeleteOutlined
                        onClick={() => this.handleDeleteTime(ss.id, item.id)}
                        style={{ fontSize: '20px', color: 'red' }}
                      />
                    </Form.Item>
                  </Form>
                ))}

                <Button
                  className="mt-1"
                  onClick={() => this.handleAddTime(ss.id)}
                  icon={
                    <PlusCircleTwoTone
                      style={{ fontSize: '20px', color: '#eb2f96' }}
                      className="mr-2"
                    />
                  }
                >
                  Add time
                </Button>
                <hr />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default TabPane;
