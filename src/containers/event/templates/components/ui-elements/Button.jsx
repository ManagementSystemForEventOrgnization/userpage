import React from "react";
import ButtonsEvent from '../../../ButtonsEvent';
const Button = ({ key }) => {
  console.log(key);
  return (
  
      <ButtonsEvent key={key} ></ButtonsEvent>
  
  );
};

export default Button;
