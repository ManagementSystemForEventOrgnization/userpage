import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";

const DropContainer = () => {
  const [dropList, setDropList] = useState([]);

  return (
    <div className="drop-container p-3 mb-2 " >

      <ReactSortable
        className="drop-container"
        sort={true}
        group={{
          name: "shared",
          pull: true,
          put: true
        }}
        animation={300}
        delayOnTouchStart={true}
        delay={3}
        list={dropList}
        setList={setDropList}
      >
        {dropList.map(item => {
          console.log(item)
          return item.options({ key: item.id })
        })}
      </ReactSortable>
    </div>
  );
};

export default DropContainer;
