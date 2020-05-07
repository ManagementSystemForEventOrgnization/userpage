import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Button } from 'antd';
import { Link } from 'react-router-dom';

import {
  SettingTwoTone,
  HourglassTwoTone,
  EnvironmentTwoTone,
  InfoCircleTwoTone,
} from '@ant-design/icons';

import What from './WhatTabPane';
import Where from './WhereTabPane';
import Which from './WhichTabPane';
import When from './WhenTabPane';
import { eventActions } from '../../../action/event.action';

const { TabPane } = Tabs;
class EventInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameEvent: '',
      typeOfEvent: '',
      category: '',
      quantity: 100,
      address: '',
      locationName: '',
      time: {},
      isSellTicket: 'No',
      webAddress: '',
      isFirstLoad: true,
    };
  }

  onChange = (type, value) => {
    this.setState({
      [type]: value,
      isFirstLoad: true,
    });
  };

  handleNext = () => {
    const {
      nameEvent,
      typeOfEvent,
      category,
      quantity,
      address,
      locationName,
      time,
      isSellTicket,
      webAddress,
      map,
    } = this.state;
    const { prepareForCreateEvent } = this.props;
    prepareForCreateEvent(
      nameEvent,
      typeOfEvent,
      category,
      quantity,
      address,
      locationName,
      map,
      time,
      isSellTicket,
      webAddress
    );
    this.setState({
      isFirstLoad: false,
    });
  };

  render() {
    const { pending, errMessage, categories } = this.props;
    const {
      nameEvent,
      quantity,
      locationName,
      isSellTicket,
      webAddress,
      category,
      time,
      typeOfEvent,
      isFirstLoad,
      map,
    } = this.state;

    const next =
      nameEvent &&
      quantity &&
      locationName &&
      webAddress &&
      category &&
      time &&
      typeOfEvent &&
      map;

    const errorStyle = {
      backgroundColor: '#e8b3b3',
      color: '#7d0200',
      borderRadius: '5px ',
      lineHeight: '35px',
      margin: '10px 100px',
      padding: '1px 20px',
    };

    return (
      <div>
        {errMessage && !isFirstLoad && (
          <div style={errorStyle}>{errMessage}</div>
        )}

        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <span className="p-5">
                <SettingTwoTone />
                What
              </span>
            }
            key="1"
          >
            <What
              nameEvent={nameEvent}
              webAddress={webAddress}
              categories={categories}
              onChange={this.onChange}
            />
          </TabPane>

          <TabPane
            tab={
              <span className="p-5">
                <InfoCircleTwoTone />
                Which
              </span>
            }
            key="2"
          >
            <Which
              quantity={quantity}
              isSellTicket={isSellTicket}
              onChange={this.onChange}
            />
          </TabPane>
          <TabPane
            tab={
              <span className="p-5">
                <HourglassTwoTone />
                When
              </span>
            }
            key="3"
          >
            <When onChange={this.onChange} />
          </TabPane>

          <TabPane
            tab={
              <span className="p-5">
                <EnvironmentTwoTone />
                Where
              </span>
            }
            key="4"
          >
            <Where locationName={locationName} onChange={this.onChange} />
          </TabPane>
        </Tabs>
        <hr className="shadow border-bottom" />

        <div className="d-flex float-right">
          <Link to="/">
            <Button size="large" type="primary">
              Back to home
            </Button>
          </Link>

          <Button
            size="large"
            type="primary"
            className="ml-3"
            disabled={!next}
            loading={pending}
            onClick={this.handleNext}
          >
            Finish
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.event.categories,
  pending: state.event.pending,
  errMessage: state.event.errMessage,
});

const mapDispatchToProps = (dispatch) => ({
  prepareForCreateEvent: (
    nameEvent,
    typeOfEvent,
    category,
    quantity,
    address,
    locationName,
    map,
    time,
    isSellTicket,
    webAddress
  ) =>
    dispatch(
      eventActions.prepareForCreateEvent(
        nameEvent,
        typeOfEvent,
        category,
        quantity,
        address,
        locationName,
        map,
        time,
        isSellTicket,
        webAddress
      )
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventInfor);
