import React, { Component } from 'react';

import ImageBlock from '../../atoms/Image';

class Banner1 extends Component {

    render() {
        const { editable } = this.props;
        return <ImageBlock editable={editable} {...this.props} />;
    }
}

export default Banner1;
