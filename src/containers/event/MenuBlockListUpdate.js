import React, { useState } from 'react'
import { Menu } from 'antd';
import { ReactSortable } from "react-sortablejs";
import { v4 as uuid } from "uuid";

import {
    SettingOutlined
} from '@ant-design/icons';


const { SubMenu } = Menu;


export default function MenuBlock(props) {
    const { blockList } = props;
    const [dragList, setDragList] = useState(blockList.value);
    const [collapse, setCollapse] = useState(false);

    function dragable() {
        return <ReactSortable
            className="drag-container"
            sort={false}
            group={{
                name: "groupName",
                pull: "clone",
                put: false
            }}
            animation={300}
            delayOnTouchStart={true}
            delay={3}
            list={dragList}
            setList={setDragList}
            clone={item => ({ ...item, id: uuid() })}
        >
            {
                dragList.map(item =>
                    <p className="menu-item" key={item.child}>
                        {item.child}
                    </p>
                )}
        </ReactSortable>


    }

    function toggleCollapsed() {
        setCollapse(!collapse);
    }

    return (
        <Menu
            style={{ width: 256 }}
            mode="inline"
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
                {
                    dragable()
                }
            </SubMenu>
        </Menu>


    );
}


