import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Collapse } from 'antd';

import What from '../EventInfor/WhatTabPane';
import When from '../EventInfor/WhenTabPane';
import Which from '../EventInfor/WhichTabPane';

const { Panel } = Collapse;

class EditGeneral extends Component {
  constructor(props) {
    let urlWeb = localStorage.getItem('webAddress');

    super(props);
    this.state = {
      nameEvent: props.nameEvent,
      typeOfEvent: 'Public',
      category: '',
      session: props.session,
      isSellTicket: props.isSellTicket,
      webAddress: urlWeb,
      isFirstLoad: true,
      banner: props.banner,
      joinUser: [],
      txtCause: ' ',
      visible: false,
      joinEvent: [],
      background: '',
      backReject: '',
      backDelete: '',
      ticket: {
        price: 0,
        discount: 0,
      },
    };
  }
  render() {
    const { categories } = this.props;
    const {
      nameEvent,
      webAddress,
      banner,
      isSellTicket,
      ticket,
      typeOfEvent,
    } = this.state;

    return (
      <div>
        <Collapse defaultActiveKey="1">
          <Panel header="Basic information" key="1">
            <What
              nameEvent={nameEvent}
              webAddress={webAddress}
              categories={categories}
              onChange={this.onChange}
            />
          </Panel>
          <Panel header="More information" key="2">
            <Which
              isSellTicket={isSellTicket}
              ticket={ticket}
              onChange={this.onChange}
              typeOfEvent={typeOfEvent}
              banner={banner}
            />
          </Panel>

          <Panel header="Session information" key="3">
            <When onChange={this.onChange} />
          </Panel>
        </Collapse>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.event.categories,
  pending: state.event.pending,
  errMessage: state.event.errMessage,
  userJoinEvent: state.event.userJoinEvent,
  banner: state.event.banner,
  nameEvent: state.event.nameEvent,
  isSellTicket: state.event.isSellTicket,
  ticket: state.event.ticket,
  session: state.event.session,
});

export default connect(mapStateToProps, null)(EditGeneral);
