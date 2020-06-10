import React from 'react';

import ButtonBlock from '../templates/ui-elements/atoms/Button';
import TextBlock from '../templates/ui-elements/atoms/Text';
import ImageBlock from '../templates/ui-elements/atoms/Image';
import StepBlock from '../templates/ui-elements/atoms/Step';
import DividerBlock from '../templates/ui-elements/atoms/Divider';

import CountDownBlock from '../templates/ui-elements/blocks/countdown/Countdown';

import Photo from '../templates/ui-elements/blocks/photos/Photo';

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

import IconSocial from '../templates/ui-elements/blocks/Social/social';

import Video1 from '../templates/ui-elements/blocks/video/video1';

import Video2 from '../templates/ui-elements/blocks/video/video2';
import Comment from '../templates/ui-elements/blocks/comments/comments';
import Header from 'containers/event/Header';
import Map from '../templates/ui-elements/blocks/map/MapContainer';
import Document from '../templates/ui-elements/blocks/documents/Document';

export const blockList = {
  listOfLink: ({ editable, style, id }) => (
    <Document key={id} editable={editable} style={style} id={id} />
  ),

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
  // header: ({ editable, style, id, match }) => (
  //   <HeaderBlock
  //     key={id}
  //     editable={editable}
  //     style={style}
  //     id={id}
  //     match={match}
  //   />
  // ),

  header: ({ editable, style, id, match, pages, currentPage }) => (
    <Header
      key={id}
      editable={editable}
      style={style}
      id={id}
      match={match}
      pages={pages}
      currentPage={currentPage}
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
  speakers1: ({ editable, style, id }) => (
    <Card1 key={id} editable={editable} style={style} id={id} />
  ),
  speakers2: ({ editable, style, id }) => (
    <Card2 key={id} editable={editable} style={style} id={id} />
  ),

  step: ({ editable, style, id }) => (
    <StepBlock key={id} editable={editable} style={style} id={id} />
  ),
  schedule2: ({ editable, style, id }) => (
    <Schedule key={id} editable={editable} style={style} id={id} />
  ),
  timeline: ({ editable, style, id }) => (
    <Timeline key={id} editable={editable} style={style} id={id} />
  ),
  map1: ({ editable, style, id }) => (
    <Map key={id} editable={editable} style={style} id={id} />
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
  // contactUs1: ({ editable, style, id }) => (
  //   <ContactUs1 key={id} editable={editable} style={style} id={id} />
  // ),
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
  comment: ({ editable, style, id }) => (
    <Comment key={id} editable={editable} style={style} id={id} />
  ),
};
