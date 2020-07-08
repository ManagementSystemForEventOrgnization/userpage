import { exampleText } from '../../constants/atom.constant';

const defaultTitle = {
  value: 'Title',
  style: {
    fontWeight: 'bolder',
    fontSize: 40,
  },
};
const defaultDescription = {
  value: exampleText,
  style: {
    fontSize: 20,
  },
};

const EventDescriptionState = (props) => ({
  collapse: false,
  margin: [1, 1, 1, 1],
  padding: [7, 1, 1, 7],
  url: '',
  bgColor: 'white',
  opacity: 0.3,
  content: {
    col1: {
      title: defaultTitle,
      description: defaultDescription,
    },
    col2: {
      title: defaultTitle,
      description: defaultDescription,
      subTitle: defaultTitle,
      subDescription: defaultDescription,
    },
  },
});

export { EventDescriptionState };
