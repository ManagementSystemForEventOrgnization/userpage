import React from 'react';
import { v4 as uuid } from 'uuid';

import ButtonBlock from '../components/ui-elements/atoms/Button';
import TextBlock from '../components/ui-elements/atoms/Text';
import ImageBlock from '../components/ui-elements/atoms/Image';
import DropdownBlock from '../components/ui-elements/atoms/DropDown';
import TableBlock from '../components/ui-elements/atoms/Table';
import StepBlock from '../components/ui-elements/atoms/Step';
import TimepickersBlock from '../components/ui-elements/atoms/Timepicker';
import DatepickersBlocks from '../components/ui-elements/atoms/Datepicker';
import IconBlock from '../components/ui-elements/atoms/Icon';
import DividerBlock from '../components/ui-elements/atoms/Divider';

import HeaderBlock from '../components/ui-elements/blocks/Header';
import CountDownBlock from '../components/ui-elements/blocks/countdown/Countdown';

import Photo from '../components/ui-elements/blocks/photos/Photo';
// import Photos from '../components/ui-elements/blocks/photos/Photos';

import ContactUs1 from '../components/ui-elements/blocks/contactUs/ContactUs1';
import ContactUs2 from '../components/ui-elements/blocks/contactUs/ContactUs2';

import Banner1 from '../components/ui-elements/blocks/banner/Banner1';
import Banner2 from '../components/ui-elements/blocks/banner/Banner2';
import Banner3 from '../components/ui-elements/blocks/banner/Banner3';

import EventDescription1 from '../components/ui-elements/blocks/eventDescription/EventDescription1';
import EventDescription2 from '../components/ui-elements/blocks/eventDescription/EventDescription2';
import EventDescription3 from '../components/ui-elements/blocks/eventDescription/EventDescription3';

import Schedule1 from '../components/ui-elements/blocks/Schedule/Schedule1';
import Schedule2 from '../components/ui-elements/blocks/Schedule/Schedule2';

import TrashBlock from '../components/ui-elements/atoms/Trash';

import CardBlock from '../components/ui-elements/blocks/cardSpeaker/card';

import Sponsor1Block from '../components/ui-elements/blocks/sponsor/sponsor1';

import Footer1 from '../components/ui-elements/blocks/footer/footer1';
import Footer2 from '../components/ui-elements/blocks/footer/footer2';

import IconSocial from '../components/ui-elements/blocks/Social/social';

