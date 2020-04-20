import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";

const TrashDropContainer = () => {
    const [dropList, setDropList] = useState([]);

    return (
        <div className=" p-3 mb-2" >

            <ReactSortable
                className=""
                sort={false}
                group={{
                    name: "shared",
                    pull: true,
                    put: true
                }}
                animation={200}
                delayOnTouchStart={true}
                delay={0}
                list={dropList}
                setList={setDropList}
            >
                {dropList.map(item => {
                    console.log(item)
                    return item.trash({ key: item.id , name: item.child})
                })}
            </ReactSortable>
        </div>
    );
};

export default TrashDropContainer;