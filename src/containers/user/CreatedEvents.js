import React, { Component } from 'react'
import { Input, Button } from 'antd';
import { Tabs } from 'antd';
import { AppleOutlined, AndroidOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table, Tag } from 'antd';

const { TabPane } = Tabs;

export default class CreatedEvent extends Component {
  render() {

    const columns = [
      {
        title: 'Event Name',
        dataIndex: 'eventName',
        key: 'event-name',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Event Day',
        dataIndex: 'eventDay',
        key: 'event-day',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: tags => (
          <span>
            {tags.map(tag => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'loser') {
                color = 'volcano';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        ),
      },
      {
        title: '',
        key: 'delete',
        render: (text, record) => (
          <span>
            <a style={{ marginRight: 16 }}> {record.name}</a>
            <DeleteOutlined />
          </span>
        ),
      },
    ];

    const data = [
      {
        key: '1',
        eventName: 'John Brown',
        eventDay: "10-10-2021",
        address: 'New York No. 1 Lake Park',
        status: ['developer'],
      },
      {
        key: '2',
        eventName: 'Jim Green',
        eventDay: "10-10-2021",
        address: 'London No. 1 Lake Park',
        status: ['draft'],
      },
      {
        key: '3',
        eventName: 'Joe Black',
        eventDay: "10-10-2021",
        address: 'Sidney No. 1 Lake Park',
        status: ['cool', 'teacher'],
      },
    ];

    return (
      <div className="container mt-5 mr-5 mb-5">
        <h3 className="mb-5">My Events</h3>
        <Tabs defaultActiveKey="2">
          <TabPane
            tab={
              <span>
                <AppleOutlined />
                Upcoming Events
            </span>
            }
            key="1"
          >
            <Table columns={columns} dataSource={data} />
          </TabPane>
          <TabPane tab={
            <span>  <AndroidOutlined />
              Past Event
           </span>
          }
            key="2"
          >
            <Table columns={columns} dataSource={data} />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
