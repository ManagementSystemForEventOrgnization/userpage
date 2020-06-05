import { createFromIconfontCN } from '@ant-design/icons';
import { Steps, Select, Tabs } from 'antd';

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
};
