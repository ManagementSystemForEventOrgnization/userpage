import React, { Component } from 'react';
import Image from '../../atoms/Image';

class Banner1 extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        const { editable } = this.props;
        return (
            <Image editable={editable} />

        )
    }
}

export default Banner1
