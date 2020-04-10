import React, { useState } from 'react'
import { ReactSortable } from "react-sortablejs";
import { v4 as uuid } from "uuid";
import data from "../event/templates/data/data";

const MenuBlockList = () => {
    const [dragList, setDragList] = useState(data);

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
            {dragList.map(item => (
                <div className="sortable-element bg-light btn ml-2 mb-4" key={item.id}>
                    <span>{item.name}</span>
                </div>
            ))}
        </ReactSortable>
    );
}


export default MenuBlockList;