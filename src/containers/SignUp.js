import React from 'react';
import { connect } from 'react-redux'
import { Form, Input, Button } from 'antd';
import {Link} from 'react-router-dom';
import { 
  UserOutlined,
  LockOutlined, 
  MailOutlined,
  UnlockOutlined
  
 } from '@ant-design/icons';

class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    onFinish = () =>{

    }
     
    render(){
        const urlIMG = "https://res.cloudinary.com/dklfyelhm/image/upload/v1584932729/Event/hand_iind0n.png";
        return(
            <div className="login">
                   
                <div  className=" row"  >
                    <Link to="/" className="col "> 
                        <img  src={urlIMG}/>
                    </Link> 

                    <div className="col" > 
                        <p className="website-name">Event in your hand</p>
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
                                htmlType="submit">Đăng ký
                            </Button>
                                </div>
                            )}
                            </Form.Item>
                            <p className="mt-2"  style={{textAlign:"center"}}>Bạn đã có tài khoản? <span><Link to="/login">Đăng nhập</Link></span>  </p> 
                        </Form>
                
                    </div>

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
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
  