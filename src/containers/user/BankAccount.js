// // import React, { Component } from 'react';
// // import { connect } from 'react-redux';
// // import { userActions } from 'action/user.action';
// // import { Form, Input, Button } from 'antd';
// // import NumberFormat from 'react-number-format';
// // import { userInfo } from 'os';

// // class BankAccount extends Component {
// //     constructor(props) {
// //         super(props);

// //         this.state = {
// //             bankInfor: {
// //                 bankName: "",
// //                 bankNumber: "",
// //                 accountOwner: "",
// //                 bankBranch: ""
// //             }
// //         }
// //     }

// //     componentDidMount = () => {
// //         const { getBankAccount } = this.props;
// //         getBankAccount();
// //     };

// //     static getDerivedStateFromProps(nextProps, prevState) {
// //         if (nextProps.bankInfor && nextProps.bankInfor !== prevState.bankInfor) {
// //             return {
// //                 bankInfor: nextProps.bankInfor,
// //                 isGetData: false,
// //             };
// //         } else return null;
// //     }

// //     onHandleChange = (event) => {
// //         const { name, value } = event.target;
// //         this.setState({
// //             bankInfor: {
// //                 ...this.state.bankInfor,
// //                 [name]: value,
// //             },
// //         });
// //     }

// //     errorHandle() {
// //         if (this.props.errMessage)
// //             return (<div class="alert alert-danger" role="alert" enable>
// //                 {this.props.errMessage}ss
// //           </div>)
// //         if (this.state.isSaved && !this.props.pending) {
// //             return (< div class="alert alert-success" role="alert">
// //                 Save changes sucessfully
// //           </div>)
// //         }
// //         if (JSON.stringify(this.state.userInfor) === JSON.stringify(this.props.userInfor)) {
// //             return (
// //                 <div class="alert alert-danger" role="alert" enable>
// //                     there is no changes! please
// //              </div>
// //             )
// //         }
// //     }

// //     render() {
// //         const layout = {
// //             labelCol: { span: 8 },
// //             wrapperCol: { span: 16 },
// //         };

// //         const validateMessages = {
// //             required: '${label} is required!',
// //             types: {
// //                 number: '${label} is not a validate number!',
// //             },
// //             number: {
// //                 range: '${label} must be between ${min} and ${max}',
// //             },
// //         };

// //         const { bankInfor } = this.state

// //         const onFinish = (values) => {
// //             console.log(values)
// //             const { onUpdateBankInfor } = this.props;
// //             const { ...bankInfor } = this.state;

// //             if (onUpdateBankInfor) {
// //                 onUpdateBankInfor(bankInfor)
// //             }

// //             this.setState({
// //                 isSaved: true
// //             })

// //             // this.setState({
// //             //     bankInfor: { ...values.bankInfor }
// //             // })

// //             // const { onUpdateBankInfor } = this.props;
// //             // const { bankInfor } = this.state;

// //             // if (onUpdateBankInfor) {
// //             //     onUpdateBankInfor(bankInfor)
// //             // }
// //         };

// //         // const a = 'aaa';
// //         return (
// //             <div className="bank-account mb-5 mt-5 p-5 border rounded bg-secondary" >
// //                 <h4>Thông tin tài khoản của bạn</h4>
// //                 <Form
// //                     className="mr-5 mt-5"
// //                     {...layout}
// //                     onFinish={onFinish}
// //                     validateMessages={validateMessages}
// //                 >
// //                     <Form.Item
// //                         //  name={['bankInfor', 'accountOwner']}
// //                         // name='accountOwner'
// //                         label="Chủ tài khoản"
// //                         rules={[{ required: true }]}
// //                     >
// //                         <Input
// //                             onChange={this.onHandleChange}
// //                             value={bankInfor.accountOwner}
// //                         // name="accountOwner"
// //                         />
// //                         {/* <input type="text" onChange={this.onHandleChange} value={bankInfor.accountOwner} name="accountOwner" /> */}
// //                     </Form.Item>
// //                     <Form.Item
// //                         // name='bankNumber'
// //                         // name={['bankInfor', 'bankNumber']}
// //                         label="số tài khoản"
// //                         rules={[{ required: true }]}
// //                     >
// //                         <NumberFormat
// //                             value={bankInfor.bankNumber} name="bankNumber"
// //                             onChange={(e) => { this.setState({ bankInfor: { bankNumber: e.value } }) }}
// //                             format="#### #### #### ####"
// //                             style={{ 'width': '100%' }} />
// //                     </Form.Item>
// //                     <Form.Item
// //                         // name={['bankInfor', 'bankName']}
// //                         label="Tên ngân hàng"
// //                         rules={[{ required: true }]}
// //                     >
// //                         <Input defaultValue={bankInfor.bankName}
// //                             onChange={this.onHandleChange}
// //                         // name="bankName"
// //                         />
// //                     </Form.Item>
// //                     <Form.Item
// //                         // name={['bankInfor', 'bankBranch']}
// //                         label="Chi nhánh"
// //                         rules={[{ required: true }]}
// //                     >
// //                         <Input defaultValue={bankInfor.bankBranch}
// //                             onChange={this.onHandleChange}
// //                         // name="bankBranch"
// //                         />
// //                     </Form.Item>
// //                     <Form.Item >
// //                         <Button type="primary" htmlType="submit">
// //                             Lưu lại
// //             </Button>
// //                     </Form.Item>
// //                 </Form>
// //             </div>
// //         );
// //     }
// // }

