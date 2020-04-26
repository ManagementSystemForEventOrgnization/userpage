import { createFromIconfontCN } from '@ant-design/icons';
import { Steps, Select,  Tabs } from 'antd';


const orientation = ['left', 'right', 'center'];

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

const iconName = ['icon-facebook',
  'icon-twitter',
  'icon-tuichu',

]

const { TabPane } = Tabs;
const { Step } = Steps;
const { Option } = Select;
const buttonWidth = 70;
const exampleText = 'Pellentesque ullamcorper tortor ut auctor consequat. Nullam sed nisi massa. Aliquam eget enim nunc. Praesent blandit blandit ornare. Sed lacinia felis quis elit luctus, et tincidunt elit aliquam. Sed porttitor eros id purus sollicitudin, quis pellentesque nunc pulvinar. Ut accumsan a sem quis dignissim. Sed lacus mauris, efficitur ac lobortis id, faucibus at quam. Praesent quis metus hendrerit, vulputate nibh vel, eleifend nibh. Donec cursus, elit id auctor porta, orci felis condimentum est, ut bibendum lacus elit non mi.'

export { orientation, IconFont, iconName, TabPane, Option, buttonWidth, Step,exampleText }
