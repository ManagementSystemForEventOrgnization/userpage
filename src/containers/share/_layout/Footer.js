import React from 'react';
import { Link } from 'react-router-dom';
import {
  PhoneOutlined,
  AppleOutlined,
  AndroidOutlined,
  MobileOutlined,
  DesktopOutlined,
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
    return (
      <div className=" footer pl-5 pr-5   " style={{ marginTop: '15%' }}>
        <div className="row">
          <div className="col">
            <b>Hotline</b>
            <div>
              <label>Hồ Chí Minh: Thứ 2- thứ 6 (8:30 - 18:30)</label>

              <b>
                {' '}
                <PhoneOutlined /> 09124625
              </b>
            </div>
          </div>

          <div className="col">
            <b>Email hỗ trợ </b>
            <div> datn.qlsk@gmail.com</div>
          </div>
          <div className="col">
            <b>Hotline </b>
            <div>Dễ dàng - Tiện lợi - Bảo mật cao</div>
          </div>
          <div className="col">
            <b>Hotline hỗ trợ</b>
            <div>Trường Đại học Khoa học Tự Nhiên</div>
          </div>
        </div>
        <hr></hr>
        <div className="row">
          <div className="col ml-4">
            <div>
              <b>Platform</b>
              <div className="row">
                <Link to="" className="col iconCard">
                  <div className="row">
                    <AppleOutlined className="icon col-2" />
                    <label className="iconText col-8">
                      <p>AVAILABLE ON</p>
                      <p>APP STORE</p>
                    </label>
                  </div>
                </Link>
                <Link to="" className="col iconCard">
                  <div className="row">
                    <AndroidOutlined className="icon col-2" />
                    <label className="iconText col-8">
                      <p>AVAILABLE ON</p>
                      <p>GOOGLE PLAY</p>
                    </label>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="col ml-4">
            <div>
              <b>Application</b>

              <div className="row">
                <Link to="" className="col iconCard">
                  <div className="row">
                    <DesktopOutlined className="icon col-2" />
                    <label className="iconText col-8">
                      <p>AVAILABLE ON</p>
                      <p>DESTOP APP</p>
                    </label>
                  </div>
                </Link>
                <Link to="" className="col iconCard">
                  <div className="row">
                    <MobileOutlined className="icon col-2" />
                    <label className="iconText col-8">
                      <p>AVAILABLE ON</p>
                      <p>MOBILE APP</p>
                    </label>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <b style={{ fontWeight: 'bold' }}>Follow Us</b>
            <div>
              <Button
                style={{ background: '#3B5998' }}
                shape="circle"
                icon={
                  <FacebookOutlined className=" fa-facebook social-network-icon" />
                }
              />
              <Button
                style={{ background: '#4e92df' }}
                shape="circle"
                icon={
                  <SkypeOutlined className=" fa-twitter social-network-icon" />
                }
              />
              <Button
                style={{ background: '#EA4335' }}
                shape="circle"
                icon={
                  <GoogleOutlined className=" fa-google social-network-icon" />
                }
              />
              <Button
                shape="circle"
                icon={
                  <InstagramOutlined className=" fa-instagram social-network-icon" />
                }
              />
            </div>
          </div>
          <div className="col mb-3">
            <b>Language</b>
            <div>
              <div style={{ display: 'flex' }}>
                <p>
                  <span className="control-icon vietnamese-icon"></span>
                </p>
                <p>
                  <span className="control-icon uk-icon ml-3"></span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
