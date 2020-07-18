import React from 'react';
import { Menu, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import dataTest from './data/dataTest';
import Dragable from './Dragable';

const { SubMenu } = Menu;

export default class App extends React.Component {
  state = {
    collapsed: false,
  };

  handleToggleCollapsed = () => {
    const { toggleCollapsed } = this.props;
    const { collapsed } = this.state;

    this.setState({
      collapsed: !collapsed,
    });

    toggleCollapsed(collapsed);
  };

  componentDidMount = () => {
    this.handleToggleCollapsed();
  };

  render() {
    const { collapsed } = this.state;
    return (
      <div className=" menu-update ">
        <Button
          type="primary"
          onClick={this.handleToggleCollapsed}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          style={{ marginBottom: 10 }}
        >
          {collapsed ? 'Open Menu' : 'Hide Menu'}
        </Button>

        <div className={collapsed ? 'menu-hide ' : 'menu-show '}>
          {dataTest.map((blockList) => (
            <Menu key={blockList.name} mode="inline" style={{ fontSize: '13px', fontWeight: 500 }}>
              <SubMenu
                key={blockList.name}
                title={
                  <span>
                    <SettingOutlined />
                    <span>{blockList.name}</span>
                  </span>
                }
              >
                <Dragable blockList={blockList.value} />
              </SubMenu>
            </Menu>
          ))}
        </div>
      </div>
    );
  }
}
