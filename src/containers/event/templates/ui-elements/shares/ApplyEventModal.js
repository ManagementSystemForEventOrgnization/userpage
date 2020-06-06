import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import moment from 'moment';
import { applyEventAction } from 'action/applyEvent';

class ApplyEventModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedList: [],
      plainOptions: this.props.plainOptions,
      session: this.props.session,
    };
  }

  isApplied = (idSession) => {
    const { session } = this.state;
    const index = session.findIndex((item) => item._id === idSession);
    return session[index].status && session[index].status === 'JOINED' ? 1 : 0;
  };

  changeLoadingSS = (idSession) => {
    let { session } = this.state;
    let index = session.findIndex((ss) => ss._id === idSession);

    if (index !== -1) {
      session[index].pending = !session[index].pending;
      this.setState({ session });
    }
  };

  changeStatusSS = (idSession, status) => {
    let { session } = this.state;
    let index = session.findIndex((ss) => ss._id === idSession);

    if (index !== -1) {
      session[index].status = status ? 'JOINED' : 'CANCEL';
      session[index].pending = false;
      this.setState({ session });
    }
  };

  handleClick = (ssId) => {
    const { handleApply, handleCancel, id } = this.props;
    const temp = [];
    temp.push(ssId);

    if (this.isApplied(ssId)) {
      this.changeLoadingSS(ssId);
      handleCancel(id, temp)
        .then((res) => {
          this.changeStatusSS(ssId, 0);
        })
        .catch((err) => {
          this.changeLoadingSS(ssId);
        });
    } else {
      this.changeLoadingSS(ssId);
      handleApply(id, temp)
        .then((res) => this.changeStatusSS(ssId, 1))
        .catch((err) => this.changeLoadingSS(ssId));
    }
  };

  render() {
    const { session } = this.state;
    return (
      <div>
        {session.map((ss) => (
          <div key={ss._id} className="d-flex justify-content-around">
            <p>
              {moment(ss.day).format('LLL')} - {ss.name}
            </p>
            <Button
              onClick={() => this.handleClick(ss._id)}
              loading={ss.pending}
              type={this.isApplied(ss._id) ? 'danger' : 'primary'}
            >
              {this.isApplied(ss._id) ? 'Cancel' : 'Register'}
            </Button>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  session: state.event.session,
  id: state.event.id,
});

const mapDispatchToProps = (dispatch) => ({
  handleApply: (eventId, sessionIds) =>
    dispatch(applyEventAction.applyEvent(eventId, sessionIds)),
  handleCancel: (eventId, sessionIds) =>
    dispatch(applyEventAction.cancelEvent(eventId, sessionIds)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplyEventModal);
