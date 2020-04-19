import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd'

import DropContainer from '../event/templates/components/DropContainer';
import Header from '../share/_layout/Header';
import MenuBlockList from '../event/MenuBlockList';
import Test from '../event/MenuBlockList'
import dataTest from './templates/data/dataTest';
import TrashDropContainer from '../event/templates/components/TrashDropContainer';
// import MenuBlockList from '../event/MenuBlockList';


class CreateEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    handlePreview = () => {

    }


    render() {
        return (
            <div className=" create-event">
                <div className="fixed-top ">
                    <Header />

                </div>
                <MenuBlockList />
                <div className="d-flex flex-row-reverse">

                    <Button className="mr-5 ml-3" type="primary" size="large">Public</Button>

                    <Button type="dashed" size="large" onClick={this.handlePreview}>
                        <a href="/create/preview" target="_blank">
                            Preview
                        </a>
                    </Button>


                </div>


                <div className="mt-1 drop-area container mb-5">
                    <DropContainer />
                </div>


                <input type="checkbox" id="add-block" ></input>
                <label htmlFor="add-block" className="add-block d-flex justify-content-center">
                    <span>
                        <p className="add-block-button mt-3" onClick={this.handleShowMenuBlocks}>Add Block</p>
                    </span>
                </label>

                <div className="menu-block-list pt-3">
                    {
                        dataTest.map(item => <Test key={item.name} blockList={item} />)
                    }
                </div>
                <div>
                    <div className="bg-secondary float-right border border-danger rounded-circle ">
                        <TrashDropContainer />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
})

// const mapDispatchToProps = (dispatch) => ({

// });


export default connect(mapStateToProps, null)(CreateEvent)
