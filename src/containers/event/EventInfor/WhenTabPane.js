import React, { Component } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import { TimePicker, Input, Button } from 'antd';
import {
  PlusCircleTwoTone,
  CloseCircleTwoTone,
  DeleteOutlined,
} from '@ant-design/icons';
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
    console.log(selectedDays);
    const count = selectedDays.length;

    if (selected) {
      const selectedIndex = selectedDays.findIndex((selectedDay) =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDays.splice(selectedIndex, 1);
      const indexSS = session.findIndex((ss) => ss.id === day.toString());
      session.splice(indexSS, 1);
    } else {
      selectedDays.push(day);
    }

    const ss = {
      id: day.toString(),
      day,
      address: '',
      detail: [
        {
          from: '',
          to: '',
          desciption: '',
        },
      ],
    };
    session.push(ss);

    this.setState({ selectedDays });
  };

  handleChangeAddress = () => {};

  handleChangeMap = () => {};

  handleAddTime = () => {};

  handleDeleteTime = () => {};

  handleChangeTime = (value) => {};
  handleChangeDescription = (value) => {};

  render() {
    const { selectedDays, session } = this.state;
    const count = selectedDays.length;
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
                <div className="mt-1 mb-1">{ss.day.toString()}</div>
                <AutoCompletePlace
                  handleAddressChange={this.handleChangeAddress}
                  handleMapChange={this.handleChangeMap}
                />
                <div className="d-flex mt-2">
                  <RangePicker
                    className="mr-2"
                    onChange={this.handleChangeTime}
                  />
                  <Input
                    placeholder="desciption"
                    className="mr-2"
                    onChange={this.handleChangeDescription}
                  />
                  <Button
                    type="danger"
                    onClick={this.handleDeleteTime}
                    icon={
                      <DeleteOutlined
                        style={{ fontSize: '20px', color: '#eb2f96' }}
                      />
                    }
                  />
                </div>
                <Button
                  className="mt-1"
                  onClick={this.handleAddTime}
                  icon={
                    <PlusCircleTwoTone
                      style={{ fontSize: '20px', color: '#eb2f96' }}
                      className="mr-2"
                    />
                  }
                >
                  Add time
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default TabPane;
