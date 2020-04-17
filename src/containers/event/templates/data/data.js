import React from 'react';
import { v4 as uuid } from 'uuid';

import ButtonBlock from '../components/ui-elements/atoms/Button';
import TextBlock from '../components/ui-elements/atoms/Text';
import ImageBlock from '../components/ui-elements/atoms/Image';
import DropdownBlock from '../components/ui-elements/atoms/DropDown';
import TableBlock from '../components/ui-elements/atoms/Table';
import DividerBlock from '../components/ui-elements/atoms/Devider'
import StepBlock from '../components/ui-elements/atoms/Step';
import TimepickersBlock from '../components/ui-elements/atoms/Timepicker';
import DatepickersBlocks from '../components/ui-elements/atoms/Datepicker';




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

]
  .map(({ id, name, type, options }) => {
    return {
      id: uuid(),
      name,
      type,
      options: options ? options : () => <></>,
    };
  });
