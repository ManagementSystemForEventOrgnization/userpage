import React from 'react';
import {
    Button,

    Table,
    Spin
} from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';

// import {

//     CloseOutlined,
// } from '@ant-design/icons';


import { userActions } from 'action/user.action';

const { ColumnGroup } = Table;

class PaymentSession extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount = () => {
        const { getListPaymentSession } = this.props;
        let dataSent = {};
        dataSent.sessionId = "fbb36642-3d76-47b8-b9a8-3554391f95c5";
        dataSent.eventId = "5f1c6f0631c593001703f5bf";
        getListPaymentSession(dataSent);
    }


    render() {
        const { listPaySession } = this.props

        return (
            <div className="container mt-5">
                <Table dataSource={listPaySession}>
                    <ColumnGroup
                        title="Full Name"
                        dataIndex="sender"
                        key="sender"
                        render={(sender) =>
                            <p>{sender.fullName}</p>
                        }
                    ></ColumnGroup>
                    <ColumnGroup
                        title="Avatar"
                        dataIndex="sender"
                        key="sender"
                        render={(sender) =>
                            sender &&
                            <img src={sender.avatar} alt="logo" style={{ width: '100px', height: '100px' }} />
                        }
                    ></ColumnGroup>
                    <ColumnGroup
                        title="Time Apply"
                        dataIndex="updatedAt"
                        key="createdAt"
                        render={(updatedAt) =>
                            moment(updatedAt || new Date().toLocaleDateString()).format(
                                'DD/MM/YYYY '
                            )
                        }
                    ></ColumnGroup>
                    <ColumnGroup
                        title="Pay Type"
                        dataIndex="payType"
                        key="payType"
                        render={(payType) => <p>{payType}</p>}
                    ></ColumnGroup>
                    {/* <Column
                        title="Action"
                        dataIndex="id"
                        key="action"
                        render={(id) => (
                            <div className="row">
                                <div className="col">
                                    <Button
                                        style={{ background: this.state.backReject }}
                                        onClick={() =>
                                            this.onRejectEventMember(userJoinEvent._id, id)
                                        }
                                        shape="circle"
                                    >
                                        <CloseOutlined style={{ fontSize: '15px' }} />
                                    </Button>
                                </div>
                            </div>
                        )}
                    /> */}
                </Table>


            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    listPaySession: state.user.listPaySession,
    pendPaySession: state.user.pendPaySession
});

const mapDispatchToProps = (dispatch) => ({

    getListPaymentSession: (dataSent) =>
        dispatch(userActions.getListPaymentSession(dataSent)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentSession);
