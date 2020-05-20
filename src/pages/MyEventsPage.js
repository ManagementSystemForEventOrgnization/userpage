import React, { Component } from 'react';
import ProfileInfor from '../containers/user/ProfileInfor';
// import OrderTickets from '../containers/user/OrderTickets'
// import AccountBalance from '../containers/user/AccountBalance'
// import BankAccount from '../containers/user/BankAccount'
// import CreatedEvents from '../containers/user/CreatedEvents'
import UpdateProfileInfor from '../containers/user/UpdateProfileInfor';

// import Footer from '../containers/share/_layout/Footer';
export default class ProfilePage extends Component {
  render() {
    return (
      <div className="ProfileInfor mt-5 p-3">
        <div>
          {/* Page Container */}
          <div className="">
            {/* The Grid */}
            <div className=" row">
              {/* Left Column */}
              <div className=" col-3">
                <UpdateProfileInfor />
              </div>
              {/* Right Column */}
              <div className=" col-9">
                <ProfileInfor />
                {/* End Right Column */}
              </div>
              {/* End Grid */}
            </div>
            {/* End Page Container */}
          </div>
          {/* <footer className="w3-container w3-teal w3-center w3-margin-top">
                        <p>Find me on social media.</p>
                        <i className="fa fa-facebook-official w3-hover-opacity" />
                        <i className="fa fa-instagram w3-hover-opacity" />
                        <i className="fa fa-snapchat w3-hover-opacity" />
                        <i className="fa fa-pinterest-p w3-hover-opacity" />
                        <i className="fa fa-twitter w3-hover-opacity" />
                        <i className="fa fa-linkedin w3-hover-opacity" />
                        <p>Powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank">w3.css</a></p>
                    </footer>
                 */}
        </div>
      </div>
    );
  }
}
