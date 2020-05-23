import React from 'react';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { userActions } from '../action/user.action';
import CheckCode from '../containers/share/CheckCode';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirstLoad: true,
      email: '',
      password: '',
    };
  }

  handleLogin = () => {
    const { email, password } = this.state;
    const { login } = this.props;
    login(email, password);
    this.setState({ isFirstLoad: false });
  };

  responseGoogle = (response) => {
    const { loginWithGoogle } = this.props;
    loginWithGoogle(response.profileObj);
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onFocus = () => {
    this.setState({
      isFirstLoad: true,
    });
  };

  render() {
    const { message, pending, active } = this.props;
    const { email, password, isFirstLoad } = this.state;
    const activeEmail = email && password.trim();
    const clientID = process.env.REACT_APP_CLIENT_ID;

    const urlIMG =
      'https://res.cloudinary.com/dklfyelhm/image/upload/v1584932729/Event/hand_iind0n.png';

    return (
      <div className="login">
        <div className=" row">
          <Link to="/" className="col ">
            <img alt="logo" src={urlIMG} />
          </Link>

          <div className="col ">
            <p className="website-name ">Event in your hand</p>

            {active === false ? (
              <CheckCode />
            ) : (
              <Form className="mt-2">
                <Form.Item>
                  {!isFirstLoad && message && (
                    <div className="error-message mt-2 mb-2">{message}</div>
                  )}
                </Form.Item>

                <Form.Item
                  name="Email"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    className="inputStyle"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    value={email}
                    name="email"
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    placeholder="Email"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input.Password
                    className="inputStyle"
                    value={password}
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </Form.Item>

                <div className="ant-row">
                  <div className="ant-col ant-col-12 pl-5">
                    <Form.Item shouldUpdate>
                      {() => (
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="ml-5 mt-4"
                          loading={pending}
                          disabled={!activeEmail}
                          onClick={this.handleLogin}
                        >
                          Login
                        </Button>
                      )}
                    </Form.Item>
                  </div>
                  <div className="ant-col ant-col-12  ">
                    <Link to="/forgotpassword" style={{ float: 'right' }}>
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <p style={{ textAlign: 'center' }}>OR</p>

                <GoogleLogin
                  clientId={clientID}
                  buttonText="Login with Google"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  cookiePolicy={'single_host_origin'}
                  icon={true}
                  className="button-login-google"
                />
                <p className="mt-2" style={{ textAlign: 'center' }}>
                  You don't have any account ?{' '}
                  <span>
                    <Link to="/signup">Register Now</Link>
                  </span>{' '}
                </p>
              </Form>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.user.errMessage,
    pending: state.user.pending,
    active: state.user.active,
  };
};

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(userActions.login(email, password)),
  loginWithGoogle: (profile) => dispatch(userActions.loginWithGoogle(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
