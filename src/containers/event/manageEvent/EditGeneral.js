import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Collapse, Spin } from 'antd';

import What from '../EventInfor/WhatTabPane';
import When from '../EventInfor/WhenTabPane';
import Which from '../EventInfor/WhichTabPane';

import { eventActions } from 'action/event.action';

const { Panel } = Collapse;

class EditGeneral extends Component {
  constructor(props) {
    const {
      nameEvent,
      typeOfEvent,
      category,
      session,
      isSellTicket,
      webAddress,
      banner,
      ticket,
    } = props;
    super(props);

    this.state = {
      nameEvent,
      typeOfEvent,
      category,
      session,
      isSellTicket,
      webAddress,
      banner,
      ticket,
      loading: true,
    };
  }

  componentDidMount = () => {
    const { getEventInfor } = this.props;
    const webAddress = localStorage.getItem('webAddress');
    getEventInfor(webAddress)
      .then((res) => {
        this.setState({
          loading: false,

          nameEvent: res.name,
          typeOfEvent: res.typeOfEvent,
          category: res.category,
          session: res.session,
          isSellTicket: res.isSellTicket,
          webAddress: res.urlWeb,
          banner: res.bannerUrl,
          ticket: res.ticket,
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          errorLoading: true,
        });
      });
  };

  onChange = (name, value) => {
    setTimeout(
      this.setState({
        [name]: value,
      }),
      2000
    );
  };

  render() {
    const { categories } = this.props;
    const {
      category,
      nameEvent,
      webAddress,
      banner,
      ticket,
      isSellTicket,
      typeOfEvent,
      session,
      loading,
    } = this.state;
    return (
      <div>
        {loading ? (
          <Spin tip="Loading ... ">
            <Collapse>
              <Panel header="Basic information" key="1"></Panel>
              <Panel header="More information" key="2"></Panel>

              <Panel header="Session information" key="3"></Panel>
            </Collapse>
          </Spin>
        ) : (
          <Collapse defaultActiveKey="1">
            <Panel header="Basic information" key="1">
              <What
                onChange={this.onChange}
                categories={categories}
                category={category}
                nameEvent={nameEvent}
                webAddress={webAddress}
              />
            </Panel>
            <Panel header="More information" key="2">
              <Which
                onChange={this.onChange}
                ticket={ticket}
                isSellTicket={isSellTicket}
                typeOfEvent={typeOfEvent}
                banner={banner}
              />
            </Panel>

            <Panel header="Session information" key="3">
              <When onChange={this.onChange} session={session} />
            </Panel>
          </Collapse>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.event.categories,
  pending: state.event.pending,
  errMessage: state.event.errMessage,
  banner: state.event.banner,
  nameEvent: state.event.nameEvent,
  isSellTicket: state.event.isSellTicket,
  ticket: state.event.ticket,
  session: state.event.session,
  category: state.event.category,
  webAddress: state.event.webAddress,
  typeOfEvent: state.event.typeOfEvent,
});

const mapDispatchToProps = (dispatch) => ({
  getEventInfor: (url) => dispatch(eventActions.getEventInfo(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditGeneral);
