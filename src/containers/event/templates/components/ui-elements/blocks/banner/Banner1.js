import React, { Component } from 'react';
import Image from '../../atoms/Image';

class Banner1 extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div className="banner-block-1 ">
                <Image editable={true} />
            </div>
        )
    }
}

export default Banner1
