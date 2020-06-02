import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Button } from 'antd';
import { Link } from 'react-router-dom';

import {
  SettingTwoTone,
  HourglassTwoTone,
  InfoCircleTwoTone,
} from '@ant-design/icons';

import What from './WhatTabPane';
import Which from './WhichTabPane';
import When from './WhenTabPane';
import { eventActions } from '../../../action/event.action';

const { TabPane } = Tabs;
class EventInfor extends Component {
  constructor(props) {
    // get category
    super(props);
    this.state = {
      nameEvent: '',
      typeOfEvent: 'Public',
      category: '',
      session: [],
      isSellTicket: 'No',
      webAddress: '',
      isFirstLoad: true,
      banner: '/bg-2.jpg',
    };
  }

  onChange = (type, value) => {
    if (type === 'isSellTicket') {
      console.log(value);
    }
    this.setState({
      [type]: value,
      isFirstLoad: true,
    });
  };

  componentDidMount = () => {
    const { getCategories } = this.props;
    getCategories();
  };

  handleNext = () => {
    const {
      nameEvent,
      typeOfEvent,
      category,
      session,
      isSellTicket,
      webAddress,
      banner,
    } = this.state;
    const { prepareForCreateEvent } = this.props;

    console.log(isSellTicket);
    prepareForCreateEvent(
      nameEvent,
      typeOfEvent,
      category,
      session,
      isSellTicket,
      webAddress,
      banner
    );
    this.setState({
      isFirstLoad: false,
    });
  };

  isSessionValid = () => {
    const { session } = this.state;
    let isValid = true;
    if (session.length === 0) {
      return false;
    }

    for (let index in session) {
      if (Object.keys(session[index].address).length === 0) {
        return false;
      }
      if (!session[index].limitNumber) {
        return false;
      }
      if (session[index].documents.length !== 0) {
        isValid = session[index].documents.every((ele) => ele.title && ele.url);
      }

      if (session[index].detail.length !== 0) {
        isValid = session[index].detail.every((ele) => {
          return ele.from && ele.to && ele.description;
        });
      }
    }
    return isValid;
  };

  render() {
    const { pending, errMessage, categories } = this.props;
    const {
      nameEvent,
      isSellTicket,
      webAddress,
      category,
      typeOfEvent,
      isFirstLoad,
      banner,
    } = this.state;

    const next =
      nameEvent &&
      category &&
      webAddress &&
      typeOfEvent &&
      this.isSessionValid();

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
                <InfoCircleTwoTone />
                Which
              </span>
            }
            key="2"
          >
            <Which
              isSellTicket={isSellTicket}
              onChange={this.onChange}
              typeOfEvent={typeOfEvent}
              banner={banner}
            />
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
    session,
    isSellTicket,
    webAddress,
    banner
  ) =>
    dispatch(
      eventActions.prepareForCreateEvent(
        nameEvent,
        typeOfEvent,
        category,
        session,
        isSellTicket,
        webAddress,
        banner
      )
    ),

  getCategories: () => dispatch(eventActions.getCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventInfor);
