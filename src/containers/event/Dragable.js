import React, { useState } from 'react';
import { ReactSortable } from "react-sortablejs";
import { v4 as uuid } from "uuid";
import { Tooltip } from 'antd';

function Dragable(props) {
    const { blockList } = props;
    const [dragList, setDragList] = useState(blockList);


    return (
        <ReactSortable
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
                    <Tooltip placement="top" title="Drag it to the right" key={item.child}>
                        <h6 className="menu-item">
                            {item.child}
                        </h6>
                    </Tooltip>

                )}
        </ReactSortable>
    )
}

export default Dragable;
