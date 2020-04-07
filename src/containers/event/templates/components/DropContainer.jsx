import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";

import Button from "./ui-elements/Button";
import TextArea from "./ui-elements/TextArea";
import DropDown from "./ui-elements/DropDown";
import Calendar from './ui-elements/Calendar';

const DropContainer = () => {
  const [dropList, setDropList] = useState([]);

  return (
    <div className="drop-container p-3 mb-2 bg-primary" >
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
          {
            switch (item.type) {
              case "button":
                return <Button key={item.id} />;
              case "dropdown":
                return <DropDown key={item.id} options={item.options} />;
              case "text":
                return <TextArea key={item.id} />;
              case "Calendar":
                return <Calendar key={item.id} />;
              default:
                return <span key="123456">{item.type}</span>;
            }
          }
        })}
      </ReactSortable>
    </div>
  );
};

export default DropContainer;
