import React, { Component } from 'react';
import * as EmailValidator from 'email-validator';
import moment from 'moment';
import { connect } from 'react-redux';
import { Form, Input, Button, Select, DatePicker } from 'antd';
import { userActions } from 'action/user.action';
import UploadImage from '../../containers/event/templates/ui-elements/shares/UploadImage';
const { Option } = Select;


class ProfileInfor extends Component {
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
        orgUrl: '',
      },
      visible: false,
      loading: false,
      validEmail: true,
      orgPhone: true,
      phone: true,
      isGetData: true,
      isSaved: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.isGetData && nextProps.userInfor && nextProps.userInfor !== prevState.userInfor) {
      return {
        userInfor: nextProps.userInfor,
        isGetData: false
      };
    } else return null;
  }

  //onchange value
  onHandleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      userInfor: {
        ...this.state.userInfor,
        [name]: value,
      },
    });
  };

  onChangePhoneNumber = (e) => {
    const re = /^[0-9\b]+$/;

    this.setState({
      userInfor: {
        ...this.state.userInfor,
        [e.target.name]: e.target.value
      },
      [e.target.name]: !e.target.value === '' || re.test(e.target.value)
    })
  }

  onChangeEmail = (e) => {
    this.setState({
      validEmail: EmailValidator.validate(e.target.value),
      userInfor: {
        orgEmail: e.target.value
      }
    })
  }

  onChangeGender = (e) => {
    this.setState({
      userInfor: {
        ...this.state.userInfor,
        gender: e
      }
    })
  }

  onChangeBirthday = (e) => {
    this.setState({
      userInfor: {
        ...this.state.userInfor,
        birthday: e._d
      }
    })
  }

  onSave(values) {
    const { onUpdateUserProfile } = this.props;
    const { userInfor } = this.state;

    if (onUpdateUserProfile) {
      onUpdateUserProfile(userInfor)
    }

    this.setState({
      isSaved: true
    })

  }

  errorHandle() {
    if (this.props.errMessage)
      return (<div class="alert alert-danger" role="alert" enable>
        {this.props.errMessage}ss
      </div>)
    if (this.state.isSaved && !this.props.pending) {
      return (< div class="alert alert-success" role="alert">
        Save changes sucessfully
      </div>)
    }
    if (JSON.stringify(this.state.userInfor) === JSON.stringify(this.props.userInfor)) {
      return (
        <div class="alert alert-danger" role="alert" enable>
          there is no changes! please
         </div>
      )
    }
  }

  render() {
    const { userInfor } = this.state;
    const { pending } = this.props
    const onFinish = (values) => {
      this.props.onUpdateUserProfile(...this.state.userInfor);
    };

    return (
      <div className="ProfileInfor p-5 border">
        {this.errorHandle()}
        {/* start form */}
        <Form initialValues={{ remember: true }} onFinish={onFinish}>
          {/* personal infor */}
          <h2>Personal Information</h2>
          <div className="row">
            <div className="col">
              <Form.Item name="fullName">
                <Input
                  prefix={
                    <a className="fa fa-user fa-fw w3-margin-right w3-large w3-text-teal" />
                  }
                  name="fullName"
                  placeholder="Full name"
                  onChange={this.onHandleChange}
                  defaultValue={userInfor.fullName ? userInfor.fullName : ''}
                />
              </Form.Item>

              <Form.Item name="job">
                <Input
                  prefix={
                    <a className="fa fa-briefcase fa-fw w3-margin-right w3-large w3-text-teal" />
                  }
                  placeholder="Job"
                  name="job"
                  onChange={this.onHandleChange}
                  defaultValue={userInfor.job}
                />
              </Form.Item>

              <Form.Item name="phone">
                <Input
                  prefix={
                    <a className="fa fa-mobile fa-fw w3-margin-right w3-large w3-text-teal" />
                  }
                  placeholder="Phone number"
                  name="phone"
                  onChange={this.onChangePhoneNumber}
                  defaultValue={userInfor.phone}
                />
                {this.state.phone || userInfor.phone === '' ? (
                  <div></div>
                ) : (<div className="text-danger">Invalid Phone Number</div>)}
              </Form.Item>
            </div>
            <div className="col">
              <UploadImage url={userInfor.avatar}
                handleImageDrop={(value) => { this.setState({ userInfor: { ...this.state.userInfor, avatar: value } }) }}
              />
            </div>
          </div>

          <div className="row pl-2 pr-2 mb-2">
            <Form.Item className="col m-2" name="gender" placeholder="gender">
              <Select
                placeholder="Gender"
                allowClear
                defaultValue={userInfor.gender}
                name="gender"
                onChange={this.onChangeGender}
              >
                <Option value="male">male</Option>
                <Option value="female">female</Option>
                <Option value="other">other</Option>
              </Select>
            </Form.Item>

            <Form.Item className="col m-2" name="date-picker">
              <DatePicker placeholder="Birthday" name="birthday" onChange={this.onChangeBirthday} defaultValue={moment(userInfor.birthday, 'YYYY-MM-DD')} />
            </Form.Item>
          </div>

          <Form.Item name="address">
            <Input
              prefix={
                <a className="fa fa-home fa-fw w3-margin-right w3-large w3-text-teal" />
              }
              placeholder="Address"
              name="address"
              onChange={this.onHandleChange}
              defaultValue={userInfor.address}
            />
          </Form.Item>

          <Form.Item className="mt-2">
            <Input.TextArea
              placeholder="Enter your descrpition"
              name="discription"
              onChange={this.onHandleChange}
              defaultValue={userInfor.discription}
            />
          </Form.Item>
          {/* end personal infor */}

          <hr />

          {/* organization */}
          <h2>Organization Information</h2>

          <div className="row p-2">
            <Form.Item className="col m-2" name="">
              <Input
                prefix={
                  <a className="fa fa-users fa-fw w3-margin-right w3-large w3-text-teal" />
                }
                placeholder="Organization name"
                name="orgName"
                onChange={this.onHandleChange}
                defaultValue={userInfor.orgName}
              />
            </Form.Item>

            <Form.Item className="col m-2">
              <Input
                prefix={
                  <span className="fa-fw w3-margin-right w3-text-teal">
                    http(s):
                  </span>
                }
                placeholder="Website"
                name="orgWeb"
                onChange={this.onHandleChange}
                defaultValue={userInfor.orgWeb}
              />
            </Form.Item>
          </div>
          <Form.Item name="orgPhone">
            <Input
              prefix={
                <a className="fa fa-phone fa-fw w3-margin-right w3-large w3-text-teal" />
              }
              placeholder="Organization phone number"
              name="orgPhone"
              onChange={this.onChangePhoneNumber}
              defaultValue={userInfor.orgPhone}
            />
            {this.state.orgPhone || userInfor.orgPhone === '' ? (
              <div></div>
            ) : (<div className="text-danger">Invalid Phone Number</div>)}

          </Form.Item>

          <Form.Item name="orgEmail">

            <Input
              prefix={
                <a className="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-teal" />
              }
              placeholder="Organization Email"
              name="orgEmail"
              onChange={this.onChangeEmail}
              defaultValue={userInfor.orgEmail}
            />
            {this.state.validEmail || this.state.userInfor.orgEmail === '' ? (
              <div></div>
            ) : (<div className="text-danger">Invalid Email</div>)}
          </Form.Item>

          <Form.Item>
            <Input.TextArea
              placeholder="enter your organization description"
              name="orgDes"
              onChange={this.onHandleChange}
              defaultValue={userInfor.orgDes}
            />
          </Form.Item>

          <Form.Item shouldUpdate>
            {() => (
              <div style={{ textAlign: 'center' }}>
                <Button
                  className=" mt-2"
                  block
                  type="primary"
                  htmlType="submit "
                  disabled={!(this.state.validEmail || this.state.userInfor.orgEmail === '') || !(this.state.phone || userInfor.phone === '') || !(this.state.orgPhone || userInfor.orgPhone === '') || this.state.userInfor === this.props.userInfor || JSON.stringify(this.state.userInfor) === JSON.stringify(this.props.userInfor)}
                  onClick={(value) => this.onSave(value)}
                  loading={pending}
                >
                  Save
                  </Button>
              </div>
            )}
          </Form.Item>
          {/* end organization */}
        </Form>
        {/* end form */}
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pending: state.user.pending,
    userInfor: state.user.userInfo,
    errMessage: state.user.errMessage
  };
};

const mapDispatchToProps = (dispatch) => ({
  onUpdateUserProfile: (userInfor) =>
    dispatch(userActions.onUpdateUserProfile(userInfor)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfor);

