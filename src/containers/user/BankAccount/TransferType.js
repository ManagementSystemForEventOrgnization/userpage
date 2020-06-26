import React from 'react';
import { connect } from 'react-redux';

import { applyEventActions } from 'action/applyEvent';
import CreditCard from './CreditCard';

class TransferType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      creditCard: false,
    };
  }

  onZaloPay = () => {
    const {
      eventId,
      currSsId,
      handleFinishPayment,
      //   changeStatus,
      handleApply,
    } = this.props;
    if (currSsId) {
      const temp = [];
      temp.push(currSsId);
      handleFinishPayment();

      handleApply(eventId, temp, 'ZALOPAY')
        .then((res) => {
          console.log(res);
          window.open(res.orderurl, '_blank');
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    const { currSsId, eventId, handleFinishPayment, changeStatus } = this.props;

    return this.state.creditCard ? (
      <CreditCard
        currSsId={currSsId}
        eventId={eventId}
        handleFinishPayment={handleFinishPayment}
        changeStatus={changeStatus}
        changeStatusType={() => this.setState({ creditCard: false })}
      />
    ) : (
      <div className="transfer_type">
        <h3 className=" w3-text-teal text-center mt-5 mb-5">
          <u>
            <i class="fa fa-money" aria-hidden="true"></i> Select your transfer{' '}
            <i class="fa fa-money" aria-hidden="true"></i>
          </u>
        </h3>
        <div class="cards-list">
          <div class="card 1" onClick={this.onZaloPay}>
            <div class="card_image">
              <img
                src="http://agiletech.vn/wp-content/uploads/2019/06/agiletechvietnam-zalopay.png"
                alt="zalo-pay"
              />
            </div>
            <div class="card_title title-black">
              <p>Zalo Pay</p>
            </div>
          </div>

          <div
            class="card 2"
            onClick={() => this.setState({ creditCard: true })}
          >
            <div class="card_image">
              <img
                src="https://media2.giphy.com/media/H6iNB0pUucgYKR4KFV/giphy.gif"
                alt="credit-card-type"
              />
            </div>
            <div class="card_title title-black">
              <p>Credit Card</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleApply: (eventId, sessionIds, payType) =>
    dispatch(applyEventActions.applyEvent(eventId, sessionIds, payType)),
});

export default connect(null, mapDispatchToProps)(TransferType);
