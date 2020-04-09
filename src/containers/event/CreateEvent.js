import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'

import Header from '../share/_layout/Header';
import MenuBlockList from '../event/MenuBlockList';


class CreateEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleShowMenuBlocks = () => {

    }

    render() {
        return (
            <div className=" create-event">
                <div className="fixed-top ">
                    <Header />
                </div>

                <img className="poster" alt="poster-event" src="/bg-2.jpg" />

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
    nameEvent: state.event.nameEvent,
    typeOfEvent: state.event.typeOfEvent,
    address: state.event.address,
    quantity: state.event.quantity

})

// const mapDispatchToProps = (dispatch) => ({

// });


export default connect(mapStateToProps, null)(CreateEvent)
