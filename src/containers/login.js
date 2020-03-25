import React from 'react';
import { connect } from 'react-redux'
import { Form, Input, Button } from 'antd';
import { 
    UserOutlined,
    LockOutlined,
    GooglePlusOutlined 
} from '@ant-design/icons';

class Login extends React.Component{
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
        <div  className="login row"  >

            <div className="col "> 
                <img  src={urlIMG}/>
            </div> 
            
            <div className="col " > 

                <p className="website-name">Event in your hand</p>
                
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
                    <Button className=" title "  type="primary" icon={<GooglePlusOutlined className="seticon" />}>
                    
                        Đăng nhập với Google
                    </Button>

                    <p className="mt-2"  style={{textAlign:"center"}}>Bạn chưa có tài khoản? <span><a href="/signup">đăng ký ngay</a></span>  </p> 
                
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
  