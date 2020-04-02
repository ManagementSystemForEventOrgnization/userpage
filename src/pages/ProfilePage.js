import React, { Component } from 'react'
import ProfileInfor from '../containers/user/ProfileInfor'
import Footer from '../containers/share/_layout/Footer'
import Header from '../containers/share/_layout/Header';
import HistoryProfile from '../containers/user/HistoryProfile';
export default class ProfilePage extends Component {
    render() {
        return (
            <div>
                <Header/>
                <ProfileInfor></ProfileInfor>
                <HistoryProfile></HistoryProfile>
                <Footer/>
            </div>
        )
    }
}
