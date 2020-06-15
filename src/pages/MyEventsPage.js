import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProfileInfor from 'containers/user/ProfileInfor';
import BankAccount from 'containers/user/BankAccount';
import Header from 'containers/share/_layout/Header';

import { userActions } from 'action/user.action';

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
            <BankAccount />
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
