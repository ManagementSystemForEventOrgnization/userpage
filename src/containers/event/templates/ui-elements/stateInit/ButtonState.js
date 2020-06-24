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

  background: props.newStyle
    ? props.newStyle.background
      ? props.newStyle.background
      : '#40a9ff'
    : '#40a9ff',

  color: props.newStyle
    ? props.newStyle.color
      ? props.newStyle.color
      : '#fff'
    : '#fff',

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
      : 'center'
    : 'center',
  tranform: ' ',

  fontWeight: props.newStyle
    ? props.newStyle.fontWeight
      ? props.newStyle.fontWeight
      : 'normal'
    : 'normal',
  borderRadius: 2,
  display: 'inline-block',
  whiteSpace: 'nowrap',
  touchAction: 'manipulation',
  height: '38px',
  textDecoration: props.newStyle
    ? props.newStyle.fontWeight
      ? props.newStyle.fontWeight
      : 'normal'
    : 'normal',

  alignContent: props.newStyle
    ? props.newStyle.alignContent
      ? props.newStyle.alignContent
      : 'center'
    : 'center',
});

export { ButtonState };
