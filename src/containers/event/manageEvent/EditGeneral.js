import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Collapse } from 'antd';

import What from '../EventInfor/WhatTabPane';
import When from '../EventInfor/WhenTabPane';
import Which from '../EventInfor/WhichTabPane';

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
    };
  }

  render() {
    return (
      <div>
        <Collapse defaultActiveKey="1">
          <Panel header="Basic information" key="1">
            <What onChange={this.onChange} />
          </Panel>
          <Panel header="More information" key="2">
            <Which onChange={this.onChange} />
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
  banner: state.event.banner,
  nameEvent: state.event.nameEvent,
  isSellTicket: state.event.isSellTicket,
  ticket: state.event.ticket,
  session: state.event.session,
  category: state.event.category,
  webAddress: state.event.webAddress,
});

export default connect(mapStateToProps, null)(EditGeneral);
