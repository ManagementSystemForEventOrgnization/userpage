import React from "react";
import { v4 as uuid } from "uuid";

const DropDown = ({ key, options }) => {
  const constructOptions = options =>
    options.map(data => (
      <option key={uuid()} value={data.id}>
        {data.name}
      </option>
    ));

  return (
    <div className="sortable-element">
      <select key={key} id={"dropdown" + uuid()}>
        {constructOptions(options)}
      </select>
    </div>
  );
};

export default DropDown;
