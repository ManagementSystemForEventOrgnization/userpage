import React from 'react';
import { Link } from 'react-router-dom';
import {
  FacebookOutlined,
  GoogleOutlined,
  SkypeOutlined,
  InstagramOutlined,
} from '@ant-design/icons';

import { Button } from 'antd';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // state variables
    };
  }

  render() {
    const src =
      'https://res.cloudinary.com/dwt4njhmt/image/upload/v1594562886/logo-khtn_full_eixg1j.png';
    return (
      <div className="footer-background">
        <div className="footer-transbox">
          <div className="footer-content container">
            <div className="row">
              <div className="col-lg-4 col-sm-12 content-col">
                <p className="footer-inline" style={{ fontWeight: 'bolder' }}>
                  EVENT IN YOUR HAND
                </p>
                <img src={src} alt="logo" style={{ width: '100%' }} />
              </div>
              <div className="col-lg-2 col-md-4 col-sm-6 content-col">
                <p className="footer-inline">Development</p>
                <p>Phan Thị Mai</p>
                <p>Nguyễn Thị Hồng Mơ</p>
                <p>Nguyễn Thanh Nhựt</p>
                <p>Hoàng Thị Hoài Nhi</p>
                <p>Nguyễn Văn Sang </p>
                <p>Tạ Thị Tú Phi</p>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6 content-col">
                <p className="footer-inline">Customer Support</p>
                <p>Create Event</p>
                <p>Manage Event</p>
                <p>Payment </p>
                <p>Join Event</p>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-12 content-col">
                <div className="flexContainer">
                  <p className="footer-space footer-inline ">Follow Us</p>
                  <div>
                    <Link to="/">
                      <Button
                        style={{
                          background: '#3B5998',
                          margin: '5px',
                          width: ' 36px',
                          height: '36px',
                        }}
                        shape="circle"
                        icon={
                          <FacebookOutlined className=" fa-facebook social-network-icon" />
                        }
                      />
                    </Link>
                    <Link to="/">
                      <Button
                        className="sizeButton"
                        style={{
                          background: '#4e92df',
                          margin: '5px',
                          width: ' 36px',
                          height: '36px',
                        }}
                        shape="circle"
                        icon={
                          <SkypeOutlined className=" fa-twitter social-network-icon" />
                        }
                      />
                      <Button
                        style={{
                          background: '#EA4335',
                          margin: '5px',
                          width: ' 36px',
                          height: '36px',
                        }}
                        shape="circle"
                        icon={
                          <GoogleOutlined className=" fa-google social-network-icon" />
                        }
                      />
                    </Link>
                    <Link to="/">
                      <Button
                        style={{
                          margin: '5px',
                          width: ' 36px',
                          height: '36px',
                        }}
                        shape="circle"
                        icon={
                          <InstagramOutlined className=" fa-instagram social-network-icon" />
                        }
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <hr className="footer-hr" />
            <div className="footer-below">
              <div className="row">
                <div className="col-lg-4 col-md-8 col-sm-6">
                  <p>Copyright © 2020 Trường Đại Học Khoa Học Tự Nhiên </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
