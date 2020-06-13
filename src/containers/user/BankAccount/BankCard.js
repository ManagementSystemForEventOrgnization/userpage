import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { connect } from 'react-redux';
import { userActions } from '../../../action/user.action';

import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_pahNUQKG2WVBshWCDSeY5opJ00IFrwZjO3');

class BankCard extends Component {
  // constructor(props) {
  //   super(props)
  // }


  render() {
    console.log(this.props.getBankAccount);
    return (
      <div className="container mt-5 p-5 AppWrapper">
        <Elements stripe={stripePromise}   >
          <CheckoutForm />
        </Elements>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    // pending: state.user.pending,
    // success: state.user.success,
    // errMessage: state.user.errMessage,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getBankAccount: () => dispatch(userActions.getBankAccount()),
  addPaymentCard: (token) =>
    dispatch(userActions.addPaymentCard(token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BankCard);

