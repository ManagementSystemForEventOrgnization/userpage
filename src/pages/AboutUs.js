import React from 'react';
import { Button, Menu } from 'antd';
import { CheckOutlined, DeleteOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

class AboutUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  collapse = () => {
    const { visible } = this.state;
    this.setState({
      visible: !visible,
    });
  };

  render() {
    const { visible } = this.state;
    const showStyle = {
      //   height: '100px',
      //   width: '200px',
    };
    const hideStyle = {
      display: 'none',
    };
    return (
      <div>
        <Button onClick={this.collapse}>Click me</Button>
        <Menu
          style={visible ? showStyle : hideStyle}
          mode="vertical-right"
          className="more-menu"
        >
          <Menu.Item key="1" icon={<CheckOutlined />} className="more-item">
            Mark as read
          </Menu.Item>
          <Menu.Item key="2" icon={<DeleteOutlined />} className="more-item">
            Delete
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default connect(null, null)(AboutUs);
