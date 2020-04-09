import React, { useState } from 'react'
import { ReactSortable } from "react-sortablejs";
import { v4 as uuid } from "uuid";
import data from "../data/data";
import Calendar from './ui-elements/Calendar'
import DropContainer from "./DropContainer";


const CreateEventForm = () => {
    const [dragList, setDragList] = useState(data);

    return (
        <div className="builder-container p-3 mb-2 bg-warning">
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
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <DropContainer />
                        </div>
                        <div className="col">
                            <DropContainer />
                        </div>
                    </div></div>
            </div>
        </div>
    )
}

export default CreateEventForm;
