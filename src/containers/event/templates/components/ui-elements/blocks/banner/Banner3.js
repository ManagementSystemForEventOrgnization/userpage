import React, { Component } from 'react'
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';

const title = "Wellcome!!! Edit tittle here.";

class Banner3 extends Component {
    constructor(props) {
        super(props)

        this.state = {
            height: 50,
            bg: '/bg-2.jpg'
        }
    }

    handleClick = () => {
        console.log("click")
    }
    render() {
        const { height, bg } = this.state;
        const style = {
            position: 'relative',
            background: 'none',
            overflow: 'hidden',
            padding: '10%',
            height: `${height}vh`
        }
        const styleText = {
            textAlign: 'center',
            zIndex: '2',
            position: 'relative',
        }
        const styleBg = {
            position: 'absolute',
            left: '0',
            top: '0',
            width: '100%',
            opacity: '0.8',
            height: `${height}vh`,
            background: `url(${bg})`,
            backgroundSize: 'cover',
        }
        return (
            <div className="child-block" onClick={this.handleClick} style={style}>
                <div style={styleText}>
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
                <div style={styleBg}>
                    {/* <Image /> */}
                </div>
            </div>
        )
    }
}

export default Banner3
