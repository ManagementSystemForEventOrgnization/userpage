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
import CheckCode from '../containers/share/CheckCode';

class LoginPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isFirstLoad: true,
            email: '',
            password: '',
            error : false,
            showCheckCode: false,
        }
    }

    handleLogin = () =>{
        // const {email, password} = this.state;
        const {login} = this.props;
        login("sang123@123", "123");

        this.setState({isFirstLoad:false});

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

    onFocus = () =>{
        this.setState({
            isFirstLoad: true
        })
    }

    UNSAFE_componentWillReceiveProps = (nextProps)=>{
        console.log(nextProps);
        if(!nextProps.pending && !nextProps.message){
            if(!nextProps.user.isActive ){
                this.setState({
                    showCheckCode: true,
                })
            }
        }
    }

    render(){
        const { message, pending} = this.props;
        const {email, password, isFirstLoad, showCheckCode} = this.state;
        const active = email && password.trim();
        const clientID = process.env.REACT_APP_CLIENT_ID

        const urlIMG = "https://res.cloudinary.com/dklfyelhm/image/upload/v1584932729/Event/hand_iind0n.png";
        return(
            <div className="login">
                <div  className=" row"  >
                <Link  to="/" className="col "> 
                    <img  alt="logo" src={urlIMG}/>
                </Link> 

                <div className="col " > 

                    <p className="website-name ">Event in your hand</p>
                    
                    {
                        showCheckCode ? 
                        <CheckCode/> : 
                        
                    <Form className="mt-2" form={this.form} >

                    <Form.Item>
                        {!isFirstLoad && message && 
                            <div className="error-message mt-2 mb-2">{message}</div>
                        }  
                    </Form.Item>
                    
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
                                onFocus={this.onFocus}
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
                                onFocus={this.onFocus}
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
                                        className="ml-5 mt-4"
                                        loading={pending}
                                        disabled={!active} 
                                        onClick={this.handleLogin}
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
                            clientId= {clientID}
                            buttonText="Đăng nhập với Google"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}       
                            cookiePolicy={'single_host_origin'}
                            icon={true}
                            className="button-login-google"
                        />
                        <p className="mt-2"  style={{textAlign:"center"}}>Bạn chưa có tài khoản? <span><Link to="/signup">Đăng ký ngay</Link></span>  </p> 
                    
                    </Form>

                    }
                    

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
        user: state.user.userInfo
    };
}
  
const mapDispatchToProps = (dispatch) => ({
    login: (email, password) => dispatch(userActions.login(email,password))
  });



export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
  