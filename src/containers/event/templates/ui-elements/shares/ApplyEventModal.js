import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, message, Drawer } from 'antd';
import moment from 'moment';
import { applyEventActions } from 'action/applyEvent';
import TransferType from 'containers/user/BankAccount/TransferType';

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

  success = (isApplied) => {
    message.success(`${isApplied ? 'Apply' : 'Cancel'} session successfully`);
  };

  handleSuccess = (type, ssId) => {
    this.success(type);
    this.changeStatusSS(ssId, type);
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

  changeStatusSS = (idSession, status) => {
    let { session } = this.state;
    let index = session.findIndex((ss) => ss.id === idSession);

    if (index !== -1) {
      session[index].status = status ? 'JOINED' : 'CANCEL';
      session[index].pending = false;
      this.setState({ session });
    }
  };

  handleCloseDrawer = () => {
    this.setState({
      openDrawer: false,
    });
  };

  handleClick = (ssId) => {
    const { handleApply, handleCancel, id } = this.props;
    const temp = [];
    temp.push(ssId);

    if (this.isApplied(ssId)) {
      this.changeLoadingSS(ssId);

      handleCancel(id, temp)
        .then((res) => {
          this.handleSuccess(0, ssId);
        })
        .catch((err) => {
          this.handleFailure(ssId, err);
        });
    } else {
      const { ticket } = this.props;
      if (ticket.price !== 0) {
        this.setState({
          openDrawer: true,
          currSsId: ssId,
        });
      } else {
        this.changeLoadingSS(ssId);

        handleApply(id, temp)
          .then((res) => {
            this.handleSuccess(1, ssId);
          })
          .catch((err) => {
            this.handleFailure(ssId, err);
          });
      }
    }
  };

  handleCancelSS = (ssId) => {
    const { id, handleCancel } = this.props;
    let temp = [];
    temp.push(ssId);

    handleCancel(id, temp)
      .then((res) => {
        console.log('here');
        this.setState({
          canceled: true,
        });
        message.success('Cancel success');
      })
      .catch((err) => {
        this.handleFailure(ssId, err);
      });
  };

  handleRePay = (ssId) => {
    const { session } = this.state;
    const { id, handleRePay } = this.props;
    const index = session.findIndex((ss) => ss.id === ssId);
    if (index !== -1) {
      console.log(session[index]);
      let temp = [];
      temp.push(ssId);
      handleRePay(id, session[index].paymentId.payType, temp, (err, type) => {
        if (type === 1) {
          message.success('RePay success');
          this.changeStatusSS(ssId, 1);
        } else {
          if (err.response) {
            const { data } = err.response;
            message.error(data.error.message);
          } else message.error('RePay fail !');
        }
      });
    }
  };

  render() {
    const { session, openDrawer, currSsId, canceled } = this.state;
    const { ticket, id } = this.props;
    return (
      <div>
        {session.map((ss) => (
          <div key={ss.id} className="d-flex justify-content-around">
            <p>
              {moment(ss.day).format('LLL')} - {ss.name}
            </p>
            {ss.paymentId ? (
              ss.paymentId.status === 'WAITING' ||
              ss.paymentId.status === 'FAILED' ? (
                canceled ? (
                  <Button
                    onClick={() => this.handleClick(ss.id)}
                    loading={ss.pending}
                    disabled={ss.isCancel}
                    type="primary"
                  >
                    Register
                  </Button>
                ) : (
                  <div className="d-flex">
                    <Button
                      onClick={() => this.handleRePay(ss.id)}
                      type="primary"
                      className="mr-2"
                      disabled={ss.isCancel}
                    >
                      RePay
                    </Button>

                    <Button
                      onClick={() => this.handleCancelSS(ss.id)}
                      loading={ss.pending}
                      disabled={ss.isCancel}
                      type="danger"
                    >
                      Cancel
                    </Button>
                  </div>
                )
              ) : (
                <Button
                  onClick={() => this.handleClick(ss.id)}
                  loading={ss.pending}
                  disabled={ss.isCancel}
                  type={this.isApplied(ss.id) ? 'danger' : 'primary'}
                >
                  {this.isApplied(ss.id) ? 'Cancel' : 'Register'}
                </Button>
              )
            ) : (
              <Button
                onClick={() => this.handleClick(ss.id)}
                loading={ss.pending}
                disabled={ss.isCancel}
                type={this.isApplied(ss.id) ? 'danger' : 'primary'}
              >
                {this.isApplied(ss.id) ? 'Cancel' : 'Register'}
              </Button>
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
            changeStatus={() => this.changeStatusSS(currSsId, 1)}
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
});

const mapDispatchToProps = (dispatch) => ({
  handleApply: (eventId, sessionIds) =>
    dispatch(applyEventActions.applyEvent(eventId, sessionIds)),
  handleCancel: (eventId, sessionIds) =>
    dispatch(applyEventActions.cancelEvent(eventId, sessionIds)),

  handleRePay: (eventId, payType, sessionIds, cb) =>
    dispatch(applyEventActions.handleRePay(eventId, payType, sessionIds, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplyEventModal);
