import React from 'react';
import { v4 as uuid } from 'uuid';

import ButtonBlock from '../templates/ui-elements/atoms/Button';
import TextBlock from '../templates/ui-elements/atoms/Text';
import ImageBlock from '../templates/ui-elements/atoms/Image';
import StepBlock from '../templates/ui-elements/atoms/Step';
import DividerBlock from '../templates/ui-elements/atoms/Divider';

import CountDownBlock from '../templates/ui-elements/blocks/countdown/Countdown';

import Photo from '../templates/ui-elements/blocks/photos/Photo';

import ContactUs1 from '../templates/ui-elements/blocks/contactUs/ContactUs1';
import ContactUs2 from '../templates/ui-elements/blocks/contactUs/ContactUs2';

import Banner2 from '../templates/ui-elements/blocks/banner/Banner2';
import Banner3 from '../templates/ui-elements/blocks/banner/Banner3';

import EventDescription1 from '../templates/ui-elements/blocks/eventDescription/EventDescription1';
import EventDescription2 from '../templates/ui-elements/blocks/eventDescription/EventDescription2';
import EventDescription3 from '../templates/ui-elements/blocks/eventDescription/EventDescription3';

import Schedule1 from '../templates/ui-elements/blocks/Schedule/Schedule1';
import Schedule2 from '../templates/ui-elements/blocks/Schedule/Schedule2';

import TrashBlock from '../templates/ui-elements/atoms/Trash';

import CardBlock from '../templates/ui-elements/blocks/cardSpeaker/card';

import Sponsor1Block from '../templates/ui-elements/blocks/sponsor/sponsor1';

import Footer1 from '../templates/ui-elements/blocks/footer/footer1';
import Footer2 from '../templates/ui-elements/blocks/footer/footer2';

import IconSocial from '../templates/ui-elements/blocks/Social/social';

import Video1 from '../templates/ui-elements/blocks/video/video1';

import Video2 from '../templates/ui-elements/blocks/video/video2';

