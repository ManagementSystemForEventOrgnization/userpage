
import React from 'react'
import CreditCard from './CreditCard'
export default class TransferType extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            creditCard: false,
        }
    }

    render() {
        const onZaloPay = () => {
            console.log("zalo pay");
        }

        return this.state.creditCard ?
            <CreditCard /> :
            (
                <div className="transfer_type">
                    <h3 className=" w3-text-teal text-center mt-5 mb-5"><u><i class="fa fa-money" aria-hidden="true"></i> Select your transfer <i class="fa fa-money" aria-hidden="true"></i></u></h3>
                    <div class="cards-list">
                        <div class="card 1" onClick={onZaloPay}>
                            <div class="card_image"> <img src="http://agiletech.vn/wp-content/uploads/2019/06/agiletechvietnam-zalopay.png" /> </div>
                            <div class="card_title title-black">
                                <p>Yalo Pay</p>
                            </div>
                        </div>

                        <div class="card 2" onClick={() => this.setState({ creditCard: true })}>
                            <div class="card_image">
                                <img src="https://media2.giphy.com/media/H6iNB0pUucgYKR4KFV/giphy.gif" />
                            </div>
                            <div class="card_title title-black">
                                <p>Credit Card</p>
                            </div>
                        </div>

                    </div>
                </div>
            )
    }
}
