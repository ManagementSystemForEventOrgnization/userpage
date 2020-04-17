import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";

const DropContainer = () => {
  const [dropList, setDropList] = useState([]);

  return (
    <div className=" p-3 mb-2" >

      <ReactSortable
        className="trash "
        sort={false}
        group={{
          name: "shared",
          pull: false,
          put: true
        }}
        animation={300}
        delayOnTouchStart={true}
        delay={1}
        list={dropList}
        setList={setDropList}
      >
        {dropList.map(item => {
          return item.trash
        })}
      </ReactSortable>
    </div>
  );
};

export default DropContainer;
