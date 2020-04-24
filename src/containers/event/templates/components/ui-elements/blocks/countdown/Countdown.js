import React, { Component } from 'react'
import Timer from '../../atoms/Timer'
export default class Countdown extends Component {

    render() {
        return (
            <div>
                <Timer startCount={this.props.startCount} key={this.props.key} />
            </div>
        )
    }
}
