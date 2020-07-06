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
    ...item,
    pending: false,
    status: item.status || 'error',
  })),
});

const titleStyle = {
  fontWeight: 'bold',
  fontSize: 20,
  color: 'blue',
};

const calendar = {
  border: '#f7bdbd solid 1px',
  width: '83px',
  height: '90px',
  textAlign: 'center',
  fontSize: 15,
  fontWeight: 'bold',
  borderRadius: '3px',
};

const monthStyle = {
  background: 'red',
  fontWeight: 'bolder',
  borderRadius: '3px',
};

const moneyStyle = {
  fontSize: '17px',
  color: 'blue',
  fontWeight: 'bolder',
  textShadow: '0 0 3px #fb2020',
};
export const ScheduleConstant = {
  ScheduleState,
  titleStyle,
  calendar,
  moneyStyle,
  monthStyle,
};
