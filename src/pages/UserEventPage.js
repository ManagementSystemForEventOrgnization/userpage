import React, { Component } from 'react'
import Footer from '../containers/share/_layout/Footer'
import Header from '../containers/share/_layout/Header';
import HistoryProfile from '../containers/user/HistoryProfile';

export default class UserEventPage extends Component {
    render() {
        return (
            <div>
                <Header />
                <HistoryProfile></HistoryProfile>
                <Footer />
            </div>
        )
    }
}
