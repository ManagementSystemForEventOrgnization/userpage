import React, { Component } from 'react';
import Header from '../containers/share/_layout/Header'
import Footer from '../containers/share/_layout/Footer'
import Banner from '../components/Banner'
import EventList from '../containers/share/EventList';
import EventCard from '../containers/share/EventCard';
import { Button } from 'antd';



export default class HomePage extends Component {
    render() {
        return (
            <div className="homepage">
                <Header />
                <Banner />
                <div className="high-light">
                    <h1>Sư kiện nổi bật</h1>
                    <EventList></EventList>
                </div>

                <div className="list-event">
                    <div className="up-coming">
                        <h1 className="">Sắp diễn ra</h1>
                        <EventCard></EventCard>
                        <EventCard></EventCard>
                        <EventCard></EventCard>
                    </div>

                    <div className="latest">
                        <h1>Mới nhất </h1>
                        <EventCard></EventCard>
                        <EventCard></EventCard>
                        <EventCard></EventCard>
                    </div>
                </div>
                <div className="orgnization">
                    <h1>Một số tổ chức  </h1>
                    <EventCard></EventCard>
                    <EventCard></EventCard>
                    <EventCard></EventCard>
                </div>
                <div className="explore">
                    <Button size="large" type="primary">Khám phá nhiều hơn nữa !</Button>
                </div>




                <Footer />
            </div>
        )
    }
}
