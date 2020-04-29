import { exampleText } from '../../../constants/atom.constant';

const TextState = (props) => ({
  visible: false,
  content: props.content || exampleText,
  margin: [1, 1, 1, 1],
  padding: [1, 1, 1, 1],
  background: 'none',
  fontSize: props.newStyle
    ? props.newStyle.fontSize
      ? props.newStyle.fontSize
      : 20
    : 20,
  fonts: 'Times New Roman',
  lineText: 80,
  letterSpacing: 0,
  textAlign: props.newStyle
    ? props.newStyle.textAlign
      ? props.newStyle.textAlign
      : 'left'
    : 'left',
  tranform: ' ',
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