export default [
  {
    name: 'Simple Block',
    value: [
      {
        child: 'Button',
        style: {},
        options: ({ key, editable, style, id }) => (
          <ButtonBlock key={key} editable={editable} style={style} id={id} />
        ),
      },
      {
        child: 'Text',
        style: {},
        options: ({ key, editable, style, id }) => (
          <TextBlock
            key={key}
            editable={editable}
            style={style}
            id={id} />
        ),
      },
      {
        child: 'Image',
        style: {},
        options: ({ key, editable, style, id }) => (
          <ImageBlock key={key} editable={editable} style={style} id={id} />
        ),
      },
      {
        child: 'Table',
        style: {},
        options: ({ key, editable, style, id }) => (
          <TableBlock key={key} editable={editable} style={style} id={id} />
        ),
      },
      {
        child: 'Dropdown',
        style: {},
        options: ({ key, editable, style, id }) => (
          <DropdownBlock key={key} editable={editable} style={style} id={id} />
        ),
      },
      {
        child: 'Divider',
        style: {},
        options: ({ key, editable, style, id }) => (
          <DividerBlock key={key} editable={editable} style={style} id={id} />
        ),
      },
      {
        child: 'DatePicker',
        style: {},
        options: ({ key, editable, style, id }) => (
          <DatepickersBlocks
            key={key}
            editable={editable}
            style={style}
            id={id}
          />
        ),
      },
      {
        child: 'TimePicker',
        style: {},
        options: ({ key, editable, style, id }) => (
          <TimepickersBlock
            key={key}
            editable={editable}
            style={style}
            id={id}
          />
        ),
      },
      {
        child: 'Icon',
        style: {},
        options: ({ key, editable, style, id }) => (
          <IconBlock key={key} editable={editable} style={style} id={id} />
        ),
      },
    ].map(({ child, options, style }) => {
      return {
        id: uuid(),
        child,
        style,
        options: options ? options : () => <></>,
        trash: ({ key, name }) => <TrashBlock key={key} name={name} />,
      };
    }),
  },

  {
    name: 'Header',
    value: [
      {
        child: 'Header',
        style: {},
        options: ({ key, editable, style, id }) => (
          <HeaderBlock key={key} editable={editable} style={style} id={id} />
        ),
      },
    ].map(({ child, options, style }) => {
      return {
        id: uuid(),
        child,
        style,
        options: options ? options : () => <></>,
        trash: ({ key, name }) => <TrashBlock key={key} name={name} />,
      };
    }),
  },

  {
    name: 'Banner',
    value: [
      {
        child: 'Only Image',
        style: {},
        options: ({ id, key, editable, style }) => (
          <Banner1 id={id} key={key} editable={editable} style={style} />
        ),
      },
      {
        child: 'Basic Banner',
        style: {},
        value: 'confference',
        options: ({ id, key, editable, style }) => (
          <Banner2 id={id} key={key} editable={editable} style={style} />
        ),
      },
      {
        child: 'Medium Banner',
        style: {},
        options: ({ key, editable, style, id }) => (
          <Banner3 id={id} key={key} editable={editable} style={style} />
        ),
      },
    ].map(({ child, options, style }) => {
      return {
        id: uuid(),
        child,
        style,
        options: options ? options : () => <></>,
        trash: ({ key, name }) => <TrashBlock key={key} name={name} />,
      };
    }),
  },

  {
    name: 'Event Description',
    value: [
      {
        child: 'Option 1',
        style: {},
        options: ({ key, editable, style, id }) => (
          <EventDescription1
            key={key}
            editable={editable}
            style={style}
            id={id}
          />
        ),
      },
      {
        child: 'Option 2',
        style: {},
        options: ({ key, editable, style, id }) => (
          <EventDescription2
            key={key}
            editable={editable}
            style={style}
            id={id}
          />
        ),
      },
      {
        child: 'Option 3',
        style: {},
        options: ({ key, editable, style, id }) => (
          <EventDescription3
            key={key}
            editable={editable}
            style={style}
            id={id}
          />
        ),
      },
    ].map(({ child, options, style }) => {
      return {
        id: uuid(),
        child,
        style,
        options: options ? options : () => <></>,
        trash: ({ key, name }) => <TrashBlock key={key} name={name} />,
      };
    }),
  },
  {
    name: 'Speaker/Performer/Team',
    value: [
      {
        child: 'Option 1',
        style: {},
        options: ({ key, editable, style, id }) => (
          <CardBlock key={key} editable={editable} style={style} id={id} />
        ),
      },
    ].map(({ child, options, style }) => {
      return {
        id: uuid(),
        child,
        style,
        options: options ? options : () => <></>,
        trash: ({ key, name }) => <TrashBlock key={key} name={name} />,
      };
    }),
  },

  {
    name: 'Schedule/Program/Step',
    value: [
      {
        child: 'Schedule1',
        style: {},
        options: ({ key, editable, style, id }) => (
          <Schedule1 key={key} editable={editable} style={style} id={id} />
        ),
      },
      {
        child: 'Step',
        style: {},
        options: ({ key, editable, style, id }) => (
          <StepBlock key={key} editable={editable} style={style} id={id} />
        ),
      },
      {
        child: 'Schedule2',
        style: {},
        options: ({ key, editable, style, id }) => (
          <Schedule2 key={key} editable={editable} style={style} id={id} />
        ),
      },
    ].map(({ child, options, style }) => {
      return {
        id: uuid(),
        child,
        style,
        options: options ? options : () => <></>,
        trash: ({ key, name }) => <TrashBlock key={key} name={name} />,
      };
    }),
  },

  {
    name: 'Map/Location/Adress',
    value: [
      {
        child: 'Option 1',
        style: {},
        options: ({ key, editable, style, id }) => (
          <ButtonBlock key={key} editable={editable} style={style} id={id} />
        ),
      },
      {
        child: 'Option 2',
        style: {},
        options: ({ key, editable, style, id }) => (
          <ButtonBlock key={key} editable={editable} style={style} id={id} />
        ),
      },
    ].map(({ style, child, options }) => {
      return {
        id: uuid(),
        child,
        style,
        options: options ? options : () => <></>,
        trash: <TrashBlock />,
      };
    }),
  },
  {
    name: 'Coundown',
    value: [
      {
        child: 'Coundown',
        style: {},
        options: ({ key, editable, style, id }) => (
          <CountDownBlock
            key={key}
            editable={editable}
            startCount="2021-01-01 12:00:00"
            style={style}
            id={id}
          />
        ),
      },
    ].map(({ style, child, options }) => {
      return {
        id: uuid(),
        child,
        style,
        options: options ? options : () => <></>,
        trash: <TrashBlock />,
      };
    }),
  },
  {
    name: 'Video',
    value: [
      {
        child: 'Option 1',
        style: {},
        options: ({ key, editable, style, id }) => (
          <ButtonBlock key={key} editable={editable} style={style} id={id} />
        ),
      },
      {
        child: 'Option 2',
        style: {},
        options: ({ key, editable, style, id }) => (
          <ButtonBlock key={key} editable={editable} style={style} id={id} />
        ),
      },
    ].map(({ style, child, options }) => {
      return {
        id: uuid(),
        child,
        style,
        options: options ? options : () => <></>,
        trash: <TrashBlock />,
      };
    }),
  },
  {
    name: 'Sponsors/Partners',
    value: [
      {
        child: 'Option 1',
        style: {},
        options: ({ key, editable, style, id }) => (
          <Sponsor1Block key={key} editable={editable} style={style} id={id} />
        ),
      },
      {
        child: 'Option 2',
        style: {},
        options: ({ key, editable, style, id }) => (
          <Sponsor1Block key={key} editable={editable} style={style} id={id} />
        ),
      },
    ].map(({ style, child, options }) => {
      return {
        id: uuid(),
        child,
        style,
        options: options ? options : () => <></>,
        trash: <TrashBlock />,
      };
    }),
  },
  {
    name: 'Photo/Image',
    value: [
      {
        child: 'Option 1',
        style: {},
        options: ({ key, editable, style, id }) => (
          <ImageBlock key={key} editable={editable} style={style} id={id} />
        ),
      },
      {
        child: 'Option 2',
        style: {},
        options: ({ key, editable, style, id }) => (
          <Photo key={key} editable={editable} style={style} id={id} />
        ),
      },
    ].map(({ child, options, style }) => {
      return {
        id: uuid(),
        child,
        style,
        options: options ? options : () => <></>,
        trash: ({ key, name }) => <TrashBlock key={key} name={name} />,
      };
    }),
  },
  {
    name: 'Contact Us',
    value: [
      {
        child: 'Option 1',
        style: {},
        options: ({ key, editable, style, id }) => (
          <ContactUs1 key={key} editable={editable} style={style} id={id} />
        ),
      },
      {
        child: 'Option 2',
        style: {},
        options: ({ key, editable, style, id }) => (
          <ContactUs2 key={key} editable={editable} style={style} id={id} />
        ),
      },
    ].map(({ child, options, style }) => {
      return {
        id: uuid(),
        child,
        style,
        options: options ? options : () => <></>,
        trash: ({ key, name }) => <TrashBlock key={key} name={name} />,
      };
    }),
  },
  {
    name: 'Footer',
    value: [
      {
        child: 'Footer 1',
        style: {},
        options: ({ key, editable, style, id }) => (
          <Footer1 key={key} editable={editable} style={style} id={id} />
        ),
      },
      {
        child: 'Footer2',
        style: {},
        options: ({ key, editable, style, id }) => (
          <Footer2 key={key} editable={editable} style={style} id={id} />
        ),
      },
    ].map(({ style, child, options }) => {
      return {
        id: uuid(),
        child,
        style,
        options: options ? options : () => <></>,
        trash: ({ key, name }) => <TrashBlock key={key} name={name} />,
      };
    }),
  },
  {
    name: 'Social',
    value: [
      {
        child: 'Icon Social',
        style: {},
        options: ({ key, editable, style, id }) => (
          <IconSocial key={key} editable={editable} style={style} id={id} />
        ),
      },
    ].map(({ child, options, style }) => {
      return {
        id: uuid(),
        child,
        style,
        options: options ? options : () => <></>,
        trash: ({ key, name }) => <TrashBlock key={key} name={name} />,
      };
    }),
  },
];
