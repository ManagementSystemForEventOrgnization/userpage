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
      handleApply,
      handleUpdateSessionStatus,
    } = this.props;

    if (currSsId) {
      const temp = [];
      temp.push(currSsId);

      handleApply(eventId, temp, 'ZALOPAY')
        .then((res) => {
          handleFinishPayment();
          window.open(res.orderurl, '_blank');
          handleUpdateSessionStatus();
        })
        .catch(handleUpdateSessionStatus());
    }
  };

  render() {
    const {
      currSsId,
      eventId,
      handleFinishPayment,
      handleUpdateSessionStatus,
    } = this.props;

    return this.state.creditCard ? (
      <CreditCard
        currSsId={currSsId}
        eventId={eventId}
        handleFinishPayment={handleFinishPayment}
        handleUpdateSessionStatus={handleUpdateSessionStatus}
        changeStatusType={() => this.setState({ creditCard: false })}
      />
    ) : (
        <div className="transfer_type " >
          <h3 className=" w3-text-teal text-center mt-5 mb-5">
            <u>
              <i className="fa fa-money" aria-hidden="true"></i> Select your
            transfer <i className="fa fa-money" aria-hidden="true"></i>
            </u>
          </h3>
          <div className="cards-list">
            <div className="card 1" onClick={this.onZaloPay}>
              <div className="card_image" style={{ width: '50%', height: '50%' }}>
                <img
                  src="http://agiletech.vn/wp-content/uploads/2019/06/agiletechvietnam-zalopay.png"
                  alt="zalo-pay"
                  style={{ width: '50%', height: '50%' }}
                />
              </div>
              <div className="card_title title-black">
                <p>Zalo Pay</p>
              </div>
            </div>

            <div
              className="card 2"
              onClick={() => this.setState({ creditCard: true })}
            >
              <div className="card_image" style={{ width: '50%', height: '50%' }}>
                <img
                  src="https://media2.giphy.com/media/H6iNB0pUucgYKR4KFV/giphy.gif"
                  alt="credit-card-type"
                  style={{ width: '50%', height: '50%' }}
                />
              </div>
              <div className="card_title title-black">
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
