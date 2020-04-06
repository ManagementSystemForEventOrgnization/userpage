import React, { Component } from 'react';
import { Button } from 'antd';

import Header from '../containers/share/_layout/Header'
import Footer from '../containers/share/_layout/Footer'
import Banner from '../components/Banner'
import EventList from '../containers/share/EventList';
import CartEvent from '../components/CardEvent';
import Orgnization from '../components/Orgnization';




export default class HomePage extends Component {
    render() {
        const src = "https://images.freeimages.com/images/large-previews/977/beach-1364350.jpg";

        const eventCartDetail = {
            coverURL: src,
            title: 'Nâng Cao Nghiệp Vụ Hướng Dẫn Viên Châu Âu',
            timeStart: 'T2, 13 Tháng 4 2020 3:00 PM',
            address: '02 Tôn Đức Thắng Street,Bến Nghé Ward, Quận 1, Thành Phố Hồ Chí Minh'
        }

        const orgnizations = [
            {
                name: 'Orgnization 1',
                src: '/star.jpg',
                description: 'description'
            },
            {
                name: 'Orgnization 1',
                src: '/star.jpg',
                description: 'description'
            },
            {
                name: 'Orgnization 1',
                src: '/star.jpg',
                description: 'description'
            },
            {
                name: 'Orgnization 1',
                src: '/star.jpg',
                description: 'description'
            },

        ]

        const temp = [1, 2, 3, 4, 5];

        return (
            <div className="homepage">
                <Header />
                <Banner />
                <div className="high-light">
                    <h1>Sư kiện nổi bật</h1>
                    <EventList></EventList>
                </div>

                <div className="list-event">
                    <div className="up-coming pl-2">
                        <h1 className="">Sắp diễn ra</h1>
                        <div className="row pl-5 ">
                            {
                                temp.map(item =>
                                    <div className="col mt-4  shadow pb-3" key={item}>
                                        <CartEvent eventDetail={eventCartDetail} />

                                    </div>
                                )
                            }
                        </div>

                    </div>
                    <hr />
                    <div className="latest">
                        <h1>Mới nhất </h1>
                        <div className="row pl-5">
                            {
                                temp.map(item =>
                                    <div className="col mt-4 shadow pb-3" key={item}>
                                        <CartEvent eventDetail={eventCartDetail} />

                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="orgnization">
                    <h1>Một số tổ chức  </h1>
                    <div className='d-flex justify-content-between mt-3 mb-4 pl-5'>
                        {
                            orgnizations.map((item, index) => <Orgnization key={index} orgnization={item} />)
                        }
                    </div>


                </div>
                <div className="explore">
                    <Button size="large" type="primary">Khám phá nhiều hơn nữa !</Button>
                </div>




                <Footer />
            </div>
        )
    }
}
