import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, message, Drawer } from 'antd';
import moment from 'moment';
import { applyEventActions } from 'action/applyEvent';
import CreditCard from 'containers/user/BankAccount/CreditCard';

class ApplyEventModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedList: [],
      plainOptions: this.props.plainOptions,
      session: this.props.session,
      openDrawer: false,
      openChildDrawer: false,
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

  render() {
    const { session, openDrawer } = this.state;
    const { ticket } = this.props;
    return (
      <div>
        {session.map((ss) => (
          <div key={ss.id} className="d-flex justify-content-around">
            <p>
              {moment(ss.day).format('LLL')} - {ss.name}
            </p>
            <Button
              onClick={() => this.handleClick(ss.id)}
              loading={ss.pending}
              type={this.isApplied(ss.id) ? 'danger' : 'primary'}
            >
              {this.isApplied(ss.id) ? 'Cancel' : 'Register'}
            </Button>
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
          <p>You have to pay {ticket.price} VND</p>
          <hr />
          <CreditCard />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplyEventModal);
