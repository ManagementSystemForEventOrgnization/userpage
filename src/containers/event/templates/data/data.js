import { v4 as uuid } from 'uuid';

export default [
  {
    id: 6,
    type: "button",
    name: 'Button',
  },
  {
    id: 7,
    type: "text",
    name: 'Text',
  },
  {
    id: 8,
    type: "dropdown",
    options: [
      { value: 'USA', name: 'USA', key: uuid() },
      { value: 'CANADA', name: 'CANADA', key: uuid() }
    ],
    name: 'Dropdown',
  },
  {
    id: 9,
    type: "table",
    name: 'Table',
  },
  {
    id: 10,
    type: "image",
    name: 'Image',
  },
  {
    id: 11,
    type: "divider",
    name: 'Divider',
  },
  {
    id: 12,
    type: "step",
    name: 'Step',
  },
  {
    id: 13,
    type: "datepicker",
    name: 'Datepicker',
  },
  {
    id: 14,
    type: "timepicker",
    name: 'Timepicker',
  },

].map(({ id, name, type, options }) => {
  return {
    id: uuid(),
    name,
    type,
    options: options ? options : "",
  };
});
