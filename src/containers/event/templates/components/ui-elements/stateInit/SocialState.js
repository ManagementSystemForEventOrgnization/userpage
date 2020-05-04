import React from 'react';
import {
  FacebookOutlined,
  SkypeOutlined,
  YoutubeOutlined,
  InstagramOutlined,
} from '@ant-design/icons';

const SocialState = (props) => ({
  visible: false,
  IconSocials: [
    {
      id: 1,
      name: 'facebook',
      pathLink: 'https://www.facebook.com/',

      options: ({ pathLink, key }) => (
        <a href={pathLink} key={key}>
          <FacebookOutlined className="fa-facebook social-network-icon" />
        </a>
      ),
    },
    {
      id: 2,
      pathLink: 'https://web.skype.com/',
      name: 'skype',
      options: ({ key, pathLink }) => (
        <a key={key} href={pathLink}>
          <SkypeOutlined className="fa-twitter social-network-icon" />
        </a>
      ),
    },
    {
      id: 3,
      pathLink: 'https://www.youtube.com/',
      name: 'youtube',
      options: ({ key, pathLink }) => (
        <a key={key} href={pathLink}>
          <YoutubeOutlined className="fa-google social-network-icon" />
        </a>
      ),
    },
    {
      id: 4,
      pathLink: 'https://www.instagram.com/',
      name: 'intergram',
      options: ({ key, pathLink }) => (
        <a key={key} href={pathLink}>
          <InstagramOutlined className="fa-instagram social-network-icon" />
        </a>
      ),
    },
  ],
});

export { SocialState };
