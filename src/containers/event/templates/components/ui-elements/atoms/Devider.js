import React, { Component } from 'react';
import { Divider } from 'antd';


class DeviderBlock extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        const { key } = this.props;
        const orientation = "left";
        return (
            <div key={key} className="child-block">
                <Divider orientation={orientation}>Left Text</Divider>
            </div>
        )
    }
}

export default DeviderBlock
