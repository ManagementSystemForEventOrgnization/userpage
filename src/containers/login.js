import React from 'react';
import { connect } from 'react-redux';

import { GoogleLogin } from 'react-google-login';

import { Form, Input, Button } from 'antd';
import {Link} from 'react-router-dom';
import { 
    UserOutlined,
    LockOutlined,
     
} from '@ant-design/icons';




import {userActions} from '../action/user.action';


class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isFirstLoad: true,
            email: '',
            password: '',
        }
    }

    handleLogin = () =>{
        const [email, password] = ["sang123@123", "123"];
        userActions.login(email, password);
    }


    responseGoogle = (response) => {
        // const {loginWithGoogle} = this.props;
        console.log(response);

        //loginWithGoogle(response.Zi.access_token);
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render(){
        const { pending} = this.props;
        const {email, password} = this.state;
        const active = email && password.trim();

        const urlIMG = "https://res.cloudinary.com/dklfyelhm/image/upload/v1584932729/Event/hand_iind0n.png";
        return(
            <div className="login">
                <div  className=" row"  >
                <Link  to="/" className="col "> 
                    <img  alt="logo" src={urlIMG}/>
                </Link> 

                <div className="col " > 

                    <p className="website-name mb-5">Event in your hand</p>
                    
                    <Form className="mt-4" form={this.form} >
                        <Form.Item
                            name="Email"
                            rules={[
                            {
                                required: true,
                                message: 'Email là bắt buộc !',
                            },
                            ]}
                        >
                            <Input 
                                prefix={<UserOutlined className="site-form-item-icon" />} 
                                value={email}
                                name="email"
                                onChange={this.onChange}
                                placeholder="Email" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                            {
                                required: true,
                                message: 'Mật khẩu là bắt buộc !',
                            },
                            ]}
                        >
                            <Input.Password 
                                value={password}
                                onChange={this.onChange}
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                name="password"
                                placeholder="Password"

                                />
                        </Form.Item>
                        
                        <div className='ant-row'>
                            <div className="ant-col ant-col-12 pl-5">
                                <Form.Item shouldUpdate>
                                {() => (
                                    <Button
                                        type="primary"
                                        className="ml-5"
                                        loading={pending}
                                        disabled={!active} 
                                    >
                                        Đăng nhập
                                    </Button>
                                )}
                                </Form.Item>
                        
                            </div>
                            <div className="ant-col ant-col-12  ">
                                <Link to="/"  style={{float:"right"}}>Quên mật khẩu?</Link>
                            </div>
                        </div>

                        <p style={{textAlign:"center"}}>HOẶC</p>
                        <GoogleLogin
                            clientId= "287818477541-q905d77othv431di8tqv6a1hfkljl4aa.apps.googleusercontent.com"
                            buttonText="Đăng nhập với Google"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}       
                            cookiePolicy={'single_host_origin'}
                            icon={true}
                            className="button-login-google"
                        />

                        <p className="mt-2"  style={{textAlign:"center"}}>Bạn chưa có tài khoản? <span><Link to="/signup">Đăng ký ngay</Link></span>  </p> 
                    
                    </Form>

                    <button onClick={this.handleLogin}> click</button>

                </div>
                </div>


            </div>
       
       )
    }
}
const mapStateToProps = state => {
    return { 
        message: state.user.errMessage,
        pending: state.user.pending,
    };
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password) => dispatch(userActions.login(email,password)),
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Login)
  