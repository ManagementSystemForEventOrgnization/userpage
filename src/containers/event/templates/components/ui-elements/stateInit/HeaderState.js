const HeaderState = (props) => ({
    visible: false,
    menuName: [{
        id: 1,
        title: 'home',
        items: [

        ]
    },
    {
        id: 2,
        title: "about",
        items: [{ id: 1, name: "ca nhac" },
        { id: 2, name: "the thao" }]
    },
    {
        id: 3,
        title: 'schedule',
        items: [

        ]
    },

    ],
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


})
export { HeaderState };

