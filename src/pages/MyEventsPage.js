import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from 'action/user.action';
import { Spin } from 'antd';
import Header from 'containers/share/_layout/Header';
import ProfileInfor from 'containers/user/ProfileInfor';
import UpdateProfileInfor from 'containers/user/UpdateProfileInfor';
import BankAccount from 'containers/user/BankAccount';
import TransactionHistory from 'containers/user/TransactionHistory';
import QRCode from 'containers/user/QRCode';
class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 1,
    };
  }
  componentDidMount = () => {
    if (this.state.tab === 1) {
      const { getCurrentUser } = this.props;
      getCurrentUser();
    }
  };

  render() {
    const moveTab = (tabNumber) => {
      this.setState({
        tab: tabNumber,
      });
    };

    const { tab } = this.state;
    console.log(tab);
    return (
      <div>
        <div className="fixed-top">
          <Header />
        </div>
        <div className="ProfileInfor mt-5 p-3 row">
          <div className=" col-sm-3">
            <ProfileInfor moveTab={moveTab} />
          </div>
          <div className=" col-sm-9">
            {this.props.pending && (
              <Spin
                tip="Loading..."
                size="large"
                style={{
                  position: 'absolute',
                  marginTop: '100px',
                }}
              >
                {' '}
              </Spin>
            )}
            {tab === 1 && <UpdateProfileInfor />}
            {tab === 2 && <BankAccount />}
            {tab === 3 && <TransactionHistory />}
            {tab === 4 && <QRCode />}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pending: state.user.pending,
    errMessage: state.user.errMessage,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: () => dispatch(userActions.getCurrentUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
