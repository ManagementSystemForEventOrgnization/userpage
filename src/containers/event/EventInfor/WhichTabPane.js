import React, { Component } from 'react';
import { Form, Radio, Collapse, InputNumber, Input } from 'antd';
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
const uploadingMethods = ['Upload from  device', 'Input from link'];

const { Panel } = Collapse;

class TabPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadingMethod: uploadingMethods[0],
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    const { onChange } = this.props;
    onChange(name, value);
  };

  onImageDrop = (url) => {
    const { onChange } = this.props;
    setTimeout(onChange('banner', url), 3000);
  };

  handleChangeTicket = (type, value) => {
    const { onChange } = this.props;
    let newTicket = this.props.ticket;
    newTicket[type] = value;
    setTimeout(onChange('ticket', newTicket), 3000);
  };

  handleChangeUploadingMethod = (e) => {
    this.setState({
      uploadingMethod: e.target.value,
    });
  };
  render() {
    const { isSellTicket, typeOfEvent, banner, ticket } = this.props;
    const { uploadingMethod } = this.state;

    return (
      <div className="p-5">
        <Form
          {...layout}
          name="control-ref"
          initialValues={{ bannerUrl: banner }}
        >
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

          <Form.Item label="Banner">
            <Radio.Group
              options={uploadingMethods}
              name="uploadingMethod"
              onChange={this.handleChangeUploadingMethod}
              value={uploadingMethod}
            />
            <Collapse
              //   defaultActiveKey="1"
              className="mt-4"
              style={{ width: '800px' }}
            >
              <Panel header="Banner/Poster Infor" key="1">
                {uploadingMethod === uploadingMethods[0] ? (
                  <UploadImage
                    url={banner}
                    handleImageDrop={this.onImageDrop}
                  />
                ) : (
                  <Form.Item
                    name="bannerUrl"
                    label="Banner Url"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      value={banner}
                      onChange={(e) => this.onImageDrop(e.target.value)}
                    />
                  </Form.Item>
                )}
              </Panel>
            </Collapse>
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
            {isSellTicket !== 'No' ? (
              <Collapse
                defaultActiveKey="1"
                className="mt-4"
                style={{ width: '800px' }}
              >
                <Panel header="Ticket information" key="1">
                  <div className="d-flex">
                    <p className="mr-5">Price : </p>
                    <InputNumber
                      defaultValue={ticket.price}
                      min={0}
                      formatter={(value) => `${value}VND`}
                      parser={(value) => value.replace('VND', '')}
                      onChange={(value) =>
                        this.handleChangeTicket('price', value)
                      }
                    />
                  </div>
                  <div className="d-flex mt-3">
                    <p className="mr-4">Discount:</p>
                    <InputNumber
                      defaultValue={ticket.discount}
                      min={0}
                      max={100}
                      formatter={(value) => `${value}%`}
                      parser={(value) => value.replace('%', '')}
                      onChange={(value) =>
                        this.handleChangeTicket('discount', value)
                      }
                    />
                  </div>
                </Panel>
              </Collapse>
            ) : (
                <></>
              )}
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default TabPane;
