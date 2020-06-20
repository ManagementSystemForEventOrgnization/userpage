import React, { Component } from 'react';
// import { Pagination } from 'antd';
import { userActions } from 'action/user.action';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// const columns = [
//     {
//         title: 'Event Name',
//         dataIndex: 'name',
//     },
//     {
//         title: 'Amount',
//         dataIndex: 'amount',
//         // sorter: {
//         //     compare: (a, b) => a.chinese - b.chinese,
//         //     multiple: 3,
//         // },
//     },
//     {
//         title: 'Date',
//         dataIndex: 'createdAt',
//         // sorter: {
//         //     compare: (a, b) => a.math - b.math,
//         //     multiple: 2,
//         // },
//     },
//     {
//         title: 'Payment Type',
//         dataIndex: 'payType',
//         // sorter: {
//         //     compare: (a, b) => a.english - b.english,
//         //     multiple: 1,
//         // },
//     }, {
//         title: 'Status',
//         dataIndex: 'status'
//     }
// ];

// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     chinese: 98,
//     math: 60,
//     english: 70,
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     chinese: 98,
//     math: 66,
//     english: 89,
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     chinese: 98,
//     math: 90,
//     english: 70,
//   },
//   {
//     key: '4',
//     name: 'Jim Red',
//     chinese: 88,
//     math: 99,
//     english: 89,
//   },
// ];

class TransactionHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGetData: false,
      historyPayment: {
        _id: '',
        name: '',
        amount: '',
        createdAt: '',
        payType: '',
        session: [],
        status: '',
      },
    };
  }
  componentDidMount() {
    this.props.getHistoryPayment();
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //     console.log(nextProps.historyPayment);
  //     if (!nextProps.historyPayment === undefined
  //         // !(prevState.isGetData ||
  //         //     nextProps.historyPayment === null)// &&
  //         //   nextProps.userInfor !== prevState.userInfor
  //     ) {
  //         //   fistValueUserInfor = nextProps.userInfor;
  //         return {
  //             historyPayment: {
  //                 name: nextProps.historyPayment.eventId.name,
  //                 session: nextProps.historyPayment.eventId.session,
  //                 status: nextProps.historyPayment.eventId.status,
  //             },
  //             isGetData: true,
  //         };
  //     } else return null;
  // }

  render() {
    // const onChange = (pageNumber) => {
    //     console.log('pageNumber', pageNumber);
    // }

    // const Table = (columns = [], dataSource = [], onChange) => (
    //     <Table columns={columns} dataSource={{
    //         dataSource,
    //         key: dataSource._id
    //     }} onChange={onChange} />
    // )

    console.log(this.props);
    return (
      <div className="shadow p-3 mb-5 bg-white rounded mt-5">
        <h2 className="mb-3">Your history payment</h2>
        {/* <Table rowKey="_id" columns={columns} dataSource={
                    this.state.historyPayment
                    // name: this.state.historyPayment.eventId.name
                } onChange={onChange} />
                {Table(columns, this.props.historyPayment, onChange)} */}
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
            {/* <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                        </tr> */}
            {this.props.historyPayment.map((item, key) => (
              <tr key={key}>
                <th scope="row">{key + 1}</th>
                <td>
                  {item.eventId.bannerUrl ? (
                    <Link to={item.eventId.bannerUrl}>{item.eventId.name}</Link>
                  ) : (
                    item.eventId.name
                  )}
                </td>
                <td>{item.amount}</td>
                <td>
                  {new Date(item.createdAt).getMonth()} -{' '}
                  {new Date(item.createdAt).getDate()} -{' '}
                  {new Date(item.createdAt).getFullYear()}{' '}
                </td>
                <td>{item.payType}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <Pagination defaultCurrent={1} total={50} onChange={onChange} /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //   pending: state.user.pending,
    //   userInfor: state.user.userInfo,
    //   errMessage: state.user.errMessage,
    historyPayment: state.user.historyPayment,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getHistoryPayment: () => dispatch(userActions.getHistoryPayment()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionHistory);
