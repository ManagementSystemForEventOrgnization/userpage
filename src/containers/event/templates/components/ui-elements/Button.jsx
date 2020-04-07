import React from "react";

const Button = ({ key }) => {
  return (
    <button
      key={key}
      className="sortable-element button"
      onClick={() => console.log("dummy button")}
    >
      Button
    </button>
  );
};

export default Button;
