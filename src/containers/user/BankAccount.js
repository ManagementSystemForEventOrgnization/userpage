import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from 'action/user.action';
import { Form, Input, Button } from 'antd';
import NumberFormat from 'react-number-format';

let fistValuebankInfor = {};
class BankAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bankInfor: {},
      isGetData: true,
      loading: false,
      isSaved: false,
      isEmpty: false,
    };
  }

  componentDidMount = () => {
    const { getBankAccount } = this.props;
    getBankAccount();
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.isGetData &&
      nextProps.bankInfor &&
      nextProps.bankInfor !== prevState.bankInfor
    ) {
      fistValuebankInfor = nextProps.bankInfor;
      return {
        bankInfor: nextProps.bankInfor,
        isGetData: false,
      };
    } else return null;
  }

  onHandleChange = (event) => {
    const { name, value } = event.target;
    if (value.trim() === '') this.setState({ isEmpty: true });
    else this.setState({ isEmpty: false });
    this.setState({
      bankInfor: {
        ...this.state.bankInfor,
        [name]: value,
      },
      isSaved: false,
    });
  };

  errorHandle() {
    if (this.props.errMessage)
      return (
        <div className="alert alert-danger" role="alert" enable>
          {this.props.errMessage}
        </div>
      );
    if (this.state.isEmpty) {
      return (
        <div className="alert alert-danger" role="alert">
          invalid field. Field can not be empty
        </div>
      );
    }
    if (
      JSON.stringify(this.state.bankInfor) ===
      JSON.stringify(fistValuebankInfor)
    ) {
      return (
        <div className="alert alert-danger" role="alert">
          there is no changes! please
        </div>
      );
    } else if (this.state.isSaved && !this.props.pending) {
      return (
        <div className="alert alert-success" role="alert">
          Save changes sucessfully
        </div>
      );
    }
  }

  render() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    const { bankInfor } = this.state;
    const { pending } = this.props;
    const onFinish = (values) => {
      console.log(values);
      const { onUpdateBankInfor } = this.props;
      const { bankInfor } = this.state;

      if (onUpdateBankInfor) {
        onUpdateBankInfor(bankInfor);
      }

      this.setState({
        isSaved: true,
      });

      fistValuebankInfor = this.state.bankInfor;
    };

    return (
      <div className="bank-account mb-5 mt-5 p-5 border rounded bg-secondary">
        <h4>Thông tin tài khoản của bạn</h4>
        {this.errorHandle()}
        <Form className="mr-5 mt-5" {...layout} onFinish={onFinish}>
          <Form.Item label="Chủ tài khoản">
            <Input
              onChange={this.onHandleChange}
              value={bankInfor.accountOwner}
              name="accountOwner"
            />
          </Form.Item>
          <Form.Item label="số tài khoản">
            <NumberFormat
              value={bankInfor.bankNumber}
              name="bankNumber"
              onChange={this.onHandleChange}
              format="#### #### #### ####"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item label="Tên ngân hàng">
            <Input
              value={bankInfor.bankName}
              onChange={this.onHandleChange}
              name="bankName"
            />
          </Form.Item>
          <Form.Item label="Chi nhánh">
            <Input
              value={bankInfor.bankBranch}
              onChange={this.onHandleChange}
              name="bankBranch"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                (this.state.isSaved && !this.props.pending) ||
                JSON.stringify(this.state.bankInfor) ===
                  JSON.stringify(fistValuebankInfor) ||
                this.state.isEmpty
              }
              loading={pending}
            >
              Lưu lại
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
    bankInfor: state.user.bankInfor,
    errMessage: state.user.errMessage,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getBankAccount: () => dispatch(userActions.getBankAccount()),
  onUpdateBankInfor: (bankInfor) =>
    dispatch(userActions.onUpdateBankInfor(bankInfor)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BankAccount);
