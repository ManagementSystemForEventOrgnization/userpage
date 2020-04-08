import React from 'react';
import { connect } from 'react-redux';

import Header from '../share/_layout/Header';
import MenuBlockList from '../event/MenuBlockList';


class CreateEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className=" create-event">
                <div className="fixed-top ">
                    <Header />
                </div>

                <div className="d-flex create">
                    <div className=" ml-5 mr-3">
                        <MenuBlockList />
                    </div>
                    <div >
                        <img className="poster" alt="poster-event" src="/bg-2.jpg" />
                    </div>


                    {/* <img className="poster" alt="poster-event" src="/bg-2.jpg" /> */}

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
