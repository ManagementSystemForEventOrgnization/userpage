import React from 'react';
import { connect } from 'react-redux'
import { Form, Input, Button, Layout, Row, Col, Card, Avatar, Select, DatePicker, Upload, message, Modal } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { userActions } from '../../action/user.action';


const { Content } = Layout;
const { Meta } = Card;
const { Option } = Select;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const tailLayout = {
  wrapperCol: { offset: 18 },
};

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

class ProfileInfor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfor: {
        fullName: "",
        birthday: "",
        gender: "",
        job: "",
        phone: "",
        discription: "",
        avatarUrl: "",
      },
      visible: false
    }
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, avatarUrl =>
        this.setState({
          avatarUrl,
          loading: false
        })
      );

    }
  };

  componentDidMount = () => {
    const { getCurrentUser } = this.props;
    getCurrentUser();


  }

  componentWillReceiveProps(nextprops) {
    this.setState({ userInfor: nextprops.userInfor.result })
    console.log(nextprops.userInfor)
  }

  onHandleChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value
    });
  }

  onSave(values) {
    console.log("-----")
    let userInfor = {
      fullName: this.state.userInfor.fullName,
      birthday: this.state.userInfor.birthday,
      gender: this.state.userInfor.gender,
      job: this.state.userInfor.job,
      phone: this.state.userInfor.phone,
      discription: this.state.userInfor.discription,
      avatarUrl: this.state.userInfor.avatarUrl
    }

    this.props.onUpdateUserProfile(userInfor);
    console.log("-----")

  }

  //modal

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const { avatarUrl } = this.state

    const { result } = this.props.userInfor
    return (
      // <div>
      //   <Layout style={{ padding: '150px 50px' }}>
      //     <Row>
      //       <Col span={16} push={1}>
      //         <Content style={{ background: '#fff', padding: '10px 50px' }}>
      //           <div className="site-layout-content" >
      //             <Form {...layout} className="mt-4" form={this.form} name="horizontal_login" onFinish={(values) => this.onSave(values)}>
      //               <Form.Item
      //                 label="Avatar"
      //                 name="avatar">
      //                 <Col offset={9} >
      //                   <Upload
      //                     name="avatar"
      //                     listType="picture-card"
      //                     className="avatar-uploader"
      //                     showUploadList={false}
      //                     action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      //                     beforeUpload={beforeUpload}
      //                     onChange={this.handleChange}
      //                   >
      //                     {avatarUrl ? <img src={avatarUrl} alt="avatar" style={{ width: '100%', height: '100px' }} /> : uploadButton}
      //                   </Upload>
      //                 </Col >
      //               </Form.Item>

      //               <Form.Item
      //                 label="Full Name"
      //                 name="fullName">
      //                 <Input onChange={this.onHandleChange} name="fullName"
      //                   defaultValue={result.fullName ? result.fullName : ""} />
      //               </Form.Item>

      //               <Form.Item
      //                 label="Job"
      //                 name="job">
      //                 <Input onChange={this.onHandleChange} name="job" defaultValue={result.job ? result.job : ""} />
      //               </Form.Item>

      //               <Form.Item
      //                 label="Phone"
      //                 name="phone">
      //                 <Input onChange={this.onHandleChange} name="phone" defaultValue={result.phone ? result.phone : ""} />
      //               </Form.Item>

      //               <Form.Item name="gender" label="Gender">
      //                 <Select onChange={(value) => this.setState({ gender: value })}
      //                   defaultValue={result.gender ? result.gender : ""}
      //                   allowClear
      //                 >
      //                   <Option value="male">Male</Option>
      //                   <Option value="female">Female</Option>
      //                   <Option value="other">Other</Option>
      //                 </Select>
      //               </Form.Item>
      //               <Form.Item label="Birthday" name="birthday">
      //                 <DatePicker onChange={(moment) => this.setState({ birthday: moment._d })} name="birthday" />
      //               </Form.Item>
      //               <Form.Item name="description" label="Description" >
      //                 <Input.TextArea onChange={this.onHandleChange} name="discription" />
      //               </Form.Item>

      //               <Form.Item {...tailLayout} shouldUpdate >
      //                 {() => (
      //                   <Button
      //                     type="primary"
      //                     htmlType="submit">Save your infor
      //                 </Button>
      //                 )}
      //               </Form.Item>
      //             </Form>
      //           </div>
      //         </Content>
      //       </Col>

      //       <Col span={5} push={2}>
      //         <Card
      //           cover={
      //             <img
      //               alt="example"
      //               src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
      //           }
      //           actions={[
      //             <SettingOutlined key="setting" />,
      //             <EditOutlined key="edit" />,
      //             <EllipsisOutlined key="ellipsis" />,
      //           ]}
      //         >
      //           <Meta
      //             avatar={<Avatar size={60} src={this.state.userInfor.avatarUrl ? this.state.avatarUrl : "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"} />}
      //             title={result.fullName ? result.fullName : ""}
      //             description={result.email ? result.email : ""}
      //           />
      //           <div>{result.discription ? result.discription : "add your discription"}</div>
      //           <div>
      //             <Button type="primary" onClick={this.showModal}>
      //               change password
      //            </Button>
      //             <Modal
      //               title="Basic Modal"
      //               visible={this.state.visible}
      //               onOk={this.handleOk}
      //               onCancel={this.handleCancel}
      //             >



      //             </Modal>
      //           </div>

      //         </Card>
      //       </Col>
      //     </Row>
      //   </Layout>
      // </div>

      <div>
        <div className="w3-container w3-card w3-white w3-margin-bottom">
          <h2 className="w3-text-grey w3-padding-16"><i className="fa fa-suitcase fa-fw w3-margin-right w3-xxlarge w3-text-teal" />Work Experience</h2>
          <div className="w3-container">
            <h5 className="w3-opacity"><b>Front End Developer / w3schools.com</b></h5>
            <h6 className="w3-text-teal"><i className="fa fa-calendar fa-fw w3-margin-right" />Jan 2015 - <span className="w3-tag w3-teal w3-round">Current</span></h6>
            <p>Lorem ipsum dolor sit amet. Praesentium magnam consectetur vel in deserunt aspernatur est reprehenderit sunt hic. Nulla tempora soluta ea et odio, unde doloremque repellendus iure, iste.</p>
            <hr />
          </div>
          <div className="w3-container">
            <h5 className="w3-opacity"><b>Web Developer / something.com</b></h5>
            <h6 className="w3-text-teal"><i className="fa fa-calendar fa-fw w3-margin-right" />Mar 2012 - Dec 2014</h6>
            <p>Consectetur adipisicing elit. Praesentium magnam consectetur vel in deserunt aspernatur est reprehenderit sunt hic. Nulla tempora soluta ea et odio, unde doloremque repellendus iure, iste.</p>
            <hr />
          </div>
          <div className="w3-container">
            <h5 className="w3-opacity"><b>Graphic Designer / designsomething.com</b></h5>
            <h6 className="w3-text-teal"><i className="fa fa-calendar fa-fw w3-margin-right" />Jun 2010 - Mar 2012</h6>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p><br />
          </div>
        </div>
        <div className="w3-container w3-card w3-white">
          <h2 className="w3-text-grey w3-padding-16"><i className="fa fa-certificate fa-fw w3-margin-right w3-xxlarge w3-text-teal" />Education</h2>
          <div className="w3-container">
            <h5 className="w3-opacity"><b>W3Schools.com</b></h5>
            <h6 className="w3-text-teal"><i className="fa fa-calendar fa-fw w3-margin-right" />Forever</h6>
            <p>Web Development! All I need to know in one place</p>
            <hr />
          </div>
          <div className="w3-container">
            <h5 className="w3-opacity"><b>London Business School</b></h5>
            <h6 className="w3-text-teal"><i className="fa fa-calendar fa-fw w3-margin-right" />2013 - 2015</h6>
            <p>Master Degree</p>
            <hr />
          </div>
          <div className="w3-container">
            <h5 className="w3-opacity"><b>School of Coding</b></h5>
            <h6 className="w3-text-teal"><i className="fa fa-calendar fa-fw w3-margin-right" />2010 - 2013</h6>
            <p>Bachelor Degree</p><br />
          </div>
        </div>
        {/* End Right Column */}
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

