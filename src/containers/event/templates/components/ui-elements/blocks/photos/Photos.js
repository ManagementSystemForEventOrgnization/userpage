import React, { Component } from 'react'
import ImageBlock from '../../atoms/Image';

class Photos extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        const { editable } = this.props;
        const style = {
            margin: '10px',
            padding: '5px',
            height: '45vh'
        }
        return (
            <div className="d-flex child-block" style={style}>
                <ImageBlock editable={editable} />
                <ImageBlock url='/bg-2.jpg' editable={editable} />
                <ImageBlock leftModal={true} editable={editable} />
                <ImageBlock url='/bg-2.jpg' leftModal={true} editable={editable} />

            </div>
        )
    }
}

export default Photos
