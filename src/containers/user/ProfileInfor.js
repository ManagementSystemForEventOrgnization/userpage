import React from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Input,
  Button,
  Layout,
  Row,
  Col,
  Card,
  Avatar,
  Select,
  DatePicker,
  Upload,
  message,
} from 'antd';

import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';

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

const dateFormat = 'DD/MM/YYYY';

class ProfileInfor extends React.Component {
  constructor(props) {
    super(props);
    const { userInfor } = this.props;

    this.state = userInfor
      ? { ...userInfor }
      : {
          fullName: '',
          birthday: '',
          gender: '',
          job: '',
          phone: '',
          discription: '',
          avatar: '',
          visible: false,
        };
  }

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (avatarUrl) =>
        this.setState({
          avatarUrl,
          loading: false,
        })
      );
    }
  };

  onHandleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onSave = () => {
    const {
      fullName,
      gender,
      job,
      phone,
      discription,
      avatar,
      birthday,
    } = this.state;

    const { onUpdateUserProfile } = this.props;
    const userInforUpdate = {
      fullName: fullName,
      birthday: birthday,
      gender: gender,
      job: job,
      phone: phone,
      discription: discription,
      avatar: avatar,
    };
    onUpdateUserProfile(userInforUpdate);
  };
  ChangeDate = (date, dateString) => {
    this.setState({
      birthday: dateString,
    });
  };

  componentDidMount = () => {
    const { demo } = this.props;
    demo();
  };
  render() {
    const {
      fullName,
      birthday,
      gender,
      job,
      phone,
      discription,
      avatar,
      loading,
      email,
    } = this.state;

    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <Layout style={{ padding: '100px 50px' }}>
          <Row>
            <Col span={6} push={2} className="mr-5">
              <Card
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
                actions={[
                  <SettingOutlined key="setting" />,
                  <EditOutlined key="edit" />,
                  <EllipsisOutlined key="ellipsis" />,
                ]}
              >
                <Meta
                  avatar={
                    <Avatar
                      size={60}
                      src={
                        avatar
                          ? avatar
                          : 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
                      }
                    />
                  }
                  title={fullName ? fullName : ''}
                  description={email ? email : ''}
                />
                <div>{discription ? discription : 'add your discription'}</div>
              </Card>
            </Col>

            <Col span={16} push={1}>
              <Content style={{ background: '#fff', padding: '10px 50px' }}>
                <div className="site-layout-content">
                  <Form
                    {...layout}
                    className="mt-4"
                    form={this.form}
                    name="horizontal_login"
                    onFinish={this.onSave}
                  >
                    <Form.Item label="Avatar" name="avatar">
                      <Col offset={9}>
                        <Upload
                          name="avatar"
                          listType="picture-card"
                          className="avatar-uploader"
                          showUploadList={false}
                          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                          beforeUpload={beforeUpload}
                          onChange={this.handleChange}
                        >
                          {avatar ? (
                            <img
                              src={avatar}
                              alt="avatar"
                              style={{ width: '100%', height: '100px' }}
                            />
                          ) : (
                            uploadButton
                          )}
                        </Upload>
                      </Col>
                    </Form.Item>

                    <Form.Item label="Full Name" name="fullName">
                      <Input
                        onChange={this.onHandleChange}
                        name="fullName"
                        value={fullName}
                        defaultValue={fullName}
                      />
                    </Form.Item>

                    <Form.Item label="Job" name="job">
                      <Input
                        onChange={this.onHandleChange}
                        name="job"
                        value={job}
                        defaultValue={job ? job : ''}
                      />
                    </Form.Item>

                    <Form.Item label="Phone" name="phone">
                      <Input
                        onChange={this.onHandleChange}
                        name="phone"
                        value={phone}
                        defaultValue={phone ? phone : ''}
                      />
                    </Form.Item>

                    <Form.Item name="gender" label="Gender">
                      <Select
                        onChange={(value) => this.setState({ gender: value })}
                        value={gender}
                        defaultValue={gender ? gender : ''}
                        allowClear
                      >
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                        <Option value="other">Other</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item label="Birthday" name="birthday">
                      <DatePicker
                        onChange={this.onChangeDate}
                        placeholder="dd/mm/yyyy"
                        value={birthday}
                        format={dateFormat}
                        style={{ width: 270 }}
                      />
                    </Form.Item>

                    <Form.Item name="description" label="Description">
                      <Input.TextArea
                        autoSize
                        onChange={this.onHandleChange}
                        name="discription"
                        value={discription}
                        defaultValue={discription}
                      />
                    </Form.Item>

                    <Form.Item {...tailLayout} shouldUpdate>
                      {() => (
                        <Button type="primary" htmlType="submit">
                          Save your infor
                        </Button>
                      )}
                    </Form.Item>
                  </Form>
                </div>
              </Content>
            </Col>
          </Row>
        </Layout>
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

  demo: () => userActions.demo(),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfor);
