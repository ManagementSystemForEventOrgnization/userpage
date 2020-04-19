import React from 'react';
import { v4 as uuid } from 'uuid';

import ButtonBlock from '../components/ui-elements/Button';
import TextBlock from '../components/ui-elements/Text';
import ImageBlock from '../components/ui-elements/Image';
import DropdownBlock from '../components/ui-elements/DropDown';
import TableBlock from '../components/ui-elements/Table';
import DividerBlock from '../components/ui-elements/Devider'
import StepBlock from '../components/ui-elements/Step';
import TimepickersBlock from '../components/ui-elements/Timepicker';
import DatepickersBlocks from '../components/ui-elements/Datepicker';
import InputBlocks from '../components/ui-elements/Input';
import HeaderBlocks from '../components/ui-elements/Header';
import TrashBlock from '../components/ui-elements/atoms/Trash';


export default [
  {
    id: 7,
    type: "text",
    name: 'Text',
    options: ({ key }) => <TextBlock
      key={key}
    />
  },
  {
    id: 6,
    type: "button",
    name: 'Button',
    options: ({ key }) => <ButtonBlock key={key} />
  },

  {
    id: 8,
    type: "dropdown",
    options: ({ key }) => <DropdownBlock key={key} />,
    name: 'Dropdown',
  },
  {
    id: 9,
    type: "table",
    options: ({ key }) => <TableBlock key={key} />,
    name: 'Table',
  },
  {
    id: 10,
    type: "image",
    options: ({ key }) => <ImageBlock
      key={key}
    />,
    name: 'Image',
  },
  {
    id: 11,
    type: "divider",
    options: ({ key }) => <DividerBlock key={key} />,
    name: 'Divider',
  },
  {
    id: 12,
    type: "step",
    options: ({ key }) => <StepBlock key={key} />,
    name: 'Step',
  },
  {
    id: 13,
    type: "datepicker",
    name: 'Datepicker',
    options: ({ key }) => <DatepickersBlocks key={key} />,

  },
  {
    id: 14,
    type: "timepicker",
    name: 'Timepicker',
    options: ({ key }) => <TimepickersBlock key={key} />,

  },
  {
    id: 15,
    type: "input",
    name: 'Input',
    options: ({ key }) => <InputBlocks key={key} />,

  },
  {
    id: 15,
    type: "header",
    name: 'Header',
    options: ({ key }) => <HeaderBlocks key={key} />,

  },

]
  .map(({ id, name, type, options, trash }) => {
    return {
      id: uuid(),
      name,
      type,
      options: options ? options : () => <></>,
      trash: <TrashBlock />,
    };
  });
