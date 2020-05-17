
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Checkbox, Select, DatePicker, Upload, message } from 'antd';
import { UserOutlined, LockOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { userActions } from '../../action/user.action';

const { Option } = Select;

// start upload 

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

//end upload

class ProfileInfor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfor: {
        fullName: "",
        gender: "",
        job: "",
        phone: "",
        discription: "",
        avatar: "",
        address: "",
        birthday: "",
        email: "",
        orgName: "",
        orgDes: "",
        orgWeb: "",
        orgPhone: "",
        orgEmail: "",
        orgUrl: ""
      },
      visible: false,
      loading: false,
    }
  }


  componentDidMount = () => {
    const { getCurrentUser } = this.props;
    getCurrentUser();
  }

  // componentWillReceiveProps(nextprops) {
  //   this.setState({ userInfor: nextprops.userInfor })
  // }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.userInfor !== prevState.userInfor && nextProps.userInfor) {
      return { userInfor: nextProps.userInfor };
    } else return null;
  }

  //onchange value
  onHandleChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState(prevState => ({
      userInfor: {                   // object that we want to update
        ...prevState.userInfor,    // keep all other key-value pairs
        [name]: value     // update the value of specific key
      }
    }))
    console.log(this.state.userInfor)
  }
  //end onchange value

  //upload avatar
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, avatar =>
        this.setState({
          userInfor: {
            avatar
          },
          loading: false,
        }),
      );
    }
  };
  //end upload avatar


  onSave(values) {
    const { onUpdateUserProfile } = this.props
    if (onUpdateUserProfile) {
      onUpdateUserProfile(...this.state.userInfor)
    }

  }


  render() {
    const { userInfor } = this.state;

    const onFinish = values => {
      this.props.onUpdateUserProfile(...this.state.userInfor);
    };

    //upload avatar
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    // const { avatar } = this.state.userInfor;

    //end upload avatar
    return (
      <div className="ProfileInfor p-5 border">
        {/* start form */}
        <Form
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          {/* personal infor */}
          <h2>Personal Information</h2>
          <div className="row">
            <div className="col">
              <Form.Item
                name="fullName">
                <Input prefix={<UserOutlined className="fa fa-user fa-fw w3-margin-right w3-large w3-text-teal" />}
                  name="fullName"
                  placeholder="Full name"
                  onChange={this.onHandleChange}
                  defaultValue={userInfor.fullName ? userInfor.fullName : "nhi"}
                />
              </Form.Item>

              <Form.Item
                name="job"
              >
                <Input
                  prefix={<LockOutlined className="fa fa-briefcase fa-fw w3-margin-right w3-large w3-text-teal" />}
                  placeholder="Job"
                  name="job"
                  onChange={this.onHandleChange}


                  onChange={this.onHandleChange}
                  onChange={this.onHandleChange} defaultValue={userInfor.job}
                />
              </Form.Item>

              <Form.Item
                name="phone"
              >
                <Input
                  prefix={<LockOutlined className="fa fa-mobile fa-fw w3-margin-right w3-large w3-text-teal" />}
                  placeholder="Phone number"
                  name="phone"
                  onChange={this.onHandleChange}
                  defaultValue={userInfor.phone}
                />
              </Form.Item>

            </div>
            <div className="col" >
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                {userInfor.avatar ? <img src={userInfor.avatar} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
            </div>
          </div>

          <div className="row pl-2 pr-2 mb-2">

            <Form.Item className="col m-2" name="gender" placeholder="gender">
              <Select
                placeholder="Gender"
                allowClear
                defaultValue={userInfor.gender}
                name="gender"
              >
                <Option value="male">male</Option>
                <Option value="female">female</Option>
                <Option value="other">other</Option>
              </Select>
            </Form.Item>

            <Form.Item className="col m-2" name="date-picker">
              <DatePicker placeholder="Birthday" name="birthday" />
            </Form.Item>
          </div>

          <Form.Item
            name="address"
          >
            <Input
              prefix={<UserOutlined className="fa fa-home fa-fw w3-margin-right w3-large w3-text-teal" />}
              placeholder="Address"
              name="address"
              onChange={this.onHandleChange}
              defaultValue={userInfor.address} />
          </Form.Item>

          <Form.Item className="mt-2" >
            <Input.TextArea
              placeholder="Enter your descrpition"
              name="discription"
              onChange={this.onHandleChange}
              defaultValue={userInfor.discription} />
          </Form.Item>
          {/* end personal infor */}

          <hr />

          {/* organization */}
          <h2>Organization Information</h2>

          <div className="row p-2">
            <Form.Item className="col m-2"
              name=""
            >
              <Input prefix={<UserOutlined className="fa fa-users fa-fw w3-margin-right w3-large w3-text-teal" />}
                placeholder="Organization name"
                name="orgName"
                onChange={this.onHandleChange}
                defaultValue={userInfor.orgName} />
            </Form.Item>

            <Form.Item className="col m-2">
              <Input
                prefix={<span className="fa-fw w3-margin-right w3-text-teal">http(s):</span>}
                placeholder="Website"
                name="orgWeb"
                onChange={this.onHandleChange}
                defaultValue={userInfor.orgWeb}
              />
            </Form.Item>
          </div>
          <Form.Item
            name="orgPhone">
            <Input
              prefix={<LockOutlined className="fa fa-phone fa-fw w3-margin-right w3-large w3-text-teal" />}
              placeholder="Organization phone number"
              name="orgPhone"
              onChange={this.onHandleChange}
              defaultValue={userInfor.orgPhone}
            />
          </Form.Item>

          <Form.Item
            name="orgEmail">
            <Input
              prefix={<LockOutlined className="fa fa-phone fa-fw w3-margin-right w3-large w3-text-teal" />}
              placeholder="Organization Email"
              name="orgEmail"
              onChange={this.onHandleChange}
              defaultValue={userInfor.orgEmail}
            />
          </Form.Item>

          <Form.Item>
            <Input.TextArea
              placeholder="enter your organization description"
              name="orgDes"
              onChange={this.onHandleChange}
              defaultValue={userInfor.orgDes} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={(value) => this.onSave(value)}>
              Save
        </Button>
          </Form.Item>
          {/* end organization */}
        </Form>
        {/* end form */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userInfor: state.user.userInfo
  };
}

const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: () => dispatch(userActions.getCurrentUser()),
  onUpdateUserProfile: (userInfor) => dispatch(userActions.onUpdateUserProfile(userInfor))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfor)