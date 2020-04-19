import React from 'react'
import { Menu, Button } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    SettingOutlined
} from '@ant-design/icons';


import dataTest from './templates/data/dataTest';
import Dragable from './Dragable';


const { SubMenu } = Menu;

export default class App extends React.Component {
    state = {
        collapsed: true,
    };

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        const { collapsed } = this.state;
        return (
            <div className=" menu-updated" style={{ width: 256 }}>
                <Button type="primary"
                    onClick={this.toggleCollapsed}
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    style={{ marginBottom: 10 }}>
                    {collapsed ? 'Open Menu' : 'Hide Menu'}
                </Button>
                <div className="menu-wrap">
                    <div className="menu-block">
                        {
                            dataTest.map(blockList =>
                                <Menu
                                    mode="inline"
                                    className="menu"
                                    inlineCollapsed={collapsed}
                                >
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
                            )
                        }
                    </div>


                </div>


            </div>
        );
    }
}