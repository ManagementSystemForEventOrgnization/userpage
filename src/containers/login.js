import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import {Link} from 'react-router-dom';
import { 
    UserOutlined,
    LockOutlined,
    GooglePlusOutlined 
} from '@ant-design/icons';

import {userAction} from '../action/user.action';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    handleLogin = () =>{
        const [email, password] = ["sang123@123", "123"];
        userAction.login(email, password).then(res=>{
            console.log(res);
        })
        
    }

    handleLoginGG = () =>{
        userAction.loginWithGoogle().then(res=>{
            console.log(res);
        })
    }

    // onFinish = () => {
    //     const {handleLogin} = this.props;
    //     const [email, password] = ["sang123@123", "123"];
       

    //     handleLogin(email, password).then(res=>{
    //         console.log(res);
    //     })
    // }



    render(){
        const urlIMG = "https://res.cloudinary.com/dklfyelhm/image/upload/v1584932729/Event/hand_iind0n.png";
        return(
            <div className="login">
                <div  className=" row"  >
                <Link  to="/" className="col "> 
                    <img  src={urlIMG}/>
                </Link> 

                <div className="col " > 

                    <p className="website-name">Event in your hand</p>
                    
                    <Form className="mt-4" form={this.form}>
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
                                    //    onClick={this.onFinish}
                                    
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
                        <Button className=" title "  
                            onClick={this.handleLoginGG}
                            type="primary" icon={<GooglePlusOutlined className="seticon" />}>
                                
                            Đăng nhập với Google
                        </Button>

                        <a className="title" href="/auth/google">Đăng nhập với Google</a>

                        <p className="mt-2"  style={{textAlign:"center"}}>Bạn chưa có tài khoản? <span><Link to="/signup">đăng ký ngay</Link></span>  </p> 
                    
                    </Form>

                    <button onClick={this.handleLogin}> click</button>

                </div>
                </div>


            </div>
       
       )
    }
}
const mapStateToProps = state => ({
    // map state of store to props
  
})
  
  const mapDispatchToProps = (dispatch) => {
    return {
        // handleLogin: (email, password) => {
        //     dispatch(userAction.login(email, password))
        // }
      }
}



  
export default connect(mapStateToProps, mapDispatchToProps)(Login)
  