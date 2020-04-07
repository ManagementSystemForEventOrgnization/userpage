import React from 'react';
import { connect } from 'react-redux'
import { Input, Button } from 'antd';

import { userActions } from '../../action/user.action';


class CheckCode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
        }
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleSendOTP = () => {
        const { code } = this.state;
        const { checkCode } = this.props;
        checkCode(code);
    }

    render() {
        const { code, err } = this.state;
        const { pendding } = this.props;
        const disactive = err || !code.trim()
        return (
            <div className="col mt-5 check-code" >

                <p className="notify-enter-code" >Hãy nhập mã code(đã được gửi trong gmail) để xác nhận tài khoản  </p>


                <div className=" mt-3 d-flex flex-row">
                    <Input
                        value={code}
                        name="code"
                        onChange={this.onChange}
                        placeholder="Nhập mã code xác nhận  ..." />

                    <Button
                        size="large"
                        type="primary"
                        disabled={disactive}
                        loading={pendding}
                        onClick={this.handleSendOTP}
                    > Xác nhận</Button>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    pendding: state.user.pendding,
    message: state.user.errMessage,
})

const mapDispatchToProps = (dispatch) => ({
    checkCode: (code) => dispatch(userActions.checkCode(code))
});



export default connect(mapStateToProps, mapDispatchToProps)(CheckCode)
