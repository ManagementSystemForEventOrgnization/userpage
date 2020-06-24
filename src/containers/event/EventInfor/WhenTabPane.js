import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import moment from 'moment';

import DayPicker, { DateUtils } from 'react-day-picker';
import { TimePicker, Input, Button, Form, InputNumber, Collapse } from 'antd';
import { PlusCircleTwoTone, DeleteOutlined } from '@ant-design/icons';

import AutoCompletePlace from '../../share/AutoCompletePlace';
import UploadImage from '../templates/ui-elements/shares/UploadImage';

const { RangePicker } = TimePicker;
const { Panel } = Collapse;
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

class TabPane extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      selectedDays: [],
      session: props.session,
    };
  }

  handleChangeItemSs = (index, item) => {
    const { session } = this.state;
    const { onChange } = this.props;

    const newSS = [
      ...session.slice(0, index),
      item,
      ...session.slice(index + 1, session.length),
    ];
    this.setState({
      session: newSS,
    });
    onChange('session', newSS);
  };

  componentDidMount = () => {
    const { session } = this.props;
    if (session.length === 0) {
      return;
    } else {
      let { selectedDays } = this.state;
      selectedDays = session.map((ss) => ss.day);
      this.setState({ selectedDays });
    }
  };

  handleDayClick = (day, { selected }) => {
    const { selectedDays, session } = this.state;
    const { onChange } = this.props;
    if (selected) {
      const selectedIndex = selectedDays.findIndex((selectedDay) =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDays.splice(selectedIndex, 1);

      const indexSS = session.findIndex(
        (ss) => ss.day.toString() === day.toString()
      );
      session.splice(indexSS, 1);
    } else {
      if (DateUtils.isPastDay(day)) {
        return;
      }
      selectedDays.push(day);

      // const newDay = moment(day).format('DD/MM/YYYY');
      session.push({
        id: uuid(),
        day,
        address: {},
        limitNumber: 100,
        joinNumber: 0,
        name: '',
        documents: [],
        detail: [],
      });
    }

    this.setState({ selectedDays, session });
    onChange('session', session);
  };

  handleChangeAddressValue = (id, type, value) => {
    const { session } = this.state;
    const index = session.findIndex((item) => item.id === id);
    if (index !== -1) {
      let item = { ...session[index] };
      item.address[type] = value;

      this.handleChangeItemSs(index, item);
    }
  };

  handleAddTime = (id) => {
    const { session } = this.state;
    const { onChange } = this.props;
    const index = session.findIndex((item) => item.id === id);
    if (index !== -1) {
      session[index].detail.push({
        id: uuid(),
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

  handleChangeTime = (idSs, idTime, timeString) => {
    const { session } = this.state;
    const index = session.findIndex((item) => item.id === idSs);
    if (index !== -1) {
      let item = { ...session[index] };
      const indexTimeline = item.detail.findIndex((item) => item.id === idTime);
      item.detail[indexTimeline].from = timeString[0];
      item.detail[indexTimeline].to = timeString[1];

      this.handleChangeItemSs(index, item);
    }
  };

  handleChangeDescription = (idSs, idTime, value) => {
    const { session } = this.state;
    const index = session.findIndex((item) => item.id === idSs);
    if (index !== -1) {
      let item = { ...session[index] };
      const indexTimeline = item.detail.findIndex((item) => item.id === idTime);
      item.detail[indexTimeline].description = value;
      this.handleChangeItemSs(index, item);
    }
  };

  handleChangeQuantity = (id, value) => {
    let { session } = this.state;
    const index = session.findIndex((item) => item.id === id);
    if (index !== -1) {
      let item = { ...session[index] };
      item.limitNumber = value;
      this.handleChangeItemSs(index, item);
    }
  };

  handleChangeName = (id, value) => {
    let { session } = this.state;
    const index = session.findIndex((item) => item.id === id);
    if (index !== -1) {
      let item = { ...session[index] };
      item.name = value;
      this.handleChangeItemSs(index, item);
    }
  };

  handleAddDocs = (id) => {
    const { session } = this.state;
    const { onChange } = this.props;
    const index = session.findIndex((item) => item.id === id);
    if (index !== -1) {
      session[index].documents.push({
        id: uuid(),
        url: '',
        title: '',
      });
      this.setState({ session });
      onChange('session', session);
    }
  };

  handleDeleteDocs = (idSs, idDoc) => {
    const { session } = this.state;
    const { onChange } = this.props;
    const indexSS = session.findIndex((item) => item.id === idSs);
    if (indexSS !== -1) {
      const indexItem = session[indexSS].documents.findIndex(
        (item) => item.id === idDoc
      );
      session[indexSS].documents.splice(indexItem, 1);
      this.setState({
        session,
      });
      onChange('session', session);
    }
  };

  handleChangeDoc = (idSs, idDoc, type, value) => {
    const { session } = this.state;
    const index = session.findIndex((item) => item.id === idSs);
    if (index !== -1) {
      let item = { ...session[index] };
      const indexDoc = item.documents.findIndex((item) => item.id === idDoc);
      item.documents[indexDoc][type] = value;
      this.handleChangeItemSs(index, item);
    }
  };

  checkUrl = (rule, value, callback) => {
    const regex = /[^\w-_.]/;
    if (regex.test(value) === true) {
      return callback('URL  must not contain special letter');
    }
    return;
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
          <Form className="col-6 col-md-6" {...layout}>
            <h5 className="mt-3 mb-3">Fill information for each session</h5>
            {session.map((ss, index) => (
              <div className="mt-2" key={ss.id}>
                <h6 className="mt-1 mb-2 ml-5" style={dayStyle}>
                  Session {index + 1} :{' '}
                  {moment(ss.day).format('DD/MM/YYYY').toString()}
                </h6>

                <Collapse defaultActiveKey="1">
                  <Panel header="Information for this session " key="1">
                    <Form.Item
                      label="Name"
                      name={`Name ${index}`}
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        value={ss.name}
                        onChange={(e) =>
                          this.handleChangeName(ss.id, e.target.value)
                        }
                      />
                    </Form.Item>

                    <Form.Item
                      label="Max quantity"
                      name={`Max-quantity ${index}`}
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <InputNumber
                        min={1}
                        value={ss.limitNumber}
                        onChange={(value) =>
                          this.handleChangeQuantity(ss.id, value)
                        }
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
                        address={ss.address}
                        handleAddressChange={(value) =>
                          this.handleChangeAddressValue(
                            ss.id,
                            'location',
                            value
                          )
                        }
                        handleMapChange={(value) =>
                          this.handleChangeAddressValue(ss.id, 'map', value)
                        }
                      />
                    </Form.Item>
                  </Panel>

                  <Panel header="Timeline" key="2">
                    <Form.Item>
                      {ss.detail.map((item) => (
                        <div
                          className="mt-2  d-flex juxtify-content-around"
                          style={{ width: '530px' }}
                          key={item.id}
                        >
                          <RangePicker
                            onChange={(time, timeString) =>
                              this.handleChangeTime(ss.id, item.id, timeString)
                            }
                            className="mr-2"
                            style={{ width: '350px' }}
                          />

                          <Input
                            placeholder="description"
                            name={`desc${item.id}`}
                            className="mr-2"
                            onChange={(event) =>
                              this.handleChangeDescription(
                                ss.id,
                                item.id,
                                event.target.value
                              )
                            }
                          />
                          <DeleteOutlined
                            onClick={() =>
                              this.handleDeleteTime(ss.id, item.id)
                            }
                            style={{ fontSize: '20px', color: 'red' }}
                          />
                        </div>
                      ))}
                    </Form.Item>

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
                  </Panel>
                  <Panel header="Documents" key="3">
                    <Form.Item>
                      {ss.documents.map((doc) => (
                        <div
                          className="d-flex mt-1"
                          key={doc.id}
                          style={{ width: '530px' }}
                        >
                          <Input
                            placeholder="Enter title for documents"
                            name={`title${doc.id}`}
                            onChange={(event) =>
                              this.handleChangeDoc(
                                ss.id,
                                doc.id,
                                'title',
                                event.target.value
                              )
                            }
                          />
                          <Input
                            placeholder="Enter link to your document"
                            className="ml-2 mr-2"
                            name={`url${doc.id}`}
                            onChange={(event) =>
                              this.handleChangeDoc(
                                ss.id,
                                doc.id,
                                'url',
                                event.target.value
                              )
                            }
                          />
                          <DeleteOutlined
                            onClick={() => this.handleDeleteDocs(ss.id, doc.id)}
                            style={{ fontSize: '20px', color: 'red' }}
                          />
                        </div>
                      ))}
                    </Form.Item>

                    <Button
                      className="mt-1"
                      onClick={() => this.handleAddDocs(ss.id)}
                      icon={
                        <PlusCircleTwoTone
                          style={{ fontSize: '20px', color: '#eb2f96' }}
                          className="mr-2"
                        />
                      }
                    >
                      Add link
                    </Button>
                  </Panel>

                  <Panel header="Image detail for this location" key="4">
                    <Form.Item>
                      <UploadImage
                        url={ss.address.detailImage || ''}
                        handleImageDrop={(value) =>
                          this.handleChangeAddressValue(
                            ss.id,
                            'detailImage',
                            value
                          )
                        }
                      />
                    </Form.Item>
                  </Panel>
                </Collapse>
                <hr />
              </div>
            ))}
          </Form>
        )}
      </div>
    );
  }
}

export default connect(null, null)(TabPane);
