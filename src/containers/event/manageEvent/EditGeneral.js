import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Collapse, Spin, Button } from 'antd';

import What from '../EventInfor/WhatTabPane';
import When from '../EventInfor/WhenTabPane';
import Which from '../EventInfor/WhichTabPane';

import { eventActions } from 'action/event.action';

const { Panel } = Collapse;
const errorStyle = {
  backgroundColor: '#e8b3b3',
  color: '#7d0200',
  borderRadius: '5px ',
  lineHeight: '35px',
  margin: '10px 100px',
  padding: '1px 20px',
};

const successStyle = {
  backgroundColor: ' rgb(179, 228, 239)',
  color: ' rgb(10, 29, 253)',
  borderRadius: '5px ',
  lineHeight: '35px',
  margin: '10px 100px',
  padding: '1px 20px',
};

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
      isFirstLoad: true,
      customMessage: '',
    };
  }

  componentDidMount = () => {
    const { getEventInfor, getCategories, categories } = this.props;
    const webAddress = localStorage.getItem('webAddress');

    if (categories.length === 0) {
      getCategories();
    }
    getEventInfor(webAddress)
      .then((res) => {
        this.setState({
          loading: false,

          nameEvent: res.name,
          typeOfEvent: res.typeOfEvent,
          category: res.category,
          session: res.session,
          isSellTicket: res.isSellTicket ? 'Yes' : 'No',
          webAddress: res.urlWeb,
          banner: res.bannerUrl,
          ticket: res.ticket,
          eventId: res._id,
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
        isFirstLoad: true,
        customMessage: '',
      }),
      2000
    );
  };

  handleCancel = () => {
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
          isFirstLoad: true,
          errMessage: '',
          eventId: res._id,
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          errorLoading: true,
        });
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

  handleSaveChanges = () => {
    const {
      nameEvent,
      typeOfEvent,
      category,
      session,
      isSellTicket,
      webAddress,
      banner,
      ticket,
      eventId,
    } = this.state;

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
      const { updateEventInfor } = this.props;
      updateEventInfor(
        eventId,
        nameEvent,
        typeOfEvent,
        category,
        session,
        isSellTicket,
        webAddress,
        banner,
        ticket,
        () => {
          this.setState({
            updateSuccess: true,
          });
        }
      );
      this.setState({
        isFirstLoad: false,
      });
    }
  };

  render() {
    const { categories, errMessage, pending } = this.props;
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
      customMessage,
      isFirstLoad,
      updateSuccess,
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
            {(customMessage || (errMessage && !isFirstLoad)) && (
              <div style={errorStyle}>{errMessage || customMessage}</div>
            )}

            {!isFirstLoad && updateSuccess && (
              <div style={successStyle}>Update changes success</div>
            )}

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

            <div className="d-flex mt-3 float-right">
              <Button
                className="mr-2"
                type="dashed"
                onClick={this.handleCancel}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                onClick={this.handleSaveChanges}
                loading={pending}
              >
                Save Changes
              </Button>
            </div>
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
  getCategories: () => dispatch(eventActions.getCategories()),
  updateEventInfor: (
    eventId,
    nameEvent,
    typeOfEvent,
    category,
    session,
    isSellTicket,
    webAddress,
    banner,
    ticket,
    cb
  ) =>
    dispatch(
      eventActions.updateEventInfo(
        eventId,
        nameEvent,
        typeOfEvent,
        category,
        session,
        isSellTicket,
        webAddress,
        banner,
        ticket,
        cb
      )
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditGeneral);
