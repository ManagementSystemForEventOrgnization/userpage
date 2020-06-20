import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProfileInfor from 'containers/user/ProfileInfor';
// import BankAccount from 'containers/user/BankAccount';
import Header from 'containers/share/_layout/Header';

//import UpdateProfileInfor from 'containers/user/UpdateProfileInfor';
// import BankAccount from 'containers/user/BankAccount/BankAccount';
// import BankAccount from 'containers/user/BankAccount';
// import { Route, Router } from 'react-router-dom';
import { userActions } from 'action/user.action';
import TransactionHistory from 'containers/user/TransactionHistory';

class ProfilePage extends Component {
  componentDidMount = () => {
    const { getCurrentUser } = this.props;
    getCurrentUser();
  };

  render() {
    return (
      <div>
        <div className="fixed-top">
          <Header />
        </div>
        <div className="ProfileInfor mt-5 p-3 row">
          <div className=" col-3">
            <ProfileInfor />
          </div>
          <div className=" col-9">
            {/* <BankAccount /> */}
            {/* <UpdateProfileInfor /> */}
            <TransactionHistory />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: () => dispatch(userActions.getCurrentUser()),
});

export default connect(null, mapDispatchToProps)(ProfilePage);
