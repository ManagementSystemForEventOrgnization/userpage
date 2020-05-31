import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProfileInfor from 'containers/user/ProfileInfor';
import UpdateProfileInfor from 'containers/user/UpdateProfileInfor';
// import BankAccount from 'containers/user/BankAccount/BankAccount';
import BankAccount from 'containers/user/BankAccount';

import { userActions } from 'action/user.action';

class ProfilePage extends Component {
  componentDidMount = () => {
    const { getCurrentUser } = this.props;
    getCurrentUser();
  };

  render() {
    console.log(this.props)
    return (
      <div className="ProfileInfor mt-5 p-3 row">
        <div className=" col-3">
          <ProfileInfor />
        </div>
        <div className=" col-9">
          {/* <UpdateProfileInfor /> */}
          {/* <BankAccount /> */}
          <BankAccount />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: () => dispatch(userActions.getCurrentUser()),
});

export default connect(null, mapDispatchToProps)(ProfilePage);
