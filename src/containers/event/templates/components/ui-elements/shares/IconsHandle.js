import React, { Component } from 'react'
import {
    EditTwoTone,
    PlusCircleTwoTone,
    DeleteTwoTone
} from '@ant-design/icons'

class IconsHandle extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        const { collapseModal, handleDuplicate, handleDelete } = this.props;
        const iconStyle = {
            fontSize: '20px',
        }
        return (
            <div className="icons-handle">
                <EditTwoTone style={iconStyle} onClick={collapseModal} />
                <PlusCircleTwoTone style={iconStyle} className="mt-3" onClick={handleDuplicate} />
                <DeleteTwoTone style={iconStyle} className="mt-3" onClick={handleDelete} />
            </div>
        )
    }
}

export default IconsHandle
