import React from "react";

function TextArea({ key }) {
  return (
    <div className="sortable-element button">
      <textarea id="w3mission" rows="4" cols="50" key={key}>
        This is a dummy text area
      </textarea>
    </div>
  );
}

export default TextArea;
