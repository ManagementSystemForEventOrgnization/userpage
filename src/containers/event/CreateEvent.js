import React from 'react';
import { connect } from 'react-redux';

import DropContainer from '../event/templates/components/DropContainer';
import Header from '../share/_layout/Header';
import MenuBlockList from '../event/MenuBlockList';
import TrashDropContainer from '../event/templates/components/TrashDropContainer';

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

                <div className="mt-1">
                    <DropContainer />

                </div>
                <div className="col-1 float-right">
                    <div className="mt-5 mb-5">
                        <TrashDropContainer className="bg-secondary " />
                    </div>
                </div>

                <input type="checkbox" id="add-block" ></input>
                <label htmlFor="add-block" className="add-block d-flex justify-content-center">
                    <span>
                        <p className="add-block-button mt-3" onClick={this.handleShowMenuBlocks}>Add Block</p>
                    </span>
                </label>

                <div className="menu-block-list">
                    <MenuBlockList />
                </div>
            </div >

        )
    }
}

const mapStateToProps = state => ({
})

// const mapDispatchToProps = (dispatch) => ({

// });


export default connect(mapStateToProps, null)(CreateEvent)
