const HeaderState = (props) => ({
  visible: false,
  urlLogo:
    'https://res.cloudinary.com/eventinyourhand/image/upload/v1592658069/sponsor/git_vumynk.png',

  selectedItem: '',
  margin: [0, 1, 1, 1],
  padding: [1, 1, 1, 1],
  background: 'white',
  fontSize: props.newStyle
    ? props.newStyle.fontSize
      ? props.newStyle.fontSize
      : 20
    : 20,
  lineText: 80,
  letterSpacing: 0,
  textAlign: props.newStyle
    ? props.newStyle.textAlign
      ? props.newStyle.textAlign
      : 'left'
    : 'left',
  transform: ' ',
  color: props.newStyle
    ? props.newStyle.color
      ? props.newStyle.color
      : '#333333'
    : '#333333',
  fontWeight: props.newStyle
    ? props.newStyle.fontWeight
      ? props.newStyle.fontWeight
      : 'normal'
    : 'normal',
});
export { HeaderState };
