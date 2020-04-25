import React, { Component } from 'react'
import {Row,Col} from 'antd';
import {
    PlusCircleTwoTone,
    MinusCircleTwoTone
} from '@ant-design/icons'
import ImageBlock from '../../atoms/Image';
import TextBlock from '../../atoms/Text';


const temp = [1, 2, 3, 4, 5];
const high = 10;
const title = 'Sponsor'
const iconStyle = {
    fontSize: '20px',
};
const urlDefault = "https://easydrawingart.com/wp-content/uploads/2019/07/How-to-Draw-a-Chibi-Girl.jpg";


class Sponsor1Block extends Component {
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
                <div style={style} className="container">
                <div className="row" >
                    <div className="col-sm-12">
                        <TextBlock content={title} 
                        style={
                            {
                                fontWeight: 'normal',
                                fontSize: 60,
                            }
                        } 
                        />
                    </div>
                </div>

                <hr></hr>

                <div className="child-block d-flex">
                <Row className="child-block" gutter={8}>
                    {
                    temp.map(item =>
                        <Col className="gutter-row" key={item}  span={4}>
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
                </div>
                
            </div>
            
        )
    }
}

export default Sponsor1Block
