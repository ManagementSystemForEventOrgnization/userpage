import React from 'react'
import { Menu, Button } from 'antd';
import { ReactSortable } from "react-sortablejs";
import { v4 as uuid } from "uuid";
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
    SettingOutlined
} from '@ant-design/icons';


import dataTest from './templates/data/dataTest';
import Dragable from './Dragable';


const { SubMenu } = Menu;

export default class App extends React.Component {
    state = {
        collapsed: false,
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
                    style={{ marginBottom: 16 }}>
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
                                        className="sub"
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