
const DropDownState = (props) => ({
    items: props.options ? props.options : [{ id: 1, name: 'haha' }],
    txtname: "",
    isAddOption: false,
    isRename: false,
})

export { DropDownState }
