// import React from 'react';
// import { connect } from 'react-redux'
// import { Form, Input, Button, Layout, Row, Col, Card, Avatar, Select, DatePicker, Upload, message, Modal } from 'antd';
// import { EditOutlined, EllipsisOutlined, SettingOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
// import { userActions } from '../../action/user.action';


// const { Content } = Layout;
// const { Meta } = Card;
// const { Option } = Select;
// const layout = {
//   labelCol: { span: 6 },
//   wrapperCol: { span: 14 },
// };
// const tailLayout = {
//   wrapperCol: { offset: 18 },
// };

// function getBase64(img, callback) {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result));
//   reader.readAsDataURL(img);
// }

// function beforeUpload(file) {
//   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//   if (!isJpgOrPng) {
//     message.error('You can only upload JPG/PNG file!');
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     message.error('Image must smaller than 2MB!');
//   }
//   return isJpgOrPng && isLt2M;
// }

// class ProfileInfor extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       userInfor: {
//         fullName: "",
//         birthday: "",
//         gender: "",
//         job: "",
//         phone: "",
//         discription: "",
//         avatarUrl: "",
//       },
//       visible: false
//     }
//   }

//   handleChange = info => {
//     if (info.file.status === 'uploading') {
//       this.setState({ loading: true });
//       return;
//     }
//     if (info.file.status === 'done') {
//       // Get this url from response in real world.
//       getBase64(info.file.originFileObj, avatarUrl =>
//         this.setState({
//           avatarUrl,
//           loading: false
//         })
//       );

//     }
//   };

//   componentDidMount = () => {
//     const { getCurrentUser } = this.props;
//     getCurrentUser();


//   }

//   componentWillReceiveProps(nextprops) {
//     this.setState({ userInfor: nextprops.userInfor.result })
//     console.log(nextprops.userInfor)
//   }

//   onHandleChange = (event) => {
//     var target = event.target;
//     var name = target.name;
//     var value = target.value;

//     this.setState({
//       [name]: value
//     });
//   }

//   onSave(values) {
//     console.log("-----")
//     let userInfor = {
//       fullName: this.state.userInfor.fullName,
//       birthday: this.state.userInfor.birthday,
//       gender: this.state.userInfor.gender,
//       job: this.state.userInfor.job,
//       phone: this.state.userInfor.phone,
//       discription: this.state.userInfor.discription,
//       avatarUrl: this.state.userInfor.avatarUrl
//     }

//     this.props.onUpdateUserProfile(userInfor);
//     console.log("-----")

//   }

//   //modal

//   showModal = () => {
//     this.setState({
//       visible: true,
//     });
//   };

//   handleOk = e => {
//     console.log(e);
//     this.setState({
//       visible: false,
//     });
//   };

//   handleCancel = e => {
//     console.log(e);
//     this.setState({
//       visible: false,
//     });
//   };

//   render() {
//     const uploadButton = (
//       <div>
//         {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
//         <div className="ant-upload-text">Upload</div>
//       </div>
//     );

//     const { avatarUrl } = this.state

//     const { result } = this.props.userInfor
//     return (
//       // <div>
//       //   <Layout style={{ padding: '150px 50px' }}>
//       //     <Row>
//       //       <Col span={16} push={1}>
//       //         <Content style={{ background: '#fff', padding: '10px 50px' }}>
//       //           <div className="site-layout-content" >
//       //             <Form {...layout} className="mt-4" form={this.form} name="horizontal_login" onFinish={(values) => this.onSave(values)}>
//       //               <Form.Item
//       //                 label="Avatar"
//       //                 name="avatar">
//       //                 <Col offset={9} >
//       //                   <Upload
//       //                     name="avatar"
//       //                     listType="picture-card"
//       //                     className="avatar-uploader"
//       //                     showUploadList={false}
//       //                     action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//       //                     beforeUpload={beforeUpload}
//       //                     onChange={this.handleChange}
//       //                   >
//       //                     {avatarUrl ? <img src={avatarUrl} alt="avatar" style={{ width: '100%', height: '100px' }} /> : uploadButton}
//       //                   </Upload>
//       //                 </Col >
//       //               </Form.Item>

//       //               <Form.Item
//       //                 label="Full Name"
//       //                 name="fullName">
//       //                 <Input onChange={this.onHandleChange} name="fullName"
//       //                   defaultValue={result.fullName ? result.fullName : ""} />
//       //               </Form.Item>

//       //               <Form.Item
//       //                 label="Job"
//       //                 name="job">
//       //                 <Input onChange={this.onHandleChange} name="job" defaultValue={result.job ? result.job : ""} />
//       //               </Form.Item>

//       //               <Form.Item
//       //                 label="Phone"
//       //                 name="phone">
//       //                 <Input onChange={this.onHandleChange} name="phone" defaultValue={result.phone ? result.phone : ""} />
//       //               </Form.Item>

//       //               <Form.Item name="gender" label="Gender">
//       //                 <Select onChange={(value) => this.setState({ gender: value })}
//       //                   defaultValue={result.gender ? result.gender : ""}
//       //                   allowClear
//       //                 >
//       //                   <Option value="male">Male</Option>
//       //                   <Option value="female">Female</Option>
//       //                   <Option value="other">Other</Option>
//       //                 </Select>
//       //               </Form.Item>
//       //               <Form.Item label="Birthday" name="birthday">
//       //                 <DatePicker onChange={(moment) => this.setState({ birthday: moment._d })} name="birthday" />
//       //               </Form.Item>
//       //               <Form.Item name="description" label="Description" >
//       //                 <Input.TextArea onChange={this.onHandleChange} name="discription" />
//       //               </Form.Item>

