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
import HeaderBlocks from '../components/ui-elements/blocks/Header';
import CountdownBlock from '../components/ui-elements/atoms/Timer';
import TrashBlock from '../components/ui-elements/atoms/Trash';


export default [
  {
    type: "text",
    name: 'Text',
    options: ({ key, editable, style }) => <TextBlock
      editable={editable}
      key={key}
      style={style}
    />
  },
  {
    type: "button",
    name: 'Button',
    options: ({ key }) => <ButtonBlock key={key} />
  },

  {
    type: "dropdown",
    options: ({ key }) => <DropdownBlock key={key} />,
    name: 'Dropdown',
  },
  {
    type: "table",
    options: ({ key }) => <TableBlock key={key} />,
    name: 'Table',
  },
  {
    type: "image",
    options: ({ key, editable }) => <ImageBlock
      key={key}
      editable={editable}
    />,
    name: 'Image',
  },
  {
    type: "divider",
    options: ({ key }) => <DividerBlock key={key} />,
    name: 'Divider',
  },
  {
    type: "step",
    options: ({ key }) => <StepBlock key={key} />,
    name: 'Step',
  },
  {
    type: "datepicker",
    name: 'Datepicker',
    options: ({ key }) => <DatepickersBlocks key={key} />,

  },
  {
    type: "timepicker",
    name: 'Timepicker',
    options: ({ key }) => <TimepickersBlock key={key} />,

  },
  {
    type: "input",
    name: 'Input',
    options: ({ key }) => <InputBlocks key={key} />,

  },
  {
    type: "header",
    name: 'Header',
    options: ({ key }) => <HeaderBlocks key={key} />,

  },
  {
    type: "countdown",
    name: 'countdown',
    options: ({ key }) => <CountdownBlock key={key} startCount="2021-01-01" />,

  },
]
  .map(({ name, type, options }) => {
    return {
      id: uuid(),
      name,
      type,
      options: options ? options : () => <></>,
      trash: <TrashBlock />,
    };
  });