export default [
  {
    name: 'Simple Block',
    value: [
      {
        child: 'Button',
        type: 'button',
        style: {},
        options: ({ editable, style, id }) => (
          <ButtonBlock key={id} editable={editable} style={style} id={id} />
        ),
      },
      {
        child: 'Text',
        type: 'text',
        style: {},
        options: ({ editable, style, id }) => (
          <TextBlock key={id} editable={editable} style={style} id={id} />
        ),
      },
      {
        child: 'Image',
        style: {},
        type: 'image',
        options: ({ editable, style, id }) => (
          <ImageBlock key={id} editable={editable} style={style} id={id} />
        ),
      },
      {
        child: 'Divider',
        style: {},
        type: 'divider',
        options: ({ editable, style, id }) => (
          <DividerBlock key={id} editable={editable} style={style} id={id} />
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
        child: 'Banner 1',
        type: 'banner2',
        style: {},
        options: ({ id, editable, style }) => (
          <Banner2 id={id} key={id} editable={editable} style={style} />
        ),
      },
      {
        child: 'Banner2',
        type: 'banner3',
        style: {},
        options: ({ id, editable, style }) => (
          <Banner3 id={id} key={id} editable={editable} style={style} />
        ),
      },
    ].map(({ child, options, style, component }) => {
      return {
        id: uuid(),
        child,
        style,
        options,
      };
    }),
  },

  {
    name: 'Event Description',
    value: [
      {
        child: 'Event Description1',
        type: 'eventDescription1',
        options: ({ id, editable, style }) => (
          <EventDescription1
            key={id}
            id={id}
            editable={editable}
            style={style}
          />
        ),
      },

      {
        type: 'eventDescription2',
        child: 'Event Description2',
        options: ({ id, editable, style }) => (
          <EventDescription2
            key={id}
            id={id}
            editable={editable}
            style={style}
          />
        ),
      },
      {
        child: 'Event Description3',
        type: 'eventDescription3',
        options: ({ id, editable, style }) => (
          <EventDescription3
            key={id}
            id={id}
            editable={editable}
            style={style}
          />
        ),
      },
    ].map(({ child, options, style }) => {
      return {
        id: uuid(),
        child,
        style,
        options,
      };
    }),
  },

  {
    name: 'Speaker/Performer/Team',
    value: [
      {
        child: 'Speakers',
        type: 'speakers',
        style: {},
        options: ({ editable, style, id }) => (
          <CardBlock key={id} editable={editable} style={style} id={id} />
        ),
      },
    ].map(({ child, options, style }) => {
      return {
        id: uuid(),
        child,
        style,
        options: options ? options : () => <></>,
      };
    }),
  },

  {
    name: 'Schedule/Program/Step',
    value: [
      {
        child: 'Schedule1',
        type: 'schedule1',
        style: {},
        options: ({ editable, style, id }) => (
          <Schedule1 key={id} editable={editable} style={style} id={id} />
        ),
      },
      {
        child: 'Step',
        style: {},
        type: 'step',
        options: ({ editable, style, id }) => (
          <StepBlock key={id} editable={editable} style={style} id={id} />
        ),
      },
      {
        child: 'Schedule2',
        type: 'schedule2',
        style: {},
        options: ({ editable, style, id }) => (
          <Schedule2 key={id} editable={editable} style={style} id={id} />
        ),
      },
    ].map(({ child, options, style }) => {
      return {
        id: uuid(),
        child,
        style,
        options: options ? options : () => <></>,
      };
    }),
  },

  {
    name: 'Map/Location/Adress',
    value: [
      {
        child: 'Map1',
        type: 'map1',
        style: {},
        options: ({ editable, style, id }) => (
          <ButtonBlock key={id} editable={editable} style={style} id={id} />
        ),
      },
    ].map(({ style, child, options }) => {
      return {
        id: uuid(),
        child,
        style,
        options: options ? options : () => <></>,
      };
    }),
  },

  {
    name: 'Coundown',
    type: 'countdown',
    value: [
      {
        child: 'Coundown',
        style: {},
        options: ({ editable, style, id }) => (
          <CountDownBlock
            key={id}
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
      };
    }),
  },
  {
    name: 'Video',
    value: [
      {
        child: 'Video1',
        type: 'video1',
        style: {},
        options: ({ editable, style, id }) => (
          <Video1 key={id} editable={editable} style={style} id={id} />
        ),
      },
      {
        child: 'Video2',
        type: 'video2',
        style: {},
        options: ({ editable, style, id }) => (
          <Video2 key={id} editable={editable} style={style} id={id} />
        ),
      },
    ].map(({ style, child, options }) => {
      return {
        id: uuid(),
        child,
        style,
        options: options ? options : () => <></>,
      };
    }),
  },
  {
    name: 'Sponsors/Partners',
    value: [
      {
        child: 'Sponsors1',
        type: 'sponsor1',
        style: {},
        options: ({ editable, style, id }) => (
          <Sponsor1Block key={id} editable={editable} style={style} id={id} />
        ),
      },
    ].map(({ style, child, options }) => {
      return {
        id: uuid(),
        child,
        style,
        options: options ? options : () => <></>,
      };
    }),
  },
  {
    name: 'Social',
    value: [
      {
        child: 'Icon Social',
        type: 'icon',
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
      };
    }),
  },
  {
    name: 'Gallery',
    value: [
      {
        child: 'Gallery',
        type: 'photo2',
        style: {},
        options: ({ editable, style, id }) => (
          <Photo key={id} editable={editable} style={style} id={id} />
        ),
      },
    ].map(({ child, options, style }) => {
      return {
        id: uuid(),
        child,
        style,
        options: options ? options : () => <></>,
      };
    }),
  },
  {
    name: 'Contact Us',
    value: [
      {
        child: 'Contact Us 1',
        type: 'contactUs1',
        style: {},
        options: ({ editable, style, id }) => (
          <ContactUs1 key={id} editable={editable} style={style} id={id} />
        ),
      },
      {
        child: 'Contact Us 2',
        type: 'contactUs2',
        style: {},
        options: ({ editable, style, id }) => (
          <ContactUs2 key={id} editable={editable} style={style} id={id} />
        ),
      },
    ].map(({ child, options, style }) => {
      return {
        id: uuid(),
        child,
        style,
        options: options ? options : () => <></>,
      };
    }),
  },
  {
    name: 'Footer',
    value: [
      {
        child: 'Footer1',
        type: 'footer1',
        style: {},
        options: ({ editable, style, id }) => (
          <Footer1 key={id} editable={editable} style={style} id={id} />
        ),
      },
      {
        child: 'Footer2',
        type: 'footer2',
        style: {},
        options: ({ editable, style, id }) => (
          <Footer2 key={id} editable={editable} style={style} id={id} />
        ),
      },
    ].map(({ style, child, options }) => {
      return {
        id: uuid(),
        child,
        style,
        options: options ? options : () => <></>,
      };
    }),
  },
];
