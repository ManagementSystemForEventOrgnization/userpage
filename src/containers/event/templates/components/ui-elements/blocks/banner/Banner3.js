import React, { Component } from 'react';

import GeneralBanner from './GeneralBanner'

class Banner3 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: '/bg-3.jpg',
            visible: false,
            margin: [1, 1, 1, 1],
            padding: [10, 5, 5, 10],

            fontWeight: 'bolder',
            fontSize: 50,
            textAlign: 'center',

            opacity: 0.3,
            bgColor: 'none',

            backgroundType: 'image'
        }
    }

    render() {
        const { editable } = this.props;
        return <GeneralBanner type={3} editable={editable} />
    }
}

export default Banner3
