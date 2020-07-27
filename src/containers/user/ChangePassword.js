import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { userActions } from 'action/user.action';
import { connect } from 'react-redux';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      newPassword: '',
      confirmPassword: '',
    };
  }

  errorHandle() {
    if (this.props.errMessage)
      return (
        <div className="alert alert-danger" role="alert" enable>
          {this.props.errMessage}
        </div>
      );
  }

  render() {
    const onFinish = (values) => {
      this.setState({
        ...values,
      });

      const { onChangePassword } = this.props;

      if (onChangePassword) {
        onChangePassword({
          oldpassword: this.state.password,
          newpassword: this.state.newPassword,
        });
      }
    };

    const onFinishFailed = (errorInfo) => {};

    return (
      <div className=" p-3 bg-white rounded">
        {' '}
        {this.errorHandle()}
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              {
                required: true,
                message: 'Please input your new password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    'The two passwords that you entered do not match!'
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pending: state.user.pending,
    errMessage: state.user.errMessage,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onChangePassword: (passwords) =>
    dispatch(userActions.onChangePassword(passwords)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
