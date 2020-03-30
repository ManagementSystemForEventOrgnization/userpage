import React from 'react';
import { connect } from 'react-redux'
import { Form, Input, Button, Layout,Row, Col, Card,Avatar} from 'antd';
import {Link} from 'react-router-dom';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { 
    UserOutlined,
    LockOutlined, 
    MailOutlined,
    UnlockOutlined
    
   } from '@ant-design/icons';
import Header from '../share/_layout/Header';



const { Content} = Layout;
const { Meta } = Card;

class ProfileInfor extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    
    render(){
        return(
            <Layout style={{ padding: '150px 50px' }}>
                <Row>
                    <Col span={16} push={1}>
                    <Content style={{background: '#fff', padding: '10px 50px'}}>
                <div className="site-layout-content" > 
        <Form className="mt-4" form={this.form} name="horizontal_login"  onFinish={this.onFinish}>
        <Form.Item
        label="Full Name"
        name="fullname"
        // rules={[{ required: true, message: 'Please input your username!' }]}
        >
        <Input defaultValue="Tạ Thị Tú Phi"/>
      </Form.Item>
      <Form.Item
        label="Password"
        name="fullname"
        // rules={[{ required: true, message: 'Please input your username!' }]}
        >
        <Input.Password type="password" defaultValue="tuphi221298"/>
      </Form.Item>
      <Form.Item
        label="Full Name"
        name="fullname"
        // rules={[{ required: true, message: 'Please input your username!' }]}
        >
        <Input defaultValue="Tạ Thị Tú Phi"/>
      </Form.Item>

      
    
            
            <Form.Item shouldUpdate >
            {() => (
                <div style={{textAlign:"right"}}>
                    <Button 
                type="primary"
                onClick={this.onSendRegisterRequest}
                htmlType="submit">Save
            </Button>
                </div>
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
