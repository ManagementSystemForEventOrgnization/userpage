
import React, { Component } from 'react'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { userActions } from 'action/user.action';
import { connect } from 'react-redux';
import { Table, Spin } from 'antd';

am4core.useTheme(am4themes_animated);

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
            total: { SumAmount: 0 }
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

    render() {
        console.log(this.props.statisticsData);
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
                                        expandedRowRender: record => record.sessionId && record.sessionId.map((item, index) => <p className="ml-5 " key={index} style={{ margin: 0 }}>{item.name} - {record.amountSession && <span>{formatter.format(record.amountSession[index].total)}</span>} </p>),
                                        rowExpandable: record => record.name !== 'Not Expandable',
                                    }}
                                    dataSource={this.state.statisticsData}
                                />

                            </div>
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


