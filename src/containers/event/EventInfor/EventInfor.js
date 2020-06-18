import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Button } from 'antd';
// import { Link } from 'react-router-dom';

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
const MAX_TAP_PANE = 3;
const MIN_TAP_PANE = 1;

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

      activeKey: '1',
      customMessage: '',
    };
  }

  onChange = (type, value) => {
    this.setState({
      [type]: value,
      isFirstLoad: true,
      customMessage: '',
    });
  };

  componentDidMount = () => {
    const { getCategories, categories } = this.props;
    if (categories.length === 0) {
      getCategories();
    }
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

  handleClickNextButton = () => {
    const {
      activeKey,
      nameEvent,
      category,
      webAddress,
      typeOfEvent,
      session,
      isSellTicket,
      banner,
    } = this.state;
    let currentKey = +activeKey;
    console.log(currentKey);
    if (currentKey === MAX_TAP_PANE) {
      const next =
        nameEvent &&
        category &&
        webAddress &&
        typeOfEvent &&
        this.isSessionValid();
      if (!next) {
        this.setState({
          customMessage: 'Fill out all required infomation, please.',
        });
      } else {
        const { prepareForCreateEvent } = this.props;

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
      }
    } else {
      currentKey++;
      this.setState({
        activeKey: `${currentKey}`,
      });
    }
  };

  handleClickBackButton = () => {
    const { activeKey } = this.state;
    let currentKey = +activeKey;
    if (currentKey === MIN_TAP_PANE) return;

    currentKey--;
    this.setState({
      activeKey: `${currentKey}`,
    });
  };

  render() {
    const { pending, errMessage, categories } = this.props;
    const {
      nameEvent,
      isSellTicket,
      webAddress,
      typeOfEvent,
      isFirstLoad,
      banner,
      activeKey,
      customMessage,
    } = this.state;

    const errorStyle = {
      backgroundColor: '#e8b3b3',
      color: '#7d0200',
      borderRadius: '5px ',
      lineHeight: '35px',
      margin: '10px 100px',
      padding: '1px 20px',
    };
    const buttonCustom = {
      width: '160px',
      fontSize: '20px',
      height: '45px',
    };

    return (
      <div className="pb-5">
        {(customMessage || (errMessage && !isFirstLoad)) && (
          <div style={errorStyle}>{errMessage || customMessage}</div>
        )}

        <Tabs activeKey={activeKey}>
          <TabPane
            tab={
              <span className="p-5">
                <SettingTwoTone />
                What
              </span>
            }
            key="1"
            onTabClick={() => {
              this.setState({ activeKey: '1' });
            }}
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
            key="2"
            onTabClick={() => {
              this.setState({ activeKey: '2' });
            }}
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
            key="3"
            onTabClick={() => {
              this.setState({ activeKey: '3' });
            }}
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

        <div className="d-flex justify-content-center ">
          <Button
            size="large"
            type="primary"
            className="mr-2"
            style={buttonCustom}
            onClick={this.handleClickBackButton}
          >
            Previous
          </Button>
          <Button
            size="large"
            type="primary"
            style={buttonCustom}
            loading={pending}
            onClick={this.handleClickNextButton}
          >
            Next
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
