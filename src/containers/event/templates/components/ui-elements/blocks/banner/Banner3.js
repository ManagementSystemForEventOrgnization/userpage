import React, { Component } from 'react'
import Image from '../../atoms/Image';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';

const title = "Wellcome!!! Edit tittle here.";

class Banner3 extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    handleClick = () => {
        console.log("click")
    }
    render() {
        return (
            <div className="banner-block-3 child-block" onClick={this.handleClick} >
                <div className="text">
                    <Text content={title} style={
                        {
                            fontWeight: 'bolder',
                            fontSize: 50,
                            textAlign: 'center'
                        }
                    }
                    />

                    <Button />
                </div>
                <div className="bg">
                    <Image />
                </div>
                {/* <img src="http://placekitten.com/1500/1000" /> */}
            </div>
        )
    }
}

export default Banner3
