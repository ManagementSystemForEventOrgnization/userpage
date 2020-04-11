import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";

import ButtonBlock from './ui-elements/Button';
import TextBlock from './ui-elements/Text';
import ImageBlock from './ui-elements/Image';
import DropdownBlock from './ui-elements/DropDown';
import TableBlock from './ui-elements/Table';
import DividerBlock from './ui-elements/Devider'
import StepBlock from './ui-elements/Step';

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

          switch (item.type) {
            case "button":
              return <ButtonBlock key={item.id} className="mt-2" />;
            case "dropdown":
              return <DropdownBlock key={item.id} options={item.options} className="mt-2" />;
            case "text":
              return <TextBlock key={item.id} className="mt-2" />;
            case "table":
              return <TableBlock key={item.id} className="mt-2" />;
            case 'image':
              return <ImageBlock key={item.id} className="mt-2" />
            case 'divider':
              return <DividerBlock key={item.id} className="mt-2" />
            case 'step':
              return <StepBlock key={item.id} className="mt-3" />

            default:
              return <span key="123456" className="mt-2">{item.type}</span>;

          }
        })}
      </ReactSortable>



    </div>
  );
};

export default DropContainer;
