import React from 'react';
import { connect } from 'react-redux';

import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';

import { userActions } from '../action/user.action';
import VerifyPassword from '../containers/share/VerifyPassword';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirstLoad: true,
      email: '',
    };
  }
  handleSendEmail = () => {
    const { email } = this.state;
    const { requestForgotPassword } = this.props;

    requestForgotPassword(email);
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
    const { message, pending, showVerifyForgotPassword } = this.props;
    const { email, isFirstLoad } = this.state;
    const activeEmail = email.trim();

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

            {showVerifyForgotPassword && !isFirstLoad ? (
              <VerifyPassword />
            ) : (
              <Form className="mt-2" form={this.form}>
                <p className="notification">
                  We'll send you password reset instructions to your email
                  address.
                </p>
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
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    value={email}
                    name="email"
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    placeholder="Email"
                  />
                </Form.Item>

                <Form.Item shouldUpdate>
                  {() => (
                    <Button
                      type="primary"
                      className=" mt-2 changePassword"
                      loading={pending}
                      disabled={!activeEmail}
                      htmlType="submit"
                      onClick={this.handleSendEmail}
                    >
                      Reset my password
                    </Button>
                  )}
                </Form.Item>
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
    showVerifyForgotPassword: state.user.showVerifyForgotPassword,
  };
};

const mapDispatchToProps = (dispatch) => ({
  requestForgotPassword: (email) =>
    dispatch(userActions.requestForgotPassword(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
