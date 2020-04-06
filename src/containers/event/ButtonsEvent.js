import React from 'react';
import { connect } from 'react-redux'
import { Button,Modal,Input,Select, Slider, InputNumber, Row, Col} from 'antd';
import { SketchPicker } from 'react-color';
import { Editor } from '@tinymce/tinymce-react';
import {FacebookOutlined,
    PhoneOutlined,CheckCircleOutlined,BgColorsOutlined
} from '@ant-design/icons';
const { Option } = Select;
const options = [{ value: 'bold' ,name:'heading1'}, { value: '800px',name:'heading2' }, { value: '700px',name:'heading3' }
, { value: '600px',name:'heading4' } , { value: '500px',name:'heading5' } , { value: '400px',name:'heading6' } ];
const family=[{value:'Times New Roman'},{value:'Arial'},{value:'Times'}];
class ButtonsEvent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            background: '#FF00FF',
            visible: false,
            themes : options,
            theme  : '500px',
            fonts :family,
            font : 'Arial',
            inputValue: 13,
            content :"wellcome",
            showColor:false
            
          

        }
    }
    componentDidMount=()=>{
      this.setState({
       themes : options,
        fonts :family
      })
      console.log(this.state.fonts);
    
    }


    handleChangeComplete = (color) => {
        this.setState({ background: color.hex });

      };
     
      showModal = () => {
        this.setState({
          visible: true,
        });
      };
       handleChange=(value)=> {
        console.log(`selected ${value}`);
        this.setState({
          theme :value

        })
      }

      onChangFont=(value)=> {
        console.log(`selected ${value}`);
        this.setState({
          font :value

        })
      }
      onClickColor = e => {
        console.log(e);
        this.state.showColor =!this.state.showColor
        this.setState({
          showColor:  this.state.showColor
        });
      };
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };

      onChange = value => {
        this.setState({
          inputValue: value,
        });
      };

      
  onInputValueChange = event =>{
    this.setState({
      content : event.target.value
    })
  }

  handleEditorChange=(content) =>{
    this.setState({ content });
  }
    render(){
        
    const { themes,theme,background,fonts,font,inputValue,content,showColor }=this.state;
        const divStyle ={
            color :background,
            fontWeight : theme,
            fontFamily :font,
            fontSize : inputValue,
            
        
        }
        return(
           
           <div className="edittext">
               <div>
               <Button style={{borderradius:'50px'}}  onClick={this.showModal}>Edit Text</Button>
               
              
             <div style={divStyle} > <p>{ content}</p>
              </div>
        </div>
        <Modal
          title="Text settings"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        <div >
          <p>Themes</p>
        <Select
   onChange={this.handleChange}
    style={{ width: '100%' }}
  
 >
  {themes.map(item => (
          <Option key={item.value}>
              <span >
            <div>
            <CheckCircleOutlined  className=" social-network-icon" />
  <p style={{float:"right"}}>{item.name}</p>
            </div>
             
                </span>
          </Option>
        ))}
 </Select>
 </div>
 
 <div className="mt-2" >
    <p>Fonts</p> 
    <div  className=" d-flex flex-row">
                
    <Select
   onChange={this.onChangFont}
    style={{ width: '100%' }}
  
 >
  {fonts.map(item => (
          <Option key={item.value} >
              <span >
            <div>
            <CheckCircleOutlined  className=" social-network-icon" />
         <p style={{float:"right"}}>{item.value}</p>
            </div>
             
                </span>
          </Option>
        ))}
 </Select>
 
    </div>
    <div className="mt-2">
      <p>Font size(px)</p>
    <Row>
        <Col span={12}>
          <Slider
            min={6}
            max={176}
            onChange={this.onChange}
            value={typeof inputValue === 'number' ? inputValue : 0}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={6}
            max={176}
            style={{ margin: '0 16px', borderRadius:'15px' }}
            value={inputValue}
            onChange={this.onChange}
          />
        </Col>
      </Row>
      </div>
 </div>
 <div className="mt-2" >
   <p>content</p>
   <Editor value={content} onEditorChange={this.handleEditorChange}
  apiKey="6vfxhgd1k6ab1xopelmn5p5nygco7vcmx1c5sl6nu4w8bwun"
  init={{ plugins: 'link table' }}
/>
 </div>
 <div className="mt-2 d-flex flex-row">
   <p>Color</p>
 <BgColorsOutlined style={{height:'50px',width:'50px'}}  onClick={this.onClickColor} /> 
  {
    showColor ?  <SketchPicker  color={this.state.background}  
    onChangeComplete={ this.handleChangeComplete } /> 
  : ' '

  }
  </div>
           
        </Modal>
           </div>
        )
    }
}

const mapStateToProps = state => ({
    // map state of store to props
  
  })
  
  const mapDispatchToProps = (dispatch) => ({
   
  });
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(ButtonsEvent)
  