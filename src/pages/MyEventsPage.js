import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProfileInfor from 'containers/user/ProfileInfor';
import UpdateProfileInfor from 'containers/user/UpdateProfileInfor';
import { userActions } from 'action/user.action';

class ProfilePage extends Component {
  componentDidMount = () => {
    const { getCurrentUser } = this.props;
    getCurrentUser();
  };

  render() {
    return (
      <div className="ProfileInfor mt-5 p-3 row">
        <div className=" col-3">
          <UpdateProfileInfor />
        </div>
        <div className=" col-9">
          <ProfileInfor />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: () => dispatch(userActions.getCurrentUser()),
});

export default connect(null, mapDispatchToProps)(ProfilePage);
