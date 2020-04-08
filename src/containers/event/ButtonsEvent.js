import React from 'react';
import { connect } from 'react-redux'
import ReactHtmlParser from 'react-html-parser';
import { Button,Modal,Radio,Tooltip, Input, Slider, InputNumber, Row, Col} from 'antd';
import { SketchPicker } from 'react-color';
import { Editor } from '@tinymce/tinymce-react';
import {BgColorsOutlined ,EditOutlined
} from '@ant-design/icons';

const buttons = [
  {
    background :'#6495ED',
    borderRadius    :'15px',
    borderColor : '',
    borderWidth: '',
    color :'white'

  },
  {
    background :' #FFC0CB',
    borderRadius    :'',
    borderColor : '',
    borderWidth: '',
    color :'black'
  },
  {
    background :'white',
    borderRadius    :'',
    borderColor     : '#FFC0CB',
    borderWidth: '4px',
    color :'black',
  
    
  },
  {
    background :'white',
    borderRadius    :'',
    borderColor     : 'black',
    borderWidth: '3px',
    color :'black'
    
  },
  {
    background :'#8FBC8F',
    borderRadius    :'',
    borderColor     : '',
    borderWidth: ''
    
  },
  {
    background :'#9932CC',
    borderRadius    :'',
    borderColor     : '',
    borderWidth: '',
    color :'black'
    
  },
  {
    background :'#483D8B',
    borderRadius    :'5px',
    borderColor     : '',
    borderWidth: ''
    
  },
  {
    background :'#483D8B',
    borderRadius    :'10px',
    borderColor     : '',
    borderWidth: ''
    
  },
  {
    background :'#ADD8E6',
    borderRadius    :'15px',
    borderColor     : '',
    borderWidth: ''
    
  },
  {
    background :'#3CB371',
    borderRadius    :'20px',
    borderColor     : '',
    borderWidth: ''
    
  },
  {
    background :'#F08080',
    borderRadius    :'15px 50px 30px',
    borderColor     : '',
    borderWidth: ''
    
  },
  {
    background :'#F08080',
    borderRadius    :'15px 50px 30px 5px',
    borderColor     : '',
    borderWidth: ''
    
  },
  {
    background :'#FF7F50',
    borderRadius    :'50%',
    borderColor     : '',
    borderWidth: '',
    height : '100px',
    width  :'100px', 
    textAlign :'center'
    
  },
  {
    background :'#FF7F50',
    borderRadius    :'50%',
    borderColor     : '',
    borderWidth: '',
   color: 'white'
    
  },
  
  
]


class ButtonsEvent extends React.Component{
    constructor(props){
        super(props);
       
        this.state = {
          
            visible: false,
       
            content :"wellcome",
            showColor:false,
            background: '',
            isDesign :false,
            isButton :false,
            buttonsList :buttons,
            borderColor: 0,
            shape1 : 
              {
              background :'',
              borderRadius    :' ',
              borderColor :'',
              borderWidth: '',
              color:'',
              height : '',
              width  :''
          
              }
            

        }
    }
  

    componentDidMount=()=>{
      this.setState({
        buttonsList :buttons
      })
    }

   
      showModal = () => {
        this.setState({
          visible: true,
        });
      };
      showModalButton=()=>{
          this.setState({
            isDesign: true,
          });
        };

        OnClickButton=()=>{
          this.setState({
            isButton: true,
          });
        };
      
 
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
   
      handleCancelDesign = e => {
        console.log(e);
        this.setState({
          isDesign: false,
        });
      };
    
  handleEditorChange=(content) =>{
    this.setState({ content });
   
  }
 
  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });

  };
  handleShapeChange = e => {
    this.setState({
       shape1 : e.target.value
       });
    console.log(this.state.shape1);
  };
 
    
    render(){
        
    const { content,background,showColor, isButton ,shape1, buttonsList,inputValue }=this.state;
 
  
        return(
           
           <div className="edittext">
               <div className="d-flex flex-row mt-4">
               <Button style={{borderRadius: '50px'}}  onClick={this.showModal}>Change Text</Button>
               <Tooltip placement="topLeft" title="Design">
               <Button className="ml-2" shape="circle"  onClick={this.showModalButton} icon={<EditOutlined 
               className="social-network-icon "
                />} ></Button> 
             </Tooltip>
               </div>
               <div className="mt-3">
              <Button className="ml-3" style={shape1} value={isButton}
                   >{ ReactHtmlParser(content) } </Button>
       </div>
       <div  >
        <Modal  
          title="Text settings"
          visible={this.state.visible}
          onOk={this.handleCancel}
          onCancel={this.handleCancel}
          width	= {300}
          footer={[
          ]}
         
        >
 <div >
   <h5>Nội dung </h5>
   <Editor value={content} onEditorChange={this.handleEditorChange} 
  apiKey="6vfxhgd1k6ab1xopelmn5p5nygco7vcmx1c5sl6nu4w8bwun"
  init={{ plugins: 'link table' }}
/>
<h5 className="mt-3">Đường dẫn </h5>
 <div className="d-flex flex-row mt-2">
 <Input placeholder="Thêm đường link" ></Input>
 <Button shape="round" type="primary" className="ml-3" style={{float:"right"}}> link</Button>
</div>
 </div>
 
           
        </Modal>
        </div>

        <Modal 
          title="Button design"
          visible={this.state.isDesign}
          onOk={this.handleOk}
          onCancel={this.handleCancelDesign}
          width	= {300}
          footer={[
          ]}
         
        >
     
          <div>
        
          <Radio.Group value={shape1} onChange={this.handleShapeChange}>
            { buttonsList.map((item,index)=>
          <Radio.Button key={index} className="ml-2   mt-3" style={item} value={item}>Button</Radio.Button>
            )}
        </Radio.Group>
       </div>
       <BgColorsOutlined style={{height:'50px',width:'50px'}}  onClick={this.onClickColor} />
   {
    showColor ?  <SketchPicker  color={this.state.background}  
    onChangeComplete={ this.handleChangeComplete } /> 
  : ' '

  }

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
  