import React from 'react';
import { connect } from 'react-redux';

import Header from '../share/_layout/Header';
import MenuBlockList from '../event/MenuBlockList';


class CreateEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameEvent: props.nameEvent,
            address: props.address,
            typeOfEvent: props.typeOfEvent,
            quantity: props.quantity,
            blocks: [
                {
                    value: props.nameEvent,
                    style: {},
                    key: 1,
                },
                {
                    value: props.address,
                    style: {},
                    key: 2,
                }
            ]
        }
    }

    handleShowMenuBlocks = () => {

    }

    componentDidMount = () => {

    }

    render() {
        const { nameEvent, address, typeOfEvent, quantity } = this.props;
        console.log(nameEvent, address, typeOfEvent, quantity)
        const posterStyle = {
            width: '100%',
            height: '60vh'
        }
        const addressStyle = {
            position: 'absolute',
            top: '40%',
            left: '10%',
        }
        const typeOfEventStyle = {
            position: 'absolute',
            top: '71%',
            right: '1%',
        }
        const nameEventStyle = {
            position: 'absolute',
            top: '27%',
            left: '10%',
            fontWeight: 'bolder'
        }
        const quantityStyle = {
            position: 'absolute',
        }

        return (
            <div className=" create-event">
                <div className="fixed-top ">
                    <Header />
                </div>

                <img style={posterStyle} alt="poster-event" src="/bg-2.jpg" />
                <h1 style={nameEventStyle}>{nameEvent}</h1>
                <h4 style={addressStyle}>{address}</h4>
                <h5 style={quantityStyle}>Số lượng : {quantity}</h5>
                <h6 style={typeOfEventStyle}>#{typeOfEvent}</h6>

                <input type="checkbox" id="add-block" ></input>
                <label htmlFor="add-block" className="add-block d-flex justify-content-center mt-4">
                    <span>
                        <p className="add-block-button" onClick={this.handleShowMenuBlocks}>Add Block</p>
                    </span>
                </label>

                <div className="menu-block-list">
                    <MenuBlockList />

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    nameEvent: state.event.nameEvent || 'Tên sự kiện demo',
    typeOfEvent: state.event.typeOfEvent || 'Loại sự kiện demo',
    address: state.event.address || 'Địa chỉ demo',
    quantity: state.event.quantity

})

// const mapDispatchToProps = (dispatch) => ({

// });


export default connect(mapStateToProps, null)(CreateEvent)
