import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, message, Drawer } from 'antd';
import moment from 'moment';
import { applyEventActions } from 'action/applyEvent';
import TransferType from 'containers/user/BankAccount/TransferType';
import { eventActions } from 'action/event.action';

class ApplyEventModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedList: [],
      plainOptions: this.props.plainOptions,
      session: this.props.session,
      openDrawer: false,
      openChildDrawer: false,
      currSsId: '',
      canceled: false,
    };
  }

  isApplied = (idSession) => {
    const { session } = this.state;
    const index = session.findIndex((item) => item.id === idSession);
    return session[index].status && session[index].status === 'JOINED' ? 1 : 0;
  };

  warning = (msg) => {
    message.warning(msg || 'OPPs! Something is wrong');
  };

  success = (type) => {
    message.success(`${!type ? 'Apply' : 'Cancel'} session successfully`);
  };

  handleFailure = (ssId, err) => {
    if (err.response) {
      const { data } = err.response;
      this.warning(data.error.message);
    } else this.warning();
    this.changeLoadingSS(ssId);
  };

  changeLoadingSS = (idSession) => {
    let { session } = this.state;
    let index = session.findIndex((ss) => ss.id === idSession);

    if (index !== -1) {
      session[index].pending = !session[index].pending;
      this.setState({ session });
    }
  };

  handleCloseDrawer = () => {
    const { session } = this.state;
    this.setState({
      openDrawer: false,
      session: session.map((ss) => ({ ...ss, pending: false })),
    });
  };

  handleUpdateSessionStatus = () => {
    const { handleGetEventInfo, id } = this.props;
    handleGetEventInfo(id, (eventInfo) => {
      if (!eventInfo) {
      } else {
        this.setState({
          session: eventInfo.session.map((item) => ({
            ...item,
            pending: false,
            status: item.status || 'error',
          })),
        });
      }
    });
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.session !== this.props.session) {
      this.setState({
        session: this.props.session.map((ss) => ({ ...ss, pending: false })),
      });
    }
  };
  handleClick = (ssId, type) => {
    const { id, handleCancel, handleRePay, handleApply } = this.props;
    const { session } = this.state;
    const index = session.findIndex((ss) => ss.id === ssId);

    let temp = [];
    temp.push(ssId);

    this.changeLoadingSS(ssId);

    if (type === 'APPLY') {
      const { isSellTicket } = this.props;

      if (isSellTicket === 'Yes' || isSellTicket === true) {
        this.setState({
          openDrawer: true,
          currSsId: ssId,
        });
      } else {
        handleApply(id, temp)
          .then((res) => {
            this.handleUpdateSessionStatus();
            this.success(0);
          })
          .catch((err) => {
            this.handleFailure(ssId, err);
          });
      }
    } else if (type === 'CANCEL') {
      handleCancel(id, temp)
        .then((res) => {
          this.handleUpdateSessionStatus();
          this.success(1);
        })
        .catch((err) => {
          this.handleFailure(ssId, err);
        });
    } else {
      handleRePay(id, session[index].paymentId.payType, temp, (res, type) => {
        if (type === 1) {
          window.open(res.orderurl, '_blank');
          this.handleUpdateSessionStatus();
        } else {
          if (res.response) {
            const { data } = res.response;
            message.error(data.error.message);
          } else message.error('RePay fail !');
        }
      });
    }
  };

  render() {
    const { session, openDrawer, currSsId } = this.state;
    const { ticket, id, isSellTicket } = this.props;
    return (
      <div>
        {session.map((ss) => (
          <div key={ss.id} className="d-flex justify-content-around">
            <p>
              {moment(ss.day).format('LLL')} - {ss.name}
            </p>
            {!ss.paymentId ? (
              ss.status === 'JOINED' ? (
                <Button
                  type="primary"
                  className="mt-2"
                  disabled={ss.isCancel}
                  loading={ss.pending}
                  onClick={() => this.handleClick(ss.id, 'CANCEL')}
                >
                  Cancel Session
                </Button>
              ) : (
                <Button
                  type="primary"
                  className="mt-2"
                  disabled={ss.isCancel}
                  loading={ss.pending}
                  onClick={() => this.handleClick(ss.id, 'APPLY')}
                >
                  {!isSellTicket || isSellTicket === 'No'
                    ? 'Register free'
                    : 'Buy Ticket '}
                </Button>
              )
            ) : ss.paymentId.status === 'PAID' ? (
              <Button
                type="primary"
                className="mt-2"
                loading={ss.pending}
                disabled={ss.isCancel}
                onClick={() => this.handleClick(ss.id, 'CANCEL')}
              >
                Cancel this session
              </Button>
            ) : (
              <div className="d-flex">
                <Button
                  onClick={() => this.handleClick(ss.id, 'REPAY')}
                  type="primary"
                  className="mr-2"
                  disabled={ss.isCancel}
                >
                  RePay
                </Button>

                <Button
                  onClick={() => this.handleClick(ss.id, 'CANCEL')}
                  disabled={ss.isCancel}
                  type="danger"
                  loading={ss.pending}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        ))}

        <Drawer
          title="Payment transaction"
          width={780}
          closable={false}
          onClose={this.handleCloseDrawer}
          visible={openDrawer}
        >
          <h6>Let's complete some last steps.</h6>
          <p>
            You have to pay{' '}
            <b
              style={{
                fontSize: '17px',
                color: 'blue',
                fontWeight: 'bolder',
                textShadow: '0 0 3px #fb2020',
              }}
            >
              {ticket.price - ticket.price * ticket.discount}
            </b>{' '}
            VND
          </p>
          <hr></hr>

          <TransferType
            currSsId={currSsId}
            eventId={id}
            handleFinishPayment={this.handleCloseDrawer}
            handleUpdateSessionStatus={this.handleUpdateSessionStatus}
          />
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  session: state.event.session,
  id: state.event.id,
  ticket: state.event.ticket,
  isSellTicket: state.event.isSellTicket,
});

const mapDispatchToProps = (dispatch) => ({
  handleApply: (eventId, sessionIds) =>
    dispatch(applyEventActions.applyEvent(eventId, sessionIds)),
  handleCancel: (eventId, sessionIds) =>
    dispatch(applyEventActions.cancelEvent(eventId, sessionIds)),

  handleRePay: (eventId, payType, sessionIds, cb) =>
    dispatch(applyEventActions.handleRePay(eventId, payType, sessionIds, cb)),

  handleGetEventInfo: (eventId, cb) =>
    dispatch(eventActions.getEventInfoUsingID(eventId, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplyEventModal);
