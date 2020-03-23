import { connect } from 'react-redux'
import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { Row, Col } from 'antd';
import { GoogleOutlined} from '@ant-design/icons';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../asserts/styles/componentStyles/Login.scss';

class Login extends React.Component{
    constructor(props){
        super(props);
       
     
        this.state = {

        }
    }
     HorizontalLoginForm = () => {
      const [form] = Form.useForm();
      const [, forceUpdate] = useState(); // To disable submit button at the beginning.
    
      useEffect(() => {
        forceUpdate({});
      }, []);
    
      const onFinish = values => {
        console.log('Finish:', values);
      };
    }
    render(){
        return(
          <div  className="columns row"  >
     <div className="col "> 
    
    <img  src='https://res.cloudinary.com/dklfyelhm/image/upload/v1584932729/Event/hand_iind0n.png'/>

    </div> 
    <div className="col" > 
      <p className="title">Event in your hand</p>
    <Form className="mt-4" form={this.form} name="horizontal_login"  onFinish={this.onFinish}>
      <Form.Item
        name="Email"
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password 
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"

        />
      </Form.Item>
      <div className='ant-row'>
        <div className="ant-col ant-col-12">
        <Form.Item shouldUpdate>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
           
          >
            Đăng nhập
          </Button>
        )}
      </Form.Item>
      
        </div>
        <div className="ant-col ant-col-12  ">
        <a href="#"  style={{float:"right"}}>Quên mật khẩu?</a>
        </div>
        </div>
       <p style={{textAlign:"center"}}>OR</p>
       <Button className=" title "  type="primary" icon={<GoogleOutlined className="seticon" />}>
         
      Đăng nhập với Google
    </Button>
    <p className="mt-2"  style={{textAlign:"center"}}>Bạn chưa có tài khoản ?<span><a href="#">đăng ký ngay</a></span>  </p> 
    </Form>
        
    </div>

      </div>
        )
    }
}
const mapStateToProps = state => ({
    // map state of store to props
  
  })
  
  const mapDispatchToProps = (dispatch) => ({
  
  });
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Login)
  