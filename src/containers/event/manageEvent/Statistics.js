
import React, { Component } from 'react'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { userActions } from 'action/user.action';
import { connect } from 'react-redux';
import { Table, Spin, Modal, Button } from 'antd';
import {
    DoubleRightOutlined,

} from '@ant-design/icons';
import moment from 'moment';
am4core.useTheme(am4themes_animated);
const { ColumnGroup } = Table;
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
});
const columns = [
    {
        title: 'Event', dataIndex: 'bannerUrl', key: '_id' + 'bannerUrl',
        render: (bannerUrl) => <img style={{ width: '50px' }} src={bannerUrl}></img>,
    },
    {
        title: 'Event Name', dataIndex: 'name', key: '_id' + 'name',
        render: (name) => <a src={process.env.REACT_APP_DOMAIN_EVENT}>{name}</a>
    },
    {
        title: 'Total Amount', dataIndex: 'totalSession', key: '_id' + 'totalSession',
        render: (totalSession) => <div>
            <p>{formatter.format(totalSession)}
            </p>

        </div>
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: '_id' + 'status',
        render: status => {
            let color = status === "PUBLIC" ? 'green' : 'volcano';
            return (
                <div style={{ color: color, padding: '3px' }} key={status}>
                    {status.toUpperCase()}
                </div>
            )
        },
    },
];

class Statistics extends Component {
    constructor(props) {
        super(props)
        this.state = {
            statisticsData: [],
            total: { SumAmount: 0 },
            visible: false,
            events: [],
            session: [],
            totalSession: 0,
        }
    }
    componentDidMount() {
        this.props.getStatistics("2020-04-26", "2020-07-26").then(() => {
            let chart1 = am4core.create("chartdiv1", am4charts.PieChart);

            let series1 = chart1.series.push(new am4charts.PieSeries());
            series1.dataFields.value = "SumAmount";
            series1.dataFields.category = "name";

            // Add data
            chart1.data = this.state.statisticsData

            chart1.legend = new am4charts.Legend();

            var sum = this.state.statisticsData !== [] && this.state.statisticsData.reduce(function (previousValue, currentValue) {
                return { SumAmount: previousValue.SumAmount + currentValue.SumAmount }
            });

            this.setState({
                total: sum
            })
        })

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.statisticsData &&
            nextProps.statisticsData !== prevState.statisticsData
        ) {
            return {
                statisticsData: nextProps.statisticsData,
            };
        } else return null;
    }

    componentWillUnmount() {
        if (this.chart1) {
            this.chart1.dispose();
        }
    }
    showList = (sessionId, eventId, index) => {
        const { getListPaymentSession } = this.props;
        console.log(this.state.sessionId, this.state.eventId);
        let dataSent = {};
        dataSent.sessionId = sessionId;
        dataSent.eventId = eventId;
        dataSent.pageNumber = index;
        console.log(dataSent);
        getListPaymentSession(dataSent);
    }
    showModal = (columns, item, total) => {
        this.showList(item.id, columns._id, 1);
        this.setState({
            visible: true,
            events: columns,
            session: item,
            totalSession: total,
            isfirst: true,

        });

    };
    onLoadMore = () => {
        const { listPaySession } = this.props
        const { events,
            session } = this.state
        let index = Math.round(listPaySession.length / 10) + 1;
        this.showList(session.id, events._id, index);

    };

    handleCancel = e => {
        const { listPaySession } = this.props
        this.setState({
            visible: false,
        });

    }

    render() {
        console.log(this.props.statisticsData);
        const { listPaySession, pendPaySession, issucess } = this.props
        const { session, totalSession } = this.state;

        return (
            <div className=" p-5 mt-5">
                <h5 style={{ color: 'red', float: 'right' }}>Total:  {this.state.total && formatter.format(this.state.total.SumAmount)}</h5>
                {this.props.pending ? (
                    <Spin
                        tip="Loading..."
                        size="large"
                        style={{
                            position: 'absolute',
                            paddingBottom: '5%',
                        }}
                    >
                        {' '}
                    </Spin>
                ) : (
                        <div className="mt-5 ">
                            <div className=" border">
                                <div id="chartdiv1" style={{ width: "100%", height: "250px", marginTop: "50px" }}></div>
                            </div>
                            <div className="pt-5 border">
                                <Table rowKey="_id"
                                    columns={columns}
                                    expandable={{
                                        expandedRowRender: record => record.sessionId && record.sessionId.map((item, index) =>
                                            <p className="ml-5 " key={index} style={{ margin: 0 }}>{item.name} - {record.amountSession &&
                                                <span>{formatter.format(record.amountSession[index].total)}</span>}
                                                <DoubleRightOutlined style={{ fontSize: '17px' }} onClick={() => this.showModal(record, item, record.amountSession[index].total)} /> </p>),
                                        rowExpandable: record => record.name !== 'Not Expandable',
                                    }}
                                    dataSource={this.state.statisticsData}
                                />

                            </div>
                        </div>)}

                <div>
                    <Modal
                        title="Basic Modal"
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button type="dashed" onClick={this.handleCancel}>close</Button>
                        ]}
                        width={700}
                    >

                        <div>
                            <div className="row">
                                <div className="col d-flex"><h6>Name:</h6>
                                    <h6 className="ml-3 ">{session.name}</h6></div>
                                <div className="col">
                                    <h5 style={{ color: 'red', float: 'right' }}>Total:  {totalSession && formatter.format(totalSession)}</h5>
                                </div>
                            </div>

                            {pendPaySession ?
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
                                :
                                <div>
                                    <p
                                        type="button"
                                        className="fa-fw w3-margin-right w3-text-teal"
                                        style={{ width: '100px' }}

                                        onClick={() => this.onLoadMore()}
                                    >
                                        Load more <i className="fa fa-arrow-down" aria-hidden="true"></i>
                                    </p>

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

                                    </Table>
                                </div>

                            }
                        </div>


                    </Modal>

                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    errMessage: state.user.errMessage,
    statisticsData: state.user.statisticsData,
    pending: state.user.pending,
    listPaySession: state.user.listPaySession,
    pendPaySession: state.user.pendPaySession,
    issucess: state.user.issucess,
});

const mapDispatchToProps = (dispatch) => ({
    getStatistics: (startDate, endDate, eventId) =>
        dispatch(userActions.getStatistics(startDate, endDate, eventId)),
    getListPaymentSession: (dataSent) =>
        dispatch(userActions.getListPaymentSession(dataSent)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);


