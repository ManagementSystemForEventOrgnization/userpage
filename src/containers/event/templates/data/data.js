import { v4 as uuid } from 'uuid';
import React from 'react';
import ButtonBlock from '../components/ui-elements/Button';
import TextBlock from '../components/ui-elements/Text';
import ImageBlock from '../components/ui-elements/Image';
import DropdownBlock from '../components/ui-elements/DropDown';
import TableBlock from '../components/ui-elements/Table';
import DividerBlock from '../components/ui-elements/Devider'
import StepBlock from '../components/ui-elements/Step';
import { Table } from 'antd';


export default [
  {
    id: 1,
    type: "button",
    name: 'Button',
    options: ({ key }) => <ButtonBlock key={key} />
  },
  {
    id: 2,
    type: "text",
    name: 'Text',
    options: ({ key }) => <TextBlock key={key} />
  },
  {
    id: 3,
    type: "dropdown",
    options: ({ key }) => <DropdownBlock key={key} />,
    name: 'Dropdown',
  },
  {
    id: 4,
    type: "table",
    options: ({ key }) => <TableBlock key={key} />,
    name: 'Table',
  },
  {
    id: 5,
    type: "image",
    options: ({ key }) => <ImageBlock key={key} />,
    name: 'Image',
  },
  {
    id: 5,
    type: "divider",
    options: ({ key }) => <DividerBlock key={key} />,
    name: 'Divider',
  },
  {
    id: 6,
    type: "step",
    options: ({ key }) => <StepBlock key={key} />,
    name: 'Step',
  },
].map(({ id, name, type, options }) => {
  return {
    id: uuid(),
    name,
    type,
    options: options ? options : "",
  };
});
