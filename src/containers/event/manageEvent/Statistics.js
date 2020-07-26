
import React, { Component } from 'react'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { userActions } from 'action/user.action';
import { connect } from 'react-redux';
import { Table, Spin, Tabs } from 'antd';

am4core.useTheme(am4themes_animated);

const { TabPane } = Tabs;

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
        render: (totalSession) => <p>{formatter.format(totalSession)}</p>
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
            isEmpty: false
        }
    }
    componentDidMount() {
        this.props.getStatistics("2020-04-26", "2020-07-26").then(() => {
            this.setState({ statisticsData: this.props.statisticsData })
            this.statistic()
        })

    }

    componentWillUnmount() {
        if (this.chart1) {
            this.chart1.dispose();
        }
    }

    statistic(value = this.state.statisticsData) {
        if (value === undefined || value.length == 0) {
            value = [{ name: "there is no data", SumAmount: "100%" }]
            this.setState({ isEmpty: true })
        }
        else
            this.setState({ isEmpty: false })

        let chart1 = am4core.create("chartdiv1", am4charts.PieChart);

        let series1 = chart1.series.push(new am4charts.PieSeries());
        series1.dataFields.value = "SumAmount";
        series1.dataFields.category = "name";

        // Add data
        chart1.data = value

        chart1.legend = new am4charts.Legend();

        var sum = value !== [] && value.reduce(function (previousValue, currentValue) {
            return { SumAmount: previousValue.SumAmount + currentValue.SumAmount }
        });

        this.setState({
            total: sum
        })
    }

    onChangeStatistics(key) {
        let value = this.props.statisticsData;
    
        if (key == 2) {
            value = this.props.statisticsData.filter(item => item.paymentId != undefined)
        }
        if (key == 3) {
            value = this.props.statisticsData.filter(item => item.paymentId == undefined)
        }
        this.setState({ statisticsData: value })
        this.statistic(value)
    }


    render() {
        const tableData = (dataResource) => <div className="pt-5 border">
            <Table rowKey="_id"
                columns={columns}
                expandable={{
                    expandedRowRender: record => record.sessionId && record.sessionId.map((item, index) => <p className="ml-5 " key={index} style={{ margin: 0 }}>{item.name} - {record.amountSession && <span>{formatter.format(record.amountSession[index].total)}</span>} </p>),
                    rowExpandable: record => record.name !== 'Not Expandable',
                }}
                dataSource={dataResource}
            />
        </div>
        return (
            <div className=" p-5 mt-5">
                <h5 style={{ color: 'red', float: 'right' }}>Total:  {this.state.total && formatter.format(this.state.total.SumAmount === "100%" ? "0" : this.state.total.SumAmount)}</h5>
                <Tabs defaultActiveKey="1" onChange={(key) => this.onChangeStatistics(key)}>
                    <TabPane tab="Total Amount" key="1">
                        This is the sum of money you have sold your tickets
    </TabPane>
                    <TabPane tab="Received" key="2">
                        This is the sum of money you have got from admin
    </TabPane>
                    <TabPane tab="Waiting" key="3">
                        This is the sum of money you are still waiting from admin
    </TabPane>
                </Tabs>
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
                                <div id="chartdiv1" style={{ width: "100%", height: "500px", marginTop: "50px" }}></div>
                            </div>
                            {!this.state.isEmpty && tableData(this.state.statisticsData)}
                        </div>)}
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    errMessage: state.user.errMessage,
    statisticsData: state.user.statisticsData,
    pending: state.user.pending
});

const mapDispatchToProps = (dispatch) => ({
    getStatistics: (startDate, endDate, eventId) =>
        dispatch(userActions.getStatistics(startDate, endDate, eventId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);


