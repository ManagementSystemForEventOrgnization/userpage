import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from 'action/user.action';

import Header from 'containers/share/_layout/Header';
import ProfileInfor from 'containers/user/ProfileInfor';
import UpdateProfileInfor from 'containers/user/UpdateProfileInfor';
import BankAccount from 'containers/user/BankAccount';
import TransactionHistory from 'containers/user/TransactionHistory';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 1,
    };
  }
  componentDidMount = () => {
    const { getCurrentUser } = this.props;
    getCurrentUser();
  };

  render() {
    const moveTab = (tabNumber) => {
      this.setState({
        tab: tabNumber,
      });
    };

    return (
      <div>
        <div className="fixed-top">
          <Header />
        </div>
        <div className="ProfileInfor mt-5 p-3 row">
          <div className=" col-3">
            <ProfileInfor moveTab={moveTab} />
          </div>
          <div className=" col-9">
            {this.state.tab === 1 && <UpdateProfileInfor />}
            {this.state.tab === 2 && <BankAccount />}
            {this.state.tab === 3 && <TransactionHistory />}
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
