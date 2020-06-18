import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { connect } from 'react-redux';
import { userActions } from '../../../action/user.action';

import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_pahNUQKG2WVBshWCDSeY5opJ00IFrwZjO3');

class BankCard extends Component {

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

export default BankCard;

