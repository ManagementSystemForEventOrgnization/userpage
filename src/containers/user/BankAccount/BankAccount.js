import React, { Component } from 'react'
import CheckoutForm from './CardSection'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
    },
  ],
};

export default class BankAccount extends Component {
  render() {
    const stripe = loadStripe("pk_test_pahNUQKG2WVBshWCDSeY5opJ00IFrwZjO3");

    return (
      <div className="AppWrapper">
        <Elements stripe={stripe} options={ELEMENTS_OPTIONS}>
          <CheckoutForm />
        </Elements>
      </div>
    )
  }
}
