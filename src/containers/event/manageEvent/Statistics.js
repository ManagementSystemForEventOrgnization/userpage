
import React, { Component } from 'react'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dataviz from "@amcharts/amcharts4/themes/dataviz";
import { userActions } from 'action/user.action';
import { connect } from 'react-redux';
import { Table, Spin, Tabs, Radio, DatePicker } from 'antd';
import moment from 'moment';


const { RangePicker } = DatePicker;

am4core.useTheme(am4themes_animated);

const { TabPane } = Tabs;

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
});
const columns = [
    {
        title: 'Event', dataIndex: 'bannerUrl', key: '_id' + 'bannerUrl',
        render: (bannerUrl) => <img style={{ width: '120px' }} src={bannerUrl}></img>
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
    {
        title: 'Link web', dataIndex: 'urlWeb', key: '_id' + 'urlWeb',
        render: (urlWeb) => <a href={process.env.REACT_APP_DOMAIN_EVENT_DEPLOY + urlWeb}>go to web  </a>
    },
];

class Statistics extends Component {
    constructor(props) {
        super(props)
        this.state = {
            statisticsData: [],
            total: { totalSession: 0 },
            isEmpty: false,
            chartType: 0
        }
    }

    componentWillUnmount() {
        if (this.chart1) {
            this.chart1.dispose();
        }
    }

    statistic(value = this.state.statisticsData, type = this.state.chartType) {

        if (value === undefined || value.length == 0) {
            value = [{ name: "there is no record", totalSession: "0" }]
            this.setState({ isEmpty: true })
        }
        else
            this.setState({ isEmpty: false })

        if (type === 0) {
            let chart1 = am4core.create("chartdiv", am4charts.PieChart);

            let series1 = chart1.series.push(new am4charts.PieSeries());
            series1.dataFields.value = "totalSession";
            series1.dataFields.category = "name";

            chart1.data = value

            chart1.legend = new am4charts.Legend();
        }
        else {
            am4core.useTheme(am4themes_animated);
            am4core.useTheme(am4themes_dataviz);

            var chart = am4core.create("chartdiv", am4charts.XYChart);

            chart.data = value

            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "name";
            categoryAxis.title.text = "Your event(s)";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 10;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.title.text = "Expenditure (M)";

            // Create series
            var series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueY = "totalSession";
            series.dataFields.categoryX = "name";
            series.name = "total amount";
            series.tooltipText = "{name}: [bold]{valueY}[/] VND";
            series.stacked = true;

            chart.cursor = new am4charts.XYCursor();
        }


        var sum = value !== [] && value.reduce(function (previousValue, currentValue) {
            return { totalSession: previousValue.totalSession + currentValue.totalSession }
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

    onChangeDates = (dates) => {


        this.props.getStatistics(dates ? moment(dates[0]._d).format('YYYY-MM-DD') : '', dates ? moment(dates[1]._d).format('YYYY-MM-DD') : '').then(() => {
            this.setState({ statisticsData: this.props.statisticsData })
            this.statistic()
        })
    }

    render() {
        const onChangeChartType = e => {
            this.setState({
                chartType: e.target.value,
            });
            this.statistic(this.state.statisticsData, e.target.value)

        };
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
            <div className=" p-5 mt-5" >
                <div> <b>Choose your date:</b></div>
                <RangePicker
                    style={{ width: '50%', height: '40px' }}
                    format="YYYY-MM-DD "
                    onChange={this.onChangeDates}
                />
                <h5 style={{ color: 'red', float: 'right' }}>Total:  {this.state.total && formatter.format(this.state.total.totalSession)}</h5>
                <Tabs defaultActiveKey="1" onChange={(key) => this.onChangeStatistics(key)} className="mt-5">
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
                        <div className="mt-5">
                            <div >
                                <Radio.Group onChange={onChangeChartType} value={this.state.chartType}>
                                    <Radio value={0}>Pie Chart</Radio>
                                    <Radio value={1}>Column Chart</Radio>
                                </Radio.Group>
                                <div id="chartdiv" style={{ width: "100%", height: "500px", marginTop: "50px" }}></div>
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


