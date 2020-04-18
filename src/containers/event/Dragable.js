import React, { useState } from 'react';
import { ReactSortable } from "react-sortablejs";
import { v4 as uuid } from "uuid";


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
                    <p className="" key={item.child}>
                        {item.child}
                    </p>
                )}
        </ReactSortable>
    )
}

export default Dragable;
