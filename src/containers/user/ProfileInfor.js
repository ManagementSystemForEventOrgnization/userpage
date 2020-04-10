import React from 'react';
import { connect } from 'react-redux'
import { Form, Input, Button, Layout, Row, Col, Card, Avatar, Select, DatePicker, Upload, message } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';


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

    }
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <Layout style={{ padding: '150px 50px' }}>
        <Row>
          <Col span={16} push={1}>
            <Content style={{ background: '#fff', padding: '10px 50px' }}>
              <div className="site-layout-content" >
                <Form {...layout} className="mt-4" form={this.form} name="horizontal_login" onFinish={this.onFinish}>
                  <Form.Item
                    label="Avatar"
                    name="avatar">
                    <Col offset={9} >
                      <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange}
                      >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%', height: '100px' }} /> : uploadButton}
                      </Upload>
                    </Col >
                  </Form.Item>
                  <Form.Item
                    label="Full Name"
                    name="fullname">
                    <Input defaultValue="Tạ Thị Tú Phi" />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="fullname">
                    <Input.Password type="password" defaultValue="tuphi221298" />
                  </Form.Item>

                  <Form.Item name="gender" label="Gender">
                    <Select
                      defaultValue="Female"
                      allowClear
                    >
                      <Option value="male">Male</Option>
                      <Option value="female">Female</Option>
                      <Option value="other">Other</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Birthday">
                    <DatePicker />
                  </Form.Item>
                  <Form.Item name="description" label="Description" >
                    <Input.TextArea />
                  </Form.Item>

                  <Form.Item {...tailLayout} shouldUpdate >
                    {() => (
                      <Button
                        type="primary"
                        onClick={this.onSendRegisterRequest}
                        htmlType="submit">Save
                      </Button>
                    )}
                  </Form.Item>
                </Form>
              </div>
            </Content>
          </Col>

          <Col span={5} push={2}>
            <Card
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
              }
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={<Avatar size={60} src="https://thuthuatnhanh.com/wp-content/uploads/2019/09/anh-chibi.jpg" />}
                title="Tạ Thị Tú Phi"
                description="tatuphi@gmail.com"
              />
              <div>This is description about user</div>
            </Card>
          </Col>
        </Row>
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  // map state of store to props

})

const mapDispatchToProps = (dispatch) => ({

});



export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfor)
