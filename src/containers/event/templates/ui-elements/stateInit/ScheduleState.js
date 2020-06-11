// const src ='https://res.cloudinary.com/dwt4njhmt/image/upload/v1586424285/unnamed_wf6wys.jpg';

const ScheduleState = (props, first) => ({
  visible: false,
  margin: [1, 1, 1, 1],
  padding: [1, 1, 1, 1],
  background: 'none',
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
      : 'black'
    : 'black',
  fontWeight: props.newStyle
    ? props.newStyle.fontWeight
      ? props.newStyle.fontWeight
      : 'normal'
    : 'normal',

  scheduleName: 'Sessions',

  content: props.session.map((item) => ({
    id: item.id,
    time: item.day,
    limitNumber: item.limitNumber,
    name: item.name,
    location: item.address.location,
    pending: false,
    status: item.status || 'error',
  })),
});
export { ScheduleState };
