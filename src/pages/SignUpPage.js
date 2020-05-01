import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  UnlockOutlined,
} from '@ant-design/icons';

import { userActions } from '../action/user.action';
import CheckCode from '../containers/share/CheckCode';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      password: '',
      retypePassword: '',
      isFirstLoad: true,
    };
  }

  handleSignup = () => {
    const { email, password, fullname } = this.state;
    const { register } = this.props;

    register(email, password, fullname);
    this.setState({ isFirstLoad: false });
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
    const {
      fullname,
      email,
      password,
      retypePassword,
      isFirstLoad,
    } = this.state;
    const { pending, message, showCheckCode } = this.props;
    const active =
      email && fullname && password.trim() && password === retypePassword;
    const urlIMG =
      'https://res.cloudinary.com/dklfyelhm/image/upload/v1584932729/Event/hand_iind0n.png';

    return (
      <div className="login">
        <div className=" row">
          <Link to="/" className="col ">
            <img src={urlIMG} alt="logo" />
          </Link>
          <div className="col">
            <p className="website-name">Event in your hand</p>

            {showCheckCode && !isFirstLoad ? (
              <CheckCode />
            ) : (
              <Form
                className="mt-4"
                form={this.form}
                name="horizontal_login"
                onFinish={this.onFinish}
              >
                <Form.Item>
                  {!isFirstLoad && message && (
                    <div className="error-message mt-2 mb-2">{message}</div>
                  )}
                </Form.Item>

                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: 'Fullname là bắt buộc !',
                    },
                  ]}
                >
                  <Input
                    name="fullname"
                    value={fullname}
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Họ và tên"
                  />
                </Form.Item>

                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: 'Email là bắt buộc!',
                    },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined className="site-form-item-icon" />}
                    value={email}
                    name="email"
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    placeholder="Email"
                  />
                </Form.Item>

                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: 'Password là bắt buộc!',
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    placeholder="Password"
                  />
                </Form.Item>

                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: 'Nhập lại password!',
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<UnlockOutlined className="site-form-item-icon" />}
                    type="password"
                    name="retypePassword"
                    value={retypePassword}
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    placeholder="Nhập lại password"
                  />
                </Form.Item>

                <Form.Item shouldUpdate>
                  {() => (
                    <div style={{ textAlign: 'center' }}>
                      <Button
                        block
                        type="primary"
                        onClick={this.handleSignup}
                        disabled={!active}
                        loading={pending}
                      >
                        Đăng ký
                      </Button>
                    </div>
                  )}
                </Form.Item>

                <p className="mt-2" style={{ textAlign: 'center' }}>
                  Bạn đã có tài khoản?{' '}
                  <span>
                    <Link to="/login">Đăng nhập</Link>
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
    pending: state.user.pending,
    message: state.user.errMessage,
    user: state.user.userInfo,
    showCheckCode: state.user.showCheckCode,
  };
};

const mapDispatchToProps = (dispatch) => ({
  register: (email, password, fullname) =>
    dispatch(userActions.register(email, password, fullname)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
