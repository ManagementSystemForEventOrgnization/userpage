import React, { Component } from 'react';
import ProfileInfor from '../containers/user/ProfileInfor';
// import OrderTickets from '../containers/user/OrderTickets'
// import AccountBalance from '../containers/user/AccountBalance'
// import BankAccount from '../containers/user/BankAccount'
// import CreatedEvents from '../containers/user/CreatedEvents'

import Footer from '../containers/share/_layout/Footer';
export default class ProfilePage extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-2 bg-secondary">
            <div className="btn-group-vertical mt-5">
              <a className="btn btn-default mt-5 " role="button">
                Hồ Sơ Cá Nhân
              </a>
              <a className="btn btn-default mt-5" role="button">
                Vé Đã Mua
              </a>
              <a className="btn btn-default mt-5" role="button">
                Sự Kiện Đã Tạo
              </a>
              <a className="btn btn-default mt-5" role="button">
                Số Dư Tài Khoản
              </a>
              <a className="btn btn-default mt-5" role="button">
                Tài Khoản Ngân Hàng
              </a>
            </div>
          </div>
          <div className="col-sm-10">
            <ProfileInfor></ProfileInfor>
            {/* <OrderTickets />
                        <AccountBalance />
                        <BankAccount /> */}
            {/* <CreatedEvents /> */}
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}
