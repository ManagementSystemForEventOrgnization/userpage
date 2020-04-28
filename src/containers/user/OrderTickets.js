import React, { Component } from 'react'
import CardEvent from '../../components/CardEvent'
import { Link } from 'react-router-dom'
import { Pagination } from 'antd';
export default class OrderTickets extends Component {
    constructor(props) {
        super(props);

        const { orderTickets } = this.props
        this.state = {

        }
    }

    render() {
        const src = "https://images.freeimages.com/images/large-previews/977/beach-1364350.jpg";

        const eventCartDetail = {
            coverURL: src,
            title: 'Nâng Cao Nghiệp Vụ Hướng Dẫn Viên Châu Âu',
            timeStart: 'T2, 13 Tháng 4 2020 3:00 PM',
            address: '02 Tôn Đức Thắng Street,Bến Nghé Ward, Quận 1, Thành Phố Hồ Chí Minh'
        }
        const temp = [1, 2, 3, 4, 5, 6];
        return (
            <div className="container order-ticket">
                <div className="ordered-ticket mb-5">
                    <h2>Số vé đã đặt: {this.orderTickets}</h2>
                    <div className="row pl-5 ">
                        {
                            temp.map(item =>
                                <div className="col mt-4  shadow pb-3" key={item}>
                                    <CardEvent eventDetail={eventCartDetail} />

                                </div>
                            )
                        }
                    </div>
                    <div className="mb-5 float-right mt-3">
                        <Pagination simple defaultCurrent={2} total={50} /></div>
                </div>
                <hr></hr>
                <div className="incoming-event">
                    <h2>Su kien sap toi</h2>
                    <div>
                        <div className="card-incoming-event">
                            <div className="row ml-5 mr-5">
                                <div className="col-3">Tháng 5 04</div>
                                <div className="col-9"><hr></hr></div>
                            </div>
                            <div>
                                <div className="card mb-3 " >
                                    <div className="row no-gutters">
                                        <div className="col-md-4">
                                            <img src="http://lokeshdhakar.com/projects/lightbox2/images/image-3.jpg" className="card-img" alt="..." />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">Card title</h5>
                                                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-incoming-event">
                            <div className="row ml-5 mr-5">
                                <div className="col-3">Tháng 5 04</div>
                                <div className="col-9"><hr></hr></div>
                            </div>
                            <div>
                                <div className="card mb-3 " >
                                    <div className="row no-gutters">
                                        <div className="col-md-4">
                                            <img src="http://lokeshdhakar.com/projects/lightbox2/images/image-3.jpg" className="card-img" alt="..." />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">Card title</h5>
                                                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-incoming-event">
                            <div className="row ml-5 mr-5">
                                <div className="col-3">Tháng 5 04</div>
                                <div className="col-9"><hr></hr></div>
                            </div>
                            <div>
                                <div className="card mb-3 " >
                                    <div className="row no-gutters">
                                        <div className="col-md-4">
                                            <img src="http://lokeshdhakar.com/projects/lightbox2/images/image-3.jpg" className="card-img" alt="..." />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">Card title</h5>
                                                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <Link to="/" style={{ color: 'blue' }} activeStyle={{ color: 'red' }}>Dat ve cac su kien khac</Link>
                    </div>
                </div >
            </div >
        )
    }
}
