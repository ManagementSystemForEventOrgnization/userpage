import React from 'react';
import { connect } from 'react-redux';
import { Input, Button } from 'antd';

import { userActions } from '../../action/user.action';

class CheckCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      isFirstLoad: true,
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

  handleSendOTP = () => {
    const { code } = this.state;
    const { checkCode } = this.props;
    checkCode(code);
    this.setState({
      isFirstLoad: false,
    });
  };

  render() {
    const { code, isFirstLoad } = this.state;
    const { pending, message } = this.props;

    const disactive = !isFirstLoad || !code.trim();
    return (
      <div className="col mt-5 check-code">
        <p className="notify-enter-code">
          Hãy nhập mã code(đã được gửi trong gmail) để xác nhận tài khoản{' '}
        </p>
        {!isFirstLoad && message && (
          <div className="error-message mt-2 mb-2">{message}</div>
        )}

        <div className=" mt-3 d-flex flex-row">
          <Input
            value={code}
            name="code"
            onChange={this.onChange}
            onFocus={this.onFocus}
            placeholder="Nhập mã code xác nhận  ..."
          />

          <Button
            size="large"
            type="primary"
            disabled={disactive}
            loading={pending}
            htmlType="submit"
            onClick={this.handleSendOTP}
          >
            Xác nhận
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pending: state.user.pending,
  message: state.user.errMessage,
});

const mapDispatchToProps = (dispatch) => ({
  checkCode: (code) => dispatch(userActions.checkCode(code)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckCode);