// // const mapStateToProps = (state) => {
// //     return {
// //         pending: state.user.pending,
// //         bankInfor: state.user.bankInfor,
// //         errMessage: state.user.errMessage
// //     };
// // };

// // const mapDispatchToProps = (dispatch) => ({
// //     getBankAccount: () => dispatch(userActions.getBankAccount()),
// //     onUpdateBankInfor: (bankInfor) => dispatch(userActions.onUpdateBankInfor(bankInfor)),
// // });

// // export default connect(mapStateToProps, mapDispatchToProps)(BankAccount);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from 'action/user.action';
import { Form, Input, Button } from 'antd';
import NumberFormat from 'react-number-format';
class BankAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bankInfor: {
        bankName: '',
        bankNumber: '',
        accountOwner: '',
        bankBranch: '',
      },
    };
  }

  componentDidMount = () => {
    const { getBankAccount } = this.props;
    getBankAccount();
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.bankInfor && nextProps.bankInfor !== prevState.bankInfor) {
      return {
        bankInfor: nextProps.bankInfor,
        isGetData: false,
      };
    } else return null;
  }

  onHandleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      bankInfor: {
        ...this.state.bankInfor,
        [name]: value,
      },
    });
  };

  errorHandle() {
    if (this.props.errMessage)
      return (
        <div class="alert alert-danger" role="alert" enable>
          {this.props.errMessage}ss
        </div>
      );
    if (this.state.isSaved && !this.props.pending) {
      return (
        <div class="alert alert-success" role="alert">
          Save changes sucessfully
        </div>
      );
    }
    if (
      JSON.stringify(this.state.userInfor) ===
      JSON.stringify(this.props.userInfor)
    ) {
      return (
        <div class="alert alert-danger" role="alert" enable>
          there is no changes! please
        </div>
      );
    }
  }
  render() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    const validateMessages = {
      // eslint-disable-next-line
      required: '${label} is required!',
      types: {
        // eslint-disable-next-line
        number: '${label} is not a validate number!', // eslint-disable-next-line
      },
      number: {
        // eslint-disable-next-line
        range: '${label} must be between ${min} and ${max}', // eslint-disable-next-line
      },
    };

    const { bankInfor } = this.state;

    const onFinish = (values) => {
      const { onUpdateBankInfor } = this.props;
      const { ...bankInfor } = this.state;

      if (onUpdateBankInfor) {
        onUpdateBankInfor(bankInfor);
      }

      this.setState({
        isSaved: true,
      });

      // this.setState({
      //     bankInfor: { ...values.bankInfor }
      // })

      // const { onUpdateBankInfor } = this.props;
      // const { bankInfor } = this.state;

      // if (onUpdateBankInfor) {
      //     onUpdateBankInfor(bankInfor)
      // }
    };

    return (
      <div className="bank-account mb-5 mt-5 p-5 border rounded bg-secondary">
        <h4>Thông tin tài khoản của bạn</h4>
        <Form
          className="mr-5 mt-5"
          {...layout}
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            //  name={['bankInfor', 'accountOwner']}
            // name='accountOwner'
            label="Chủ tài khoản"
            rules={[{ required: true }]}
          >
            <Input
              onChange={this.onHandleChange}
              value={bankInfor.accountOwner}
              // name="accountOwner"
            />
            {/* <input type="text" onChange={this.onHandleChange} value={bankInfor.accountOwner} name="accountOwner" /> */}
          </Form.Item>
          <Form.Item
            // name='bankNumber'
            // name={['bankInfor', 'bankNumber']}
            label="số tài khoản"
            rules={[{ required: true }]}
          >
            <NumberFormat
              value={bankInfor.bankNumber}
              name="bankNumber"
              onChange={(e) => {
                this.setState({ bankInfor: { bankNumber: e.value } });
              }}
              format="#### #### #### ####"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            // name={['bankInfor', 'bankName']}
            label="Tên ngân hàng"
            rules={[{ required: true }]}
          >
            <Input
              defaultValue={bankInfor.bankName}
              onChange={this.onHandleChange}
              // name="bankName"
            />
          </Form.Item>
          <Form.Item
            // name={['bankInfor', 'bankBranch']}
            label="Chi nhánh"
            rules={[{ required: true }]}
          >
            <Input
              defaultValue={bankInfor.bankBranch}
              onChange={this.onHandleChange}
              // name="bankBranch"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
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
