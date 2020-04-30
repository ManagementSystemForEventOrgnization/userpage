
const TimerState = (props) => ({
    visible: false,
    positionButton: '',
    leftButton: props.style ? props.style.left ? props.style.left : 0 : 0,
    rightButton: props.style ? props.style.right ? props.style.right : 0 : 0,
    topButton: props.style ? props.style.top ? props.style.top : 0 : 0,
    bottomButton: props.style ? props.style.bottom ? props.style.bottom : 0 : 0,
    backgroundColor: 'white'
})

export { TimerState }
