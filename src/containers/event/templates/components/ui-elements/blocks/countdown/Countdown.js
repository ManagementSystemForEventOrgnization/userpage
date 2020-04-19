import React, { Component } from 'react'
import Timer from '../../atoms/Timer'
export default class Countdown extends Component {

    // getCountDownTime() {
    //     var diff = new Date('2021-02-07 15:13:06').getTime() - new Date().getTime();
    //     return diff;
    // }

    render() {
        return (
            <div>
                <Timer />
            </div>
        )
    }
}
