import React, { Component } from 'react'
import ImageBlock from '../../atoms/Image';

class Photos extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        const style = {
            margin: '10px',
            padding: '5px',
            height: '45vh'
        }
        return (
            <div className="d-flex child-block" style={style}>
                <ImageBlock />
                <ImageBlock url='/bg-2.jpg' />
                <ImageBlock leftModal={true} />
                <ImageBlock url='/bg-2.jpg' leftModal={true} />

            </div>
        )
    }
}

export default Photos
