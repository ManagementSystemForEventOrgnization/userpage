
import React, { Component } from 'react'
import { userActions } from 'action/user.action';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Spin } from 'antd';

let rows = 16;
class TransactionHistory extends Component {
    constructor(props) {
        super(props)

    }
    componentDidMount() {
        this.props.getHistoryPayment()
    }

    onLoadMore() {
        rows += 16
        this.props.getHistoryPayment(rows)
    }

    render() {
        return (
            <div className="shadow p-3 mb-5 bg-white rounded mt-5">
                {this.props.paymentHistoryerr && <div className="Result bank-account">
                    <div className="ResultTitle" role="alert">
                        {this.props.paymentHistoryerr}
                    </div>
                </div>}
                <h4 className="mb-3  w3-text-teal">Your history payment</h4>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Stt</th>
                            <th scope="col">Name</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Date</th>
                            <th scope="col">Payment Type</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.historyPayment.map((item, key) => (
                                <tr key={key}>
                                    <th scope="row">{key + 1}</th>
                                    <td>{item.eventId.bannerUrl ? (<Link to={item.eventId.bannerUrl}>{item.eventId.name}</Link>) : item.eventId.name}</td>
                                    <td>{item.amount}</td>
                                    <td>{new Date(item.createdAt).getMonth()} - {new Date(item.createdAt).getDate()} - {new Date(item.createdAt).getFullYear()} </td>
                                    <td>{item.payType}</td>
                                    <td>{item.status}</td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {this.props.pending && (
                    <Spin
                        tip="Loading..."
                        size="large"
                        style={{
                            position: 'absolute',
                            top: '50%',
                        }}
                    >
                        {' '}
                    </Spin>
                )}
                <a className="fa-fw w3-margin-right w3-text-teal" onClick={() => this.onLoadMore()}>Load more <i className="fa fa-arrow-down" aria-hidden="true"></i></a>
            </div>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        pending: state.user.pending,
        //   userInfor: state.user.userInfo,
        //   errMessage: state.user.errMessage,
        historyPayment: state.user.historyPayment
    };
};

const mapDispatchToProps = (dispatch) => ({
    getHistoryPayment: (recordNumber) => dispatch(userActions.getHistoryPayment(recordNumber)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionHistory);




