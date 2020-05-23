import React, { Component } from 'react';
import { connect } from 'react-redux';

import { userActions } from '../../action/user.action';

class UpdateProfileInfor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfor: {
        fullName: '',
        birthday: '',
        gender: '',
        job: '',
        phone: '',
        discription: '',
        avatarUrl: '',
        address: '',
        email: '',
      },
      visible: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.userInfor && nextProps.userInfor !== prevState.userInfor) {
      return { userInfor: nextProps.userInfor };
    } else return null;
  }

  render() {
    const { userInfor } = this.state;
    return (
      <div>
        <div className="">
          <div className="w3-white w3-text-grey w3-card-4">
            <div className="w3-display-container">
              <img
                src={userInfor.avatar}
                style={{ width: '100%' }}
                alt="Avatar"
              />
              <div className="w3-display-bottomleft w3-container w3-text-black">
                <h2>{userInfor.fullName}</h2>
              </div>
            </div>
            <div className="w3-container mt-3">
              <p>
                <i className="fa fa-briefcase fa-fw w3-margin-right w3-large w3-text-teal" />
                {userInfor.job}
              </p>
              <p>
                <i className="fa fa-home fa-fw w3-margin-right w3-large w3-text-teal" />
                {userInfor.address}
              </p>
              <p>
                <i className="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-teal" />
                {userInfor.email}
              </p>
              <p>
                <i className="fa fa-phone fa-fw w3-margin-right w3-large w3-text-teal" />
                {userInfor.phone}
              </p>
              <hr />
              <p className="w3-large">
                <b>
                  <i className="fa fa-asterisk fa-fw w3-margin-right w3-text-teal" />
                  Profile
                </b>
              </p>
              <p>Personal Information</p>
              <div className="w3-light-grey w3-round-xlarge w3-small">
                <div
                  className="w3-container w3-center w3-round-xlarge w3-teal"
                  style={{ width: '90%' }}
                >
                  90%
                </div>
              </div>
              <p>Organization</p>
              <div className="w3-light-grey w3-round-xlarge w3-small">
                <div
                  className="w3-container w3-center w3-round-xlarge w3-teal"
                  style={{ width: '80%' }}
                >
                  <div className="w3-center w3-text-white">80%</div>
                </div>
              </div>
              <br />
              <p className="w3-large w3-text-theme">
                <b>
                  <i className="fa fa-globe fa-fw w3-margin-right w3-text-teal" />
                  Bank Account
                </b>
              </p>
              <p>Visa</p>
              <div className="w3-light-grey w3-round-xlarge">
                <div
                  className="w3-round-xlarge w3-teal"
                  style={{ height: '24px', width: '100%' }}
                />
              </div>
              <p>Local Credit</p>
              <div className="w3-light-grey w3-round-xlarge">
                <div
                  className="w3-round-xlarge w3-teal"
                  style={{ height: '24px', width: '55%' }}
                />
              </div>
              <br />
            </div>
          </div>
          <br />
          {/* End Left Column */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfor: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onUpdateUserProfile: (userInfor) =>
    dispatch(userActions.onUpdateUserProfile(userInfor)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfileInfor);
