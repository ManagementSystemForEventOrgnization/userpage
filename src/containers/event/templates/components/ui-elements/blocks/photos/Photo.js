import React, { Component } from 'react'
import {Row,Col} from 'antd';
import {
    PlusCircleTwoTone,
    MinusCircleTwoTone
} from '@ant-design/icons'
import ImageBlock from '../../atoms/Image';


const temp = [1, 2, 3, 4];
const high = 42;
const iconStyle = {
    fontSize: '20px',
};
const urlDefault = "https://easydrawingart.com/wp-content/uploads/2019/07/How-to-Draw-a-Chibi-Girl.jpg";


class Photo extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    addPhoto = () => {
        temp.push(temp.length +1);
      };
    removePhoto = () => {
        temp.pop(temp.length -1);
    }

    render() {
        const style = {
            margin: '10px',
            padding: '5px',
        }
        return (
            <div className="d-flex child-block" style={style}>
                <Row gutter={8}>
                    {
                    temp.map(item =>
                        <Col className="gutter-row" key={item}  span={6}>
                        <ImageBlock url={urlDefault} height={high} leftModal={true} />
                    </Col>
                    )
                    }
                </Row>
                <div className="icons-handle">
                    <PlusCircleTwoTone style={iconStyle} className="mt-3" onClick={this.addPhoto} />
                    <MinusCircleTwoTone style={iconStyle} className="mt-3" onClick={this.removePhoto} />
                </div>
            </div>
            
        )
    }
}

export default Photo
