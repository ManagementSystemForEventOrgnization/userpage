import React, { Component } from 'react';
import { Form, Radio, Collapse, InputNumber } from 'antd';
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
const { Panel } = Collapse;

class TabPane extends Component {
  handleChange = (e) => {
    const { name, value } = e.target;
    const { onChange } = this.props;
    onChange(name, value);
  };

  onImageDrop = (url) => {
    const { onChange } = this.props;
    onChange('banner', url);
  };

  handleChangeTicket = (type, value) => {
    const { onChange } = this.props;
    let newTicket = this.props.ticket;
    newTicket[type] = value;
    setTimeout(onChange('ticket', newTicket), 3000);
  };
  render() {
    const { isSellTicket, typeOfEvent, banner, ticket } = this.props;

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
