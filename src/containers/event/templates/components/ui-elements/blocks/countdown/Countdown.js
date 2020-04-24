import React, { Component } from 'react'
import Timer from '../../atoms/Timer'
export default class Countdown extends Component {

    render() {
        const { editable, key } = this.props;
        return (
            <div>
                <Timer startCount={this.props.startCount}
                    editable={editable}
                    key={key} />
            </div>
        )
    }
}
