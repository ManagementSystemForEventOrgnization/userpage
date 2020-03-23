import React from 'react';
import {
    PhoneOutlined,
    AppleOutlined,
    AndroidOutlined,
    MobileOutlined,
    DesktopOutlined,
    FacebookOutlined,
    LinkedinOutlined,
    GoogleOutlined,
    SkypeOutlined,
    FlagOutlined
} from '@ant-design/icons';

import { Button, Radio } from 'antd';

class Footer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // state variables 
        }
    }

    render() {
        return (
            <div className=" footer p-3  ">
                <div className="row">
                    <div className="col">
                        <b>Hotline hỗ trợ</b>
                        <div>
                            <label>Hồ Chí Minh: Thứ 2- thứ 6 (8:30 - 18:30)</label>

                            <b> <PhoneOutlined />  09124625</b>
                        </div>
                    </div>
                    <div className="col">
                        <div>
                            <b>Hotline hỗ trợ</b>
                            <div>Dễ dàng - Tiện lợi - Bảo mật cao</div>
                        </div>
                        <div>
                            <b>Hotline hỗ trợ</b>
                            <div>Dễ dàng - Tiện lợi - Bảo mật cao</div>
                        </div>
                    </div>
                    <div className="col">
                        <div>
                            <b>Hotline hỗ trợ</b>
                            <div>Dễ dàng - Tiện lợi - Bảo mật cao</div>
                        </div>
                        <div>
                            <b>Hotline hỗ trợ</b>
                            <div>Dễ dàng - Tiện lợi - Bảo mật cao</div>
                        </div>
                        <div>
                            <b>Hotline hỗ trợ</b>
                            <div>Dễ dàng - Tiện lợi - Bảo mật cao</div>
                        </div>
                    </div>
                    <div className="col">
                        <div>
                            <b>Hotline hỗ trợ</b>
                            <div>Dễ dàng - Tiện lợi - Bảo mật cao</div>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div className="row">
                    <div className="col ml-4">
                        <div>
                            <b>Ứng dụng Ticketbox</b>

                            <div class="row">
                                <a href="#" className="col iconCard">
                                    <div className="row">
                                        <AppleOutlined className="icon col-2" />
                                        <label className="iconText col-8">
                                            <p>AVAILABLE ON</p>
                                            <p>APP STORE</p>
                                        </label>
                                    </div>
                                </a>
                                <a href="#" className="col iconCard">
                                    <div className="row">
                                        <AndroidOutlined className="icon col-2" />
                                        <label className="iconText col-8">
                                            <p>AVAILABLE ON</p>
                                            <p>GOOGLE PLAY</p>
                                        </label>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col ml-4">
                        <div>
                            <b>Ứng dụng check-in</b>

                            <div class="row">
                                <a href="#" className="col iconCard">
                                    <div className="row">
                                        <DesktopOutlined className="icon col-2" />
                                        <label className="iconText col-8">
                                            <p>AVAILABLE ON</p>
                                            <p>DESTOP APP</p>
                                        </label>
                                    </div>
                                </a>
                                <a href="#" className="col iconCard">
                                    <div className="row">
                                        <MobileOutlined className="icon col-2" />
                                        <label className="iconText col-8">
                                            <p>AVAILABLE ON</p>
                                            <p>MOBILE APP</p>
                                        </label>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <b>Ứng dụng Ticketbox</b>
                        <div>
                            <Button type="primary" shape="circle" icon={<FacebookOutlined />} />
                            <Button type="primary" shape="circle" icon={<SkypeOutlined />} />
                            <Button type="primary" shape="circle" icon={<GoogleOutlined />} />
                            <Button type="primary" shape="circle" icon={<LinkedinOutlined />} />
                        </div>
                    </div>
                    <div className="col mb-3">
                        <b>Ngôn Ngữ</b>
                        <div>
                            <Button type="primary" icon={<FlagOutlined />} />
                            <Button type="primary" icon={<FlagOutlined />} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}


export default Footer;