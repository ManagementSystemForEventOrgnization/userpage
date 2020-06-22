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
      }

      this.setState({
        processing: false,
      });
    };

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
              {this.props.errMessage}
            </div>
          </div>
        )}
        <form className="Form bank-account" onSubmit={handleSubmit}>
          <h4 className="d-flex justify-content-center text-primary mb-5">
            Input Your Card Infor
          </h4>
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
