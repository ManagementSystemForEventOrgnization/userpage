const ButtonState = (props) => ({
  visible: false,
  content: props.content ? props.content : 'welcome',
  isDesign: false,
  isButton: false,

  borderWidthButton: 1,
  borderColorButton: 'black',
  borderStyle: 'solid',

  margin: [1, 1, 1, 1],
  padding: [1, 1, 1, 1],

  background: 'white',
  color: props.style
    ? props.style.color
      ? props.style.color
      : 'black'
    : 'black',

  fontSize: props.style
    ? props.style.fontSize
      ? props.style.fontSize
      : 20
    : 20,
  fonts: 'Times New Roman',
  lineText: 80,
  letterSpacing: 0,
  textAlign: props.style
    ? props.style.textAlign
      ? props.style.textAlign
      : 'left'
    : 'left',
  tranform: ' ',

  fontWeight: props.style
    ? props.style.fontWeight
      ? props.style.fontWeight
      : 'normal'
    : 'normal',
  borderRadius: 1,
});

export { ButtonState };