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
      <div className="col  check-code" style={{ marginTop: '10%' }}>
        <p className="notify-enter-code">
          Enter code(sent in email) to activate your account
        </p>
        {!isFirstLoad && message && (
          <div className="error-message mt-2 mb-2">{message}</div>
        )}

        <div className=" mt-3 ">
          <Input
            style={{ marginTop: '10%', height: '40px', borderRadius: '10px' }}
            value={code}
            name="code"
            onChange={this.onChange}
            onFocus={this.onFocus}
            placeholder="Enter code to confirm  ..."
          />

          <Button
            style={{
              width: '100%', height: '40px', borderRadius: '10px', marginTop: '10%',
              color: 'black', fontWeight: 'bold'
            }}
            type="primary"
            disabled={disactive}
            loading={pending}
            htmlType="submit"
            onClick={this.handleSendOTP}
          >
            Confirm
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
