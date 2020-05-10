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
              <Form className="mt-4" form={this.form}>
                <Form.Item>
                  {!isFirstLoad && message && (
                    <div className="error-message mt-2 mb-2">{message}</div>
                  )}
                </Form.Item>

                <Form.Item
                  name="fullname"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    className="inputStyle"
                    name="fullname"
                    value={fullname}
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Fullname"
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    className="inputStyle"
                    prefix={<MailOutlined className="site-form-item-icon" />}
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
                  name="retypePassword"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input.Password
                    className="inputStyle"
                    prefix={<UnlockOutlined className="site-form-item-icon" />}
                    type="password"
                    name="retypePassword"
                    value={retypePassword}
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    placeholder="Retype password"
                  />
                </Form.Item>

                <Form.Item shouldUpdate>
                  {() => (
                    <div style={{ textAlign: 'center' }}>
                      <Button
                        className=" mt-2 changePassword"
                        block
                        type="primary"
                        htmlType="submit"
                        onClick={this.handleSignup}
                        disabled={!active}
                        loading={pending}
                      >
                        Register
                      </Button>
                    </div>
                  )}
                </Form.Item>

                <p className="mt-2" style={{ textAlign: 'center' }}>
                  You had account?{' '}
                  <span>
                    <Link to="/login">Login </Link>
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
