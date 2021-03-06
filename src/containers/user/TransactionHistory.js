import React, { Component } from 'react';
import { userActions } from 'action/user.action';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Spin } from 'antd';

let rows = 16;
class TransactionHistory extends Component {
  componentDidMount() {
    this.props.getHistoryPayment();
  }

  onLoadMore() {
    rows += 16;
    this.props.getHistoryPayment(rows);
  }

  render() {
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'VND',
    });

    return (
      <div className="shadow p-3 mb-5 bg-white rounded mt-5">
        {this.props.paymentHistoryerr && (
          <div className="Result bank-account">
            <div className="ResultTitle" role="alert">
              {this.props.paymentHistoryerr}
            </div>
          </div>
        )}
        <h4 className="mb-3  w3-text-teal">Your history payment</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Stt</th>
              <th scope="col">Name</th>
              <th scope="col">From</th>
              <th scope="col">Amount</th>
              <th scope="col">Date</th>
              <th scope="col">Payment Type</th>
              <th scope="col">Status</th>
              <th scope="col">Note</th>
            </tr>
          </thead>
          <tbody>
            {this.props.historyPayment.map((item, key) => (
              <tr key={key}>
                <th scope="row">{key + 1}</th>
                <td>
                  {item.eventId ? (
                    <Link to={'/event/' + item.eventId.urlWeb} target="_blank">
                      {item.eventId.name}
                    </Link>
                  ) : (
                      item.eventId.name
                    )}
                </td>
                <td>{item.sender.fullName}</td>
                <td>
                  {item.sessionRefunded[0] ? (
                    <b> {formatter.format(item.amount)}</b>
                  ) : (
                      formatter.format(item.amount)
                    )}
                </td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
                <td>{item.payType}</td>
                <td>{item.status}</td>
                <td>
                  {item.sessionRefunded[0] && (
                    <div>
                      {' '}
                      refund : {new Date(item.updatedAt).toLocaleString()}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {this.props.pending && rows > 16 && (
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
        <p
          type="button"
          className="fa-fw w3-margin-right w3-text-teal"
          style={{ width: '100px' }}
          onClick={() => this.onLoadMore()}
        >
          Load more <i className="fa fa-arrow-down" aria-hidden="true"></i>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pending: state.user.pending,
    //   userInfor: state.user.userInfo,
    //   errMessage: state.user.errMessage,
    historyPayment: state.user.historyPayment,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getHistoryPayment: (recordNumber) =>
    dispatch(userActions.getHistoryPayment(recordNumber)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionHistory);