//       //               <Form.Item {...tailLayout} shouldUpdate >
//       //                 {() => (
//       //                   <Button
//       //                     type="primary"
//       //                     htmlType="submit">Save your infor
//       //                 </Button>
//       //                 )}
//       //               </Form.Item>
//       //             </Form>
//       //           </div>
//       //         </Content>
//       //       </Col>

//       //       <Col span={5} push={2}>
//       //         <Card
//       //           cover={
//       //             <img
//       //               alt="example"
//       //               src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
//       //           }
//       //           actions={[
//       //             <SettingOutlined key="setting" />,
//       //             <EditOutlined key="edit" />,
//       //             <EllipsisOutlined key="ellipsis" />,
//       //           ]}
//       //         >
//       //           <Meta
//       //             avatar={<Avatar size={60} src={this.state.userInfor.avatarUrl ? this.state.avatarUrl : "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"} />}
//       //             title={result.fullName ? result.fullName : ""}
//       //             description={result.email ? result.email : ""}
//       //           />
//       //           <div>{result.discription ? result.discription : "add your discription"}</div>
//       //           <div>
//       //             <Button type="primary" onClick={this.showModal}>
//       //               change password
//       //            </Button>
//       //             <Modal
//       //               title="Basic Modal"
//       //               visible={this.state.visible}
//       //               onOk={this.handleOk}
//       //               onCancel={this.handleCancel}
//       //             >



//       //             </Modal>
//       //           </div>

//       //         </Card>
//       //       </Col>
//       //     </Row>
//       //   </Layout>
//       // </div>

//       <div>
//         <div className="w3-container w3-card w3-white w3-margin-bottom">
//           <h2 className="w3-text-grey w3-padding-16"><i className="fa fa-suitcase fa-fw w3-margin-right w3-xxlarge w3-text-teal" />Work Experience</h2>
//           <div className="w3-container">
//             <h5 className="w3-opacity"><b>Front End Developer / w3schools.com</b></h5>
//             <h6 className="w3-text-teal"><i className="fa fa-calendar fa-fw w3-margin-right" />Jan 2015 - <span className="w3-tag w3-teal w3-round">Current</span></h6>
//             <p>Lorem ipsum dolor sit amet. Praesentium magnam consectetur vel in deserunt aspernatur est reprehenderit sunt hic. Nulla tempora soluta ea et odio, unde doloremque repellendus iure, iste.</p>
//             <hr />
//           </div>
//           <div className="w3-container">
//             <h5 className="w3-opacity"><b>Web Developer / something.com</b></h5>
//             <h6 className="w3-text-teal"><i className="fa fa-calendar fa-fw w3-margin-right" />Mar 2012 - Dec 2014</h6>
//             <p>Consectetur adipisicing elit. Praesentium magnam consectetur vel in deserunt aspernatur est reprehenderit sunt hic. Nulla tempora soluta ea et odio, unde doloremque repellendus iure, iste.</p>
//             <hr />
//           </div>
//           <div className="w3-container">
//             <h5 className="w3-opacity"><b>Graphic Designer / designsomething.com</b></h5>
//             <h6 className="w3-text-teal"><i className="fa fa-calendar fa-fw w3-margin-right" />Jun 2010 - Mar 2012</h6>
//             <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p><br />
//           </div>
//         </div>
//         <div className="w3-container w3-card w3-white">
//           <h2 className="w3-text-grey w3-padding-16"><i className="fa fa-certificate fa-fw w3-margin-right w3-xxlarge w3-text-teal" />Education</h2>
//           <div className="w3-container">
//             <h5 className="w3-opacity"><b>W3Schools.com</b></h5>
//             <h6 className="w3-text-teal"><i className="fa fa-calendar fa-fw w3-margin-right" />Forever</h6>
//             <p>Web Development! All I need to know in one place</p>
//             <hr />
//           </div>
//           <div className="w3-container">
//             <h5 className="w3-opacity"><b>London Business School</b></h5>
//             <h6 className="w3-text-teal"><i className="fa fa-calendar fa-fw w3-margin-right" />2013 - 2015</h6>
//             <p>Master Degree</p>
//             <hr />
//           </div>
//           <div className="w3-container">
//             <h5 className="w3-opacity"><b>School of Coding</b></h5>
//             <h6 className="w3-text-teal"><i className="fa fa-calendar fa-fw w3-margin-right" />2010 - 2013</h6>
//             <p>Bachelor Degree</p><br />
//           </div>
//         </div>
//         {/* End Right Column */}
//       </div>

//     )
//   }
// }

// const mapStateToProps = state => {
//   return {
//     userInfor: state.user.userInfo
//   };
// }

// const mapDispatchToProps = (dispatch) => ({
//   getCurrentUser: () => dispatch(userActions.getCurrentUser()),
//   onUpdateUserProfile: (userInfor) => dispatch(userActions.onUpdateUserProfile(userInfor))
// });

// export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfor)

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

  componentWillReceiveProps(nextprops) {
    this.setState({ userInfor: nextprops.userInfor.result })
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
    console.log("-----")
    console.log(this.state.userInfor);
    const { onUpdateUserProfile } = this.props
    if (onUpdateUserProfile) {
      onUpdateUserProfile(...this.state.userInfor)
    }
    // this.props.onUpdateUserProfile(...this.state.userInfor);
    console.log("-----")
  }


  render() {

    console.log(this.props);
    // alert(this.state.userInfor.fullName);
    const userInfor = this.props.userInfor.result;
    const onFinish = values => {
      console.log(...this.state.userInfor)

      this.props.onUpdateUserProfile(...this.state.userInfor);
      console.log("-----")
    };

    //upload avatar
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const { avatar } = this.state.userInfor;
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
                {avatar ? <img src={avatar} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
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