import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_pahNUQKG2WVBshWCDSeY5opJ00IFrwZjO3');

export default class BankCard extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    console.log(this.props);
    return (
      <div className="container mt-5 p-5 AppWrapper">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    );
  }
}
