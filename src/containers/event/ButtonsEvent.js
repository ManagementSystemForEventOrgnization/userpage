import React from 'react';
import { connect } from 'react-redux'
import ReactHtmlParser from 'react-html-parser';
import { Button,Modal,Radio,Tooltip, Input, } from 'antd';
import { SketchPicker } from 'react-color';

import {BgColorsOutlined ,EditOutlined
} from '@ant-design/icons';

const buttons = [
  {
    background :'#6495ED',
    borderRadius    :'15px',
    borderColor : '',
    borderWidth: '',
    color :'white',
    height : '',
    width  :'',
    textAlign:'',

  },
  {
    background :' #FFC0CB',
    borderRadius    :'',
    borderColor : '',
    borderWidth: '',
    color :'black' ,
    height : '',
    width  :'',
    textAlign:'',
  },
  {
    background :'white',
    borderRadius    :'',
    borderColor     : '#FFC0CB',
    borderWidth: '3px',
    color :'black', 
    height : '',
    width  :'',
    textAlign:'',
  
    
  },
  {
    background :'white',
    borderRadius    :'',
    borderColor     : 'black',
    borderWidth: '3px',
    color :'black'  ,
    height : '',
    width  :'',
    textAlign:'',
    
  },
  {
    background :'#8FBC8F',
    borderRadius    :'',
    borderColor     : '',
    borderWidth: ''  ,
    height : '',
    width  :'',
    textAlign:'',
    
  },
  {
    background :'#9932CC',
    borderRadius    :'',
    borderColor     : '',
    borderWidth: '',
    color :'black' ,
    height : '',
    width  :'',
    textAlign:'',
    
  },
  {
    background :'#483D8B',
    borderRadius    :'5px',
    borderColor     : '',
    borderWidth: ''  ,
    height : '',
    width  :'',
    textAlign:'',
    
  },
  {
    background :'#483D8B',
    borderRadius    :'10px',
    borderColor     : '',
    borderWidth: '',
    height : '',
    width  :'',
    textAlign:'',
    
  },
  {
    background :'#ADD8E6',
    borderRadius    :'15px',
    borderColor     : '',
    borderWidth: '',
    height : '',
    width  :'',
    textAlign:'',
    
  },
  {
    background :'#3CB371',
    borderRadius    :'20px',
    borderColor     : '',
    borderWidth: '',
    textAlign :'center',

    
  },
  {
    background :'#F08080',
    borderRadius    :'15px 50px 30px',
    borderColor     : '',
    borderWidth: ''    ,
    textAlign :'center',

    
  },
  {
    background :'#F08080',
    borderRadius    :'15px 50px 30px 5px',
    borderColor     : '',
    borderWidth: '',
    textAlign :'center'

    
  },
  {
    background :'#FF7F50',
    borderRadius    :'50',
    borderColor     : '',
    borderWidth: '',
    textAlign :'center'

    
  },
  {
    background :'#FF7F50',
    borderRadius    :'50%',
    borderColor     : '',
    borderWidth: '',
   color: 'white',
   textAlign :'center'

   
  },
  
  {
    background :'#FF7F50',
    borderRadius    :'50%',
    borderColor     : '',
    borderWidth: '',
   color: 'white',
   textAlign :'center'

   
  },
  
  
]


class ButtonsEvent extends React.Component{
    constructor(props){
        super(props);
       
        this.state = {
          
            visible: false,
            background:'',
            content :"wellcome",
            showColor:false,
            isDesign :false,
            isButton :false,
            buttonsList :buttons,
            styleButton : 
              {
              background :'',
              borderRadius    :' ',
              borderColor :'',
              borderWidth: '',
              color:'',
              height : '',
              width  :'',
              textAlign:'',
          
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
    
  handleEditorChange=(e) =>{
    this.setState({ content :e.target.value });
   
  }
 
  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });

  };
  handleShapeChange = e => {
    this.setState({
       styleButton : e.target.value,
    
       });
    console.log(this.state.styleButton);
  };
    
  handleTextChange = e => {
    this.setState({
       textButton : e.target.value
       });
    console.log(this.state.textButton);
  };
    
    render(){
        
    const { content,showColor, isButton ,styleButton, buttonsList,textButton }=this.state;
      
   
    
        return(
           
           <div className="edittext">
               <div className="d-flex flex-row mt-4">
               <Button style={{borderRadius: '50px'}}  onClick={this.showModal}>Change Text</Button>
               <Tooltip placement="topLeft" title="Design">
               <Button className="ml-2" shape="circle"  onClick={this.showModalButton} 
                >
                  <span><EditOutlined className="social-network-icon "/></span></Button> 
             </Tooltip>
               </div>
               <div className="mt-2">
              <Button className="ml-3" style={styleButton}   value={isButton}  onClick={this.showModalButton}>
                     <span></span>{ ReactHtmlParser(content) } 
                   </Button>
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
  
   <Input  style={{borderRadius:50}} value={content}  onChange={this.handleEditorChange} ></Input>

<h5 className="mt-3">Đường dẫn </h5>
 <div className="d-flex flex-row mt-2">
 <Input style={{borderRadius:50}} placeholder="Thêm đường link" ></Input>
  
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
        
          <Radio.Group value={styleButton} onChange={this.handleShapeChange}>
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
  