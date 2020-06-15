import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import { Steps, Select, Tabs } from 'antd';
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  MailruShareButton,
  ViberShareButton,
  WorkplaceShareButton,
  LineShareButton,
  WeiboShareButton,
  PocketShareButton,
  InstapaperShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestIcon,
  VKIcon,
  OKIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  TumblrIcon,
  MailruIcon,
  EmailIcon,
  LivejournalIcon,
  ViberIcon,
  WorkplaceIcon,
  LineIcon,
  PocketIcon,
  InstapaperIcon,
  WeiboIcon,
} from 'react-share';

const orientation = ['left', 'right', 'center'];

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

const iconName = ['icon-facebook', 'icon-twitter', 'icon-tuichu'];

const { TabPane } = Tabs;
const { Step } = Steps;
const { Option } = Select;
const buttonWidth = 70;
const exampleText =
  'Pellentesque ullamcorper tortor ut auctor consequat. Nullam sed nisi massa. Aliquam eget enim nunc. Praesent blandit blandit ornare. Sed lacinia felis quis elit luctus, et tincidunt elit aliquam. Sed porttitor eros id purus sollicitudin, quis pellentesque nunc pulvinar. Ut accumsan a sem quis dignissim. Sed lacus mauris, efficitur ac lobortis id, faucibus at quam. Praesent quis metus hendrerit, vulputate nibh vel, eleifend nibh. Donec cursus, elit id auctor porta, orci felis condimentum est, ut bibendum lacus elit non mi.';
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const nameIcon = [
  'Facebook',
  'Twitter',
  'Pinterest',
  'VK',
  'OK',
  'Reddit',
  'Mailru',
  'Viber',
  'Workplace',
  'Line',
  'Weibo',
  'Pocket',
  'Instapaper',
  'Telegram',
  'Messenger',
  'Linkedin',
  'Whatsapp',
  'Tumblr',
  'Email',
  'Livejournal',
];
const listIcon = {
  Facebook: (url, title, size) => (
    <FacebookShareButton url={url} quote={title}>
      <FacebookIcon size={size} round />
    </FacebookShareButton>
  ),

  Twitter: (url, title, size) => (
    <TwitterShareButton url={url} quote={title}>
      <TwitterIcon size={size} round />
    </TwitterShareButton>
  ),

  Pinterest: (url, title, size) => (
    <PinterestShareButton url={url} quote={title}>
      <PinterestIcon size={size} round />
    </PinterestShareButton>
  ),

  VK: (url, title, size) => (
    <VKShareButton url={url} quote={title}>
      <VKIcon size={size} round />
    </VKShareButton>
  ),

  OK: (url, title, size) => (
    <OKShareButton url={url} quote={title}>
      <OKIcon size={size} round />
    </OKShareButton>
  ),

  Reddit: (url, title, size) => (
    <RedditShareButton url={url} quote={title}>
      <RedditIcon size={size} round />
    </RedditShareButton>
  ),

  Messenger: (url, title, size) => (
    <FacebookMessengerShareButton url={url} quote={title}>
      <FacebookMessengerIcon size={size} round />
    </FacebookMessengerShareButton>
  ),

  Linkedin: (url, title, size) => (
    <LinkedinShareButton url={url} quote={title}>
      <LinkedinIcon size={size} round />
    </LinkedinShareButton>
  ),

  Telegram: (url, title, size) => (
    <TelegramShareButton url={url} quote={title}>
      <TelegramIcon size={size} round />
    </TelegramShareButton>
  ),

  Whatsapp: (url, title, size) => (
    <WhatsappShareButton url={url} quote={title}>
      <WhatsappIcon size={size} round />
    </WhatsappShareButton>
  ),

  Email: (url, title, size) => (
    <EmailShareButton url={url} quote={title}>
      <EmailIcon size={size} round />
    </EmailShareButton>
  ),

  Tumblr: (url, title, size) => (
    <TumblrShareButton url={url} quote={title}>
      <TumblrIcon size={size} round />
    </TumblrShareButton>
  ),

  Livejournal: (url, title, size) => (
    <LivejournalShareButton url={url} quote={title}>
      <LivejournalIcon size={size} round />
    </LivejournalShareButton>
  ),

  Mailru: (url, title, size) => (
    <MailruShareButton url={url} quote={title}>
      <MailruIcon size={size} round />
    </MailruShareButton>
  ),

  Viber: (url, title, size) => (
    <ViberShareButton url={url} quote={title}>
      <ViberIcon size={size} round />
    </ViberShareButton>
  ),

  Workplace: (url, title, size) => (
    <WorkplaceShareButton url={url} quote={title}>
      <WorkplaceIcon size={size} round />
    </WorkplaceShareButton>
  ),

  Line: (url, title, size) => (
    <LineShareButton url={url} quote={title}>
      <LineIcon size={size} round />
    </LineShareButton>
  ),

  Weibo: (url, title, size) => (
    <WeiboShareButton url={url} quote={title}>
      <WeiboIcon size={size} round />
    </WeiboShareButton>
  ),

  Pocket: (url, title, size) => (
    <PocketShareButton url={url} quote={title}>
      <PocketIcon size={size} round />
    </PocketShareButton>
  ),

  Instapaper: (url, title, size) => (
    <InstapaperShareButton url={url} quote={title}>
      <InstapaperIcon size={size} round />
    </InstapaperShareButton>
  ),
};

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export {
  orientation,
  IconFont,
  iconName,
  TabPane,
  Option,
  buttonWidth,
  Step,
  exampleText,
  responsive,
  listIcon,
  nameIcon,
  layout,
  tailLayout,
};
