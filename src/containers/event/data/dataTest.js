import React from 'react';
import { v4 as uuid } from 'uuid';

import ButtonBlock from '../templates/ui-elements/atoms/Button';
import TextBlock from '../templates/ui-elements/atoms/Text';
import ImageBlock from '../templates/ui-elements/atoms/Image';
import StepBlock from '../templates/ui-elements/atoms/Step';
import DividerBlock from '../templates/ui-elements/atoms/Divider';

import CountDownBlock from '../templates/ui-elements/blocks/countdown/Countdown';

import Photo from '../templates/ui-elements/blocks/photos/Photo';

// import ContactUs1 from '../templates/ui-elements/blocks/contactUs/ContactUs1';
import ContactUs2 from '../templates/ui-elements/blocks/contactUs/ContactUs2';

import Banner2 from '../templates/ui-elements/blocks/banner/Banner2';
import Banner3 from '../templates/ui-elements/blocks/banner/Banner3';

import EventDescription1 from '../templates/ui-elements/blocks/eventDescription/EventDescription1';
import EventDescription2 from '../templates/ui-elements/blocks/eventDescription/EventDescription2';
import EventDescription3 from '../templates/ui-elements/blocks/eventDescription/EventDescription3';

import Schedule from '../templates/ui-elements/blocks/Schedule/Schedule';
import Timeline from '../templates/ui-elements/blocks/Schedule/Timeline';

import Card1 from '../templates/ui-elements/blocks/cardSpeaker/card1';
import Card2 from '../templates/ui-elements/blocks/cardSpeaker/card2';

import Sponsor1Block from '../templates/ui-elements/blocks/sponsor/sponsor1';

import Footer1 from '../templates/ui-elements/blocks/footer/footer1';
import Footer2 from '../templates/ui-elements/blocks/footer/footer2';

// import IconSocial from '../templates/ui-elements/blocks/Social/social';

import Video1 from '../templates/ui-elements/blocks/video/video1';

import Video2 from '../templates/ui-elements/blocks/video/video2';

import Comment from '../templates/ui-elements/blocks/comments/comments';
import Map from '../templates/ui-elements/blocks/map/MapContainer';
import Document from '../templates/ui-elements/blocks/documents/Document';

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
    ].map(({ child, options, style, type }) => {
      return {
        id: uuid(),
        child,
        style,
        options,
        type,
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
    ].map(({ child, options, style, type }) => {
      return {
        id: uuid(),
        child,
        style,
        options,
        type,
      };
    }),
  },

  {
    name: 'Event Description',
    value: [
      {
        child: 'Event Description1',
        type: 'eventDescription1',
        style: {},
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
        style: {},
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
        style: {},
        options: ({ id, editable, style }) => (
          <EventDescription3
            key={id}
            id={id}
            editable={editable}
            style={style}
          />
        ),
      },
    ].map(({ child, options, style, type }) => {
      return {
        id: uuid(),
        child,
        style,
        options,
        type,
      };
    }),
  },

  {
    name: 'Speaker/Performer/Team',
    value: [
      {
        child: 'Speakers Gallery',
        type: 'speakers1',
        style: {},
        options: ({ editable, style, id }) => (
          <Card1 key={id} editable={editable} style={style} id={id} />
        ),
      },
      {
        child: 'Speakers Carousel',
        type: 'speakers2',
        style: {},
        options: ({ editable, style, id }) => (
          <Card2 key={id} editable={editable} style={style} id={id} />
        ),
      },
    ].map(({ child, options, style, type }) => {
      return {
        id: uuid(),
        child,
        style,
        options,
        type,
      };
    }),
  },

  {
    name: 'Schedule/Program/Step',
    value: [
      {
        child: 'Step',
        style: {},
        type: 'step',
        options: ({ editable, style, id }) => (
          <StepBlock key={id} editable={editable} style={style} id={id} />
        ),
      },
      {
        child: 'Timeline',
        style: {},
        type: 'timeline',
        options: ({ editable, style, id }) => (
          <Timeline key={id} editable={editable} style={style} id={id} />
        ),
      },
      {
        child: 'Schedule2',
        type: 'schedule2',
        style: {},
        options: ({ editable, style, id }) => (
          <Schedule key={id} editable={editable} style={style} id={id} />
        ),
      },
    ].map(({ child, options, style, type }) => {
      return {
        id: uuid(),
        child,
        style,
        options,
        type,
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
          <Map key={id} editable={editable} style={style} id={id} />
        ),
      },
    ].map(({ style, child, options, type }) => {
      return {
        id: uuid(),
        child,
        style,
        options,
        type,
      };
    }),
  },

  {
    name: 'Coundown',

    value: [
      {
        child: 'Coundown',
        style: {},
        type: 'countdown',
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
    ].map(({ style, child, options, type }) => {
      return {
        id: uuid(),
        child,
        style,
        options,
        type,
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
    ].map(({ style, child, options, type }) => {
      return {
        id: uuid(),
        child,
        style,
        options,
        type,
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
    ].map(({ style, child, options, type }) => {
      return {
        id: uuid(),
        child,
        style,
        options,
        type,
      };
    }),
  },
  // {
  //   name: 'Social',
  //   value: [
  //     {
  //       child: 'Icon Social',
  //       type: 'icon',
  //       style: {},
  //       options: ({ key, editable, style, id }) => (
  //         <IconSocial key={key} editable={editable} style={style} id={id} />
  //       ),
  //     },
  //   ].map(({ child, options, style, type }) => {
  //     return {
  //       id: uuid(),
  //       child,
  //       style,
  //       options,
  //       type,
  //     };
  //   }),
  // },
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
    ].map(({ child, options, style, type }) => {
      return {
        id: uuid(),
        child,
        style,
        options,
        type,
      };
    }),
  },
  {
    name: 'Contact Us',
    value: [
      {
        child: 'Contact Us 1',
        type: 'contactUs2',
        style: {},
        options: ({ editable, style, id }) => (
          <ContactUs2 key={id} editable={editable} style={style} id={id} />
        ),
      },
    ].map(({ child, options, style, type }) => {
      return {
        id: uuid(),
        child,
        style,
        options,
        type,
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
    ].map(({ style, child, options, type }) => {
      return {
        id: uuid(),
        child,
        style,
        options,
        type,
      };
    }),
  },
  {
    name: 'Comment',
    value: [
      {
        child: 'Comment',
        type: 'comment',
        style: {},
        options: ({ editable, style, id }) => (
          <Comment key={id} editable={editable} style={style} id={id} />
        ),
      },
    ].map(({ style, child, options, type }) => {
      return {
        id: uuid(),
        child,
        style,
        options,
        type,
      };
    }),
  },

  {
    name: 'Link document',
    value: [
      {
        child: 'List Of Link',
        type: 'listOfLink',
        style: {},
        options: ({ editable, style, id }) => (
          <Document key={id} editable={editable} style={style} id={id} />
        ),
      },
    ].map(({ style, child, options, type }) => {
      return {
        id: uuid(),
        child,
        style,
        options,
        type,
      };
    }),
  },
];
