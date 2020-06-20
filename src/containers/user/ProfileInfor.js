import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'antd';
import ChangePassword from './ChangePassword'
class UpdateProfileInfor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfor: {
        fullName: '',
        gender: '',
        job: '',
        phone: '',
        discription: '',
        avatar: '',
        address: '',
        birthday: '',
        email: '',
        orgName: '',
        orgDes: '',
        orgWeb: '',
        orgPhone: '',
        orgEmail: '',
      },
      visible: false,
      percentOfPersonalInfor: 0,
      percenOfOrgInfor: 0,
      isShowModel: false
    };

    this.updatePercentInfor = this.updatePercentInfor.bind(this);
  }

  updatePercentInfor() {
    const attPersonalInfor = [
      'fullName',
      'gender',
      'job',
      'phone',
      'discription',
      'avatar',
      'address',
      'birthday',
      'email',
    ];
    let countPersonalInfor = 0;
    attPersonalInfor.forEach((element) => {
      if (
        this.state.userInfor[element] !== '' &&
        this.state.userInfor[element] !== undefined
      )
        countPersonalInfor++;
    });

    const attOrgInfor = ['orgName', 'orgDes', 'orgWeb', 'orgPhone', 'orgEmail'];

    let countOrgInfor = 0;
    attOrgInfor.forEach((element) => {
      if (
        this.state.userInfor[element] !== '' &&
        this.state.userInfor[element] !== undefined
      )
        countOrgInfor++;
    });
    this.setState({
      percentOfPersonalInfor:
        (countPersonalInfor * 100) / 9 -
        (((countPersonalInfor * 100) / 9) % 10),
      percenOfOrgInfor:
        (countOrgInfor * 100) / 5 - (((countOrgInfor * 100) / 5) % 10),
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.userInfor && nextProps.userInfor !== prevState.userInfor) {
      return {
        userInfor: nextProps.userInfor,
      };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userInfor !== this.props.userInfor) {
      this.updatePercentInfor();
    }
  }

  render() {
    const { userInfor } = this.state;

    return (
      <div>
        <div>
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
              <Button className="border-0 text-primary" onClick={() => this.setState({ isShowModel: true })}><u><i class="fa fa-key ml-2" aria-hidden="true"></i> change password</u> </Button>
              <hr />
              <p className="w3-large">
                <Link to="#">
                  <b>
                    <i className="fa fa-asterisk fa-fw w3-margin-right w3-text-teal" />
                    Profile <small className="float-right" id="1" onClick={(e) => this.props.moveTab(e.target.id)}><u>click here to edit</u> <i class="fa fa-pencil" aria-hidden="true"></i></small>
                  </b>
                </Link>
              </p>
              <p>Personal Information (%)</p>
              <div className="w3-light-grey w3-round-xlarge w3-small">
                <div
                  className="w3-container w3-center w3-round-xlarge w3-teal"
                  style={{ width: this.state.percentOfPersonalInfor + '%' }}
                >
                  {this.state.percentOfPersonalInfor}{' '}
                </div>
              </div>
              <p>Organization (%)</p>
              <div className="w3-light-grey w3-round-xlarge w3-small">
                <div
                  className="w3-container w3-center w3-round-xlarge w3-teal"
                  style={{ width: this.state.percenOfOrgInfor + '%' }}
                >
                  <div className="w3-center w3-text-white">
                    {this.state.percenOfOrgInfor}
                  </div>
                </div>
              </div>
              <hr />
              <p className="w3-large w3-text-theme">
                <Link to="#">
                  <b>
                    <i className="fa fa-credit-card-alt fa-fw w3-margin-right w3-text-teal" />
                    Bank Account <small className="float-right" id="2" onClick={(e) => this.props.moveTab(e.target.id)}><u>click here to edit</u> <i class="fa fa-pencil" aria-hidden="true"></i></small>
                  </b>
                </Link>
              </p>
              <hr />
              <p className="w3-large w3-text-theme">
                <Link to="#">
                  <b>
                    <i className="fa fa-history fa-fw w3-margin-right w3-text-teal" />
                    History Payment <small className="float-right" id="3" onClick={(e) => this.props.moveTab(e.target.id)}><u>detail</u> <i className="fa fa-long-arrow-right" aria-hidden="true"></i></small>
                  </b>
                </Link>
              </p>
            </div>
          </div>
          <br />
          {/* End Left Column */}
        </div>

        <Modal
          title="Change your password"
          visible={this.state.isShowModel}
          onOk={() => this.setState({ isShowModel: false })}
          onCancel={() => this.setState({ isShowModel: false })}
        >
          <ChangePassword />
        </Modal>

      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfor: state.user.userInfo,
  };
};

// const mapDispatchToProps = (dispatch) => ({
//     getCurrentUser: () => dispatch(userActions.getCurrentUser()),
// });

export default connect(mapStateToProps, null)(UpdateProfileInfor);
