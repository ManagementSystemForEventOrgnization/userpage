const ButtonState = (props) => ({
  visible: false,
  content: props.content ? props.content : 'welcome',
  isDesign: false,
  isButton: false,

  borderWidthButton: 1,
  borderColorButton: '#40a9ff',
  borderStyle: 'solid',

  margin: [1, 1, 1, 1],
  padding: [1, 1, 1, 1],

  background: '#40a9ff',

  color: props.style
    ? props.style.color
      ? props.style.color
      : '#fff'
    : '#fff',

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
      : 'center'
    : 'center',
  tranform: ' ',

  fontWeight: props.style
    ? props.style.fontWeight
      ? props.style.fontWeight
      : 'normal'
    : 'normal',
  borderRadius: 2,
  display: 'inline-block',
  whiteSpace: 'nowrap',
  touchAction: 'manipulation',
  height: '38px',
});

export { ButtonState };
