import React, { Component } from 'react'

import Header from '../containers/share/_layout/Header';
import ManageEvent from '../containers/event/manageEvents';

export default class ManageEventPage extends Component {
    render() {
        return (
            <div>
                <div className="fixed-top">
                    <Header />
                </div>
                <ManageEvent></ManageEvent>

            </div>
        )
    }
}
