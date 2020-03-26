import { connect } from 'react-redux'
import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { Row, Col } from 'antd';
import { GoogleOutlined} from '@ant-design/icons';
import { UserOutlined, LockOutlined, MailOutlined,UnlockOutlined } from '@ant-design/icons';
  import '../asserts/styles/componentStyles/Login.scss';

class SignUp extends React.Component{
    constructor(props){
        super(props);
    
        this.state = {
          isOpen :true

        }
    }
    
    onToggleConfirm=()=>{
     this.setState( {
         isOpen :! this.state.isOpen
       }
     )


    }
    render(){
      const {isOpen}=this.state;
      const { Search } = Input;
        return(    
          <div  className="columns row"  >
           
     <div className="col "> 
    
    <img  src='https://res.cloudinary.com/dklfyelhm/image/upload/v1584932729/Event/hand_iind0n.png'/>
      
    </div> 
  {
    isOpen  ?
    <div className="col" > 
      <p className="title">Event in your hand</p>
    <Form className="mt-4" form={this.form} name="horizontal_login"  onFinish={this.onFinish}>
    <Form.Item
        name="fullname"
        rules={[
          {
            required: true,
            message: 'Please input your full name!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Full Name" />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
          },
        ]}
      >
        <Input prefix={<MailOutlined  className="site-form-item-icon" />} placeholder="Email" />
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
          prefix={<LockOutlined  className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item
        name="pass"
        rules={[
          {
            required: true,
            message: 'Please repeat your password!',
          },
        ]}
      >
        <Input.Password 
          prefix={<UnlockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Repeat Password"
        />
      </Form.Item>
        <Form.Item shouldUpdate >
        {() => (
            <div style={{textAlign:"center"}}>
                <Button block
            type="primary"
            htmlType="submit"
            onClick={this.onToggleConfirm}
            >Đăng ký
          </Button>
            </div>
        )}
      </Form.Item>
    <p className="mt-2"  style={{textAlign:"center"}}>Bạn đã có tài khoản? <span><a href="/login">Đăng nhập</a></span>  </p> 
    </Form>
        
    </div> 
   :
   <div className="col">
   <Search className=" SignUp Inputcode"
      placeholder="input search text"
      enterButton="Submit"
      size="large"
    
    />  
   </div>
       
     
        }
        </div>
        )
    }
}
const mapStateToProps = state => ({
    // map state of store to props
  
  })
  
  const mapDispatchToProps = (dispatch) => ({
  
  });
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
  