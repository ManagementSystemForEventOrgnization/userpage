import React from 'react';
import { connect } from 'react-redux'
import {Card, Row, Col } from 'antd';
import {
  PlusCircleTwoTone,
  MinusCircleTwoTone
} from '@ant-design/icons'
import Text from '../../atoms/Text';
import Image from '../../atoms/Image';

const { Meta } = Card;


const title = "Card title";
const description = "This is description";
const urlCardImage = "https://easydrawingart.com/wp-content/uploads/2019/07/How-to-Draw-a-Chibi-Girl.jpg";
const height = 30 ;
const temp = [1, 2, 3, 4];
const iconStyle = {
  fontSize: '20px',
};

class CardBlock extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false,   
        }
    }
  
    componentDidMount=()=>{
    this.setState({
        
    })
    }
    addCard = () => {
        temp.push(temp.length +1);
      };
    removeCard = () => {
        temp.pop(temp.length -1);
    }
    render(){
      
        return(
          <div >
            <Row gutter={16}>
                {
                temp.map(item =>
                    <Col className="gutter-row" key={item}  span={6}>
                    <Card
                        hoverable
                        style={{  height: 300}}
                        cover={<Image url ={urlCardImage} editable={true} height={height}  />}>
                        <Meta title= {<Text content ={title}/>} description= {<Text content ={description}/>} />
                    </Card>
                </Col>
                )
                }
            </Row>
          <div className="icons-handle">
              <PlusCircleTwoTone style={iconStyle} className="mt-3" onClick={this.addCard} />
              <MinusCircleTwoTone style={iconStyle} className="mt-3" onClick={this.removeCard} />
          </div>
        </div>   
        )
    }
}

const mapStateToProps = state => ({
    // map state of store to props
  
  })
  
  const mapDispatchToProps = (dispatch) => ({
   
  });
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(CardBlock)
