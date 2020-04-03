import React, { Component } from 'react'
import Header from '../containers/share/_layout/Header'
import Footer from '../containers/share/_layout/Footer'
import Banner from '../components/Banner'
import EventList from '../containers/share/EventList'



export default class HomePage extends Component {
    render() {
        return (
            <div>
                <Header />
                <Banner />
                {/* <H1>S</H1>
                <H1>S</H1> */}

                {/* <Event></Event> */}
                <EventList></EventList>
                <Footer />
            </div>
        )
    }
}
