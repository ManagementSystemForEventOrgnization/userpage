import React from 'react';
import { ElementsConsumer, CardElement } from '@stripe/react-stripe-js';
import { connect } from 'react-redux';
import { userActions } from '../../../action/user.action';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#fff',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#fce883',
      },
      '::placeholder': {
        color: '#87bbfd',
      },
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#ffc7ee',
    },
  },
};

const CardField = ({ onChange }) => (
  <div className="FormRow bank-account">
    <CardElement options={CARD_OPTIONS} onChange={onChange} />
  </div>
);

const SubmitButton = ({ processing, error, children, disabled }) => (
  <button
    className={`SubmitButton ${
      error ? 'SubmitButton--error' : ''
    } bank-account`}
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? 'Processing...' : children}
  </button>
);

// const ErrorMessage = ({ children }) => (
//   <div className="ErrorMessage bank-account" role="alert">
//     <svg width="16" height="16" viewBox="0 0 17 17">
//       <path
//         fill="#FFF"
//         d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
//       />
//       <path
//         fill="#6772e5"
//         d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
//       />
//     </svg>
//     {children}
//   </div>
// );

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      cardComplete: false,
      processing: false,
      token: null,
    };
  }

  render() {
    const { stripe, elements } = this.props;

    const { error, cardComplete, processing, token } = { ...this.state };

    const handleSubmit = async (event) => {
      event.preventDefault();

      if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
      }

      if (cardComplete) {
        this.setState({
          processing: true,
        });
      }

      const card = elements.getElement(CardElement);

      const result = await stripe.createToken(card);

      if (result.error) {
        this.setState({
          error: result.error.message,
        });
      } else {
        this.setState({
          error: null,
          token: result.token.id,
        });
        const { addPaymentCard } = this.props.props;
        addPaymentCard(this.state.token);

        // console.log(this.props.props)
      }

      this.setState({
        processing: false,
      });
    };

    console.log(this.props);

    return (
      <div>
        {token && this.props.props.success ? (
          <div className="Result bank-account">
            <div className="ResultTitle" role="alert">
              Saving successfully
            </div>
            <div className="ResultMessage">
              Thank for saving your card. It will be faster for you to access
              payment
            </div>
          </div>
        ) : (
          <div className="Result bank-account">
            <div className="ResultTitle" role="alert">
              {this.props.props.errMessage}
            </div>
          </div>
        )}
        <form className="Form bank-account" onSubmit={handleSubmit}>
          <h2 className="d-flex justify-content-center text-primary mb-5">
            Input Your Card Infor
          </h2>
          <fieldset className="FormGroup">
            <CardField
              onChange={(e) => {
                this.setState({
                  error: e.error,
                  cardComplete: e.complete,
                });
              }}
            />
          </fieldset>
          {error && (
            <div className="Result bank-account">
              <div className="ResultTitle" role="alert">
                {error.message}
              </div>
            </div>
          )}
          <SubmitButton
            processing={processing}
            error={error}
            disabled={!stripe}
          >
            Save card
          </SubmitButton>
        </form>
      </div>
    );
  }
}

class InjectedCheckoutForm extends React.Component {
  render() {
    return (
      <ElementsConsumer>
        {({ stripe, elements }) => (
          <CheckoutForm
            stripe={stripe}
            elements={elements}
            props={this.props}
          />
        )}
      </ElementsConsumer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pending: state.user.pending,
    success: state.user.success,
    errMessage: state.user.errMessage,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addPaymentCard: (token) => dispatch(userActions.addPaymentCard(token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InjectedCheckoutForm);
