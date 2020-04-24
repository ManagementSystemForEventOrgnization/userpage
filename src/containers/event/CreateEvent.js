import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd'

import DropContainer from './templates/components/DropContainer';
import Header from '../share/_layout/Header';
import MenuBlockList from '../event/MenuBlockList';

import TrashDropContainer from '../event/templates/components/TrashDropContainer';


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
