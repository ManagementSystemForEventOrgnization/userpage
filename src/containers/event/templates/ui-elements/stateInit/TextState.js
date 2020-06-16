import { exampleText } from '../../constants/atom.constant';

const TextState = (props) => ({
  visible: false,
  content: props.content || exampleText,
  margin: [1, 1, 1, 1],
  padding: [2, 2, 2, 2],
  background: 'none',
  fontSize: props.newStyle
    ? props.newStyle.fontSize
      ? props.newStyle.fontSize
      : 20
    : 20,
  fonts: 'Arial',
  lineText: 80,
  letterSpacing: 0,
  textAlign: props.newStyle
    ? props.newStyle.textAlign
      ? props.newStyle.textAlign
      : 'left'
    : 'left',
  transform: props.newStyle ? props.newStyle.transform ? props.newStyle.transform : '' : '',
  color: props.newStyle
    ? props.newStyle.color
      ? props.newStyle.color
      : 'black'
    : 'black',
  fontWeight: props.newStyle
    ? props.newStyle.fontWeight
      ? props.newStyle.fontWeight
      : 'normal'
    : 'normal',
});

export { TextState };
