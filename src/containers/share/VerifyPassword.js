import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { LockOutlined, MailOutlined, UnlockOutlined } from '@ant-design/icons';

import { userActions } from '../../action/user.action';

class VerifyPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      isFirstLoad: true,
      email: '',
      password: '',
      retypePassword: '',
    };
  }

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

  handleForgotPassword = () => {
    const { code, email, password } = this.state;
    const { forgotPassword } = this.props;
    forgotPassword(email, code, password);
    this.setState({
      isFirstLoad: false,
    });
  };

  render() {
    const { code, isFirstLoad, email, retypePassword, password } = this.state;
    const { pending, message } = this.props;

    const active =
      email && code && password.trim() && password === retypePassword;
    return (
      <div className="col check-code">
        <p className="notify-enter-code">
          Hãy nhập mã code(đã được gửi trong gmail) để xác nhận tài khoản{' '}
        </p>
        {!isFirstLoad && message && (
          <div className="error-message mt-2 mb-2">{message}</div>
        )}

        <Form form={this.form}>
          <Form.Item>
            {!isFirstLoad && message && (
              <div className="error-message mt-2 mb-2">{message}</div>
            )}
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
            name="Code"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              className="inputStyle"
              value={code}
              name="code"
              onChange={this.onChange}
              onFocus={this.onFocus}
              placeholder="Enter code confirm  ..."
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
              <Button
                type="primary"
                className=" mt-2 changePassword"
                loading={pending}
                disabled={!active}
                htmlType="submit"
                onClick={this.handleForgotPassword}
              >
                Change my password
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pending: state.user.pending,
  message: state.user.errMessage,
});

const mapDispatchToProps = (dispatch) => ({
  forgotPassword: (email, code, password) =>
    dispatch(userActions.forgotPassword(email, code, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyPassword);
