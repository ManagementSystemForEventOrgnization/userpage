import React from 'react';

import ButtonBlock from '../components/ui-elements/atoms/Button';
import TextBlock from '../components/ui-elements/atoms/Text';
import ImageBlock from '../components/ui-elements/atoms/Image';
// import DropdownBlock from '../components/ui-elements/atoms/DropDown';
// import TableBlock from '../components/ui-elements/atoms/Table';
import StepBlock from '../components/ui-elements/atoms/Step';
// import TimepickersBlock from '../components/ui-elements/atoms/Timepicker';
// import DatepickersBlocks from '../components/ui-elements/atoms/Datepicker';
// import IconBlock from '../components/ui-elements/atoms/Icon';
import DividerBlock from '../components/ui-elements/atoms/Divider';

import HeaderBlock from '../components/ui-elements/blocks/Header';
import CountDownBlock from '../components/ui-elements/blocks/countdown/Countdown';

import Photo from '../components/ui-elements/blocks/photos/Photo';
// import Photos from '../components/ui-elements/blocks/photos/Photos';

import ContactUs1 from '../components/ui-elements/blocks/contactUs/ContactUs1';
import ContactUs2 from '../components/ui-elements/blocks/contactUs/ContactUs2';

import Banner2 from '../components/ui-elements/blocks/banner/Banner2';
import Banner3 from '../components/ui-elements/blocks/banner/Banner3';

import EventDescription1 from '../components/ui-elements/blocks/eventDescription/EventDescription1';
import EventDescription2 from '../components/ui-elements/blocks/eventDescription/EventDescription2';
import EventDescription3 from '../components/ui-elements/blocks/eventDescription/EventDescription3';

import Schedule1 from '../components/ui-elements/blocks/Schedule/Schedule1';
import Schedule2 from '../components/ui-elements/blocks/Schedule/Schedule2';

import CardBlock from '../components/ui-elements/blocks/cardSpeaker/card';

import Sponsor1Block from '../components/ui-elements/blocks/sponsor/sponsor1';

import Footer1 from '../components/ui-elements/blocks/footer/footer1';
import Footer2 from '../components/ui-elements/blocks/footer/footer2';

import IconSocial from '../components/ui-elements/blocks/Social/social';

import Video1 from '../components/ui-elements/blocks/video/video1';

import Video2 from '../components/ui-elements/blocks/video/video2';

export const blockList = {
  button: ({ editable, style, id }) => (
    <ButtonBlock key={id} editable={editable} style={style} id={id} />
  ),
  text: ({ editable, style, id }) => (
    <TextBlock key={id} editable={editable} style={style} id={id} />
  ),
  image: ({ editable, style, id }) => (
    <ImageBlock key={id} editable={editable} style={style} id={id} />
  ),
  divider: ({ editable, style, id }) => (
    <DividerBlock key={id} editable={editable} style={style} id={id} />
  ),
  header: ({ editable, style, id, match }) => (
    <HeaderBlock
      key={id}
      editable={editable}
      style={style}
      id={id}
      match={match}
    />
  ),
  banner2: ({ id, key, editable, style }) => (
    <Banner2 id={id} key={key} editable={editable} style={style} />
  ),
  banner3: ({ id, editable, style }) => (
    <Banner3 id={id} key={id} editable={editable} style={style} />
  ),

  eventDescription1: ({ id, editable, style }) => (
    <EventDescription1 key={id} id={id} editable={editable} style={style} />
  ),
  eventDescription2: ({ id, editable, style }) => (
    <EventDescription2 key={id} id={id} editable={editable} style={style} />
  ),
  eventDescription3: ({ id, editable, style }) => (
    <EventDescription3 key={id} id={id} editable={editable} style={style} />
  ),
  speakers: ({ editable, style, id }) => (
    <CardBlock key={id} editable={editable} style={style} id={id} />
  ),
  schedule1: ({ editable, style, id }) => (
    <Schedule1 key={id} editable={editable} style={style} id={id} />
  ),
  step: ({ editable, style, id }) => (
    <StepBlock key={id} editable={editable} style={style} id={id} />
  ),
  schedule2: ({ editable, style, id }) => (
    <Schedule2 key={id} editable={editable} style={style} id={id} />
  ),
  map1: ({ editable, style, id }) => (
    <ButtonBlock key={id} editable={editable} style={style} id={id} />
  ),
  map2: ({ editable, style, id }) => (
    <ButtonBlock key={id} editable={editable} style={style} id={id} />
  ),
  countdown: ({ editable, style, id }) => (
    <CountDownBlock
      key={id}
      editable={editable}
      startCount="2021-01-01 12:00:00"
      style={style}
      id={id}
    />
  ),
  video1: ({ editable, style, id }) => (
    <Video1 key={id} editable={editable} style={style} id={id} />
  ),

  video2: ({ editable, style, id }) => (
    <Video2 key={id} editable={editable} style={style} id={id} />
  ),
  sponsor1: ({ editable, style, id }) => (
    <Sponsor1Block key={id} editable={editable} style={style} id={id} />
  ),
  sponsor2: ({ key, editable, style, id }) => (
    <Sponsor1Block key={key} editable={editable} style={style} id={id} />
  ),
  photo1: ({ editable, style, id }) => (
    <ImageBlock key={id} editable={editable} style={style} id={id} />
  ),
  photo2: ({ editable, style, id }) => (
    <Photo key={id} editable={editable} style={style} id={id} />
  ),
  contactUs1: ({ editable, style, id }) => (
    <ContactUs1 key={id} editable={editable} style={style} id={id} />
  ),
  contactUs2: ({ editable, style, id }) => (
    <ContactUs2 key={id} editable={editable} style={style} id={id} />
  ),
  footer1: ({ editable, style, id }) => (
    <Footer1 key={id} editable={editable} style={style} id={id} />
  ),
  footer2: ({ editable, style, id }) => (
    <Footer2 key={id} editable={editable} style={style} id={id} />
  ),
  icon: ({ editable, style, id }) => (
    <IconSocial key={id} editable={editable} style={style} id={id} />
  ),
};
