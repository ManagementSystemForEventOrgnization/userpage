
const ButtonState = (content, style) => ({
    visible: false,
    content: content ? content : "wellcome",
    isDesign: false,
    isButton: false,
    borderWidthButton: 0,
    borderColorButton: '',
    margin: [1, 1, 1, 1],
    padding: [1, 1, 1, 1],
    background: "none",
    fontSize: style ? style.fontSize ? style.fontSize : 20 : 20,
    fonts: "Times New Roman",
    lineText: 80,
    letterSpacing: 0,
    textAlign: style ? style.textAlign ? style.textAlign : 'left' : 'left',
    tranform: ' ',
    color: style ? style.color ? style.color : "black" : 'black',
    fontWeight: style ? style.fontWeight ? style.fontWeight : 'normal' : 'normal',
    borderRadius: '15px',
})

export { ButtonState }
