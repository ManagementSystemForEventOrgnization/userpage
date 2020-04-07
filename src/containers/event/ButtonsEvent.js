import React from 'react';
import { connect } from 'react-redux'
import ReactHtmlParser from 'react-html-parser';
import { Button,Modal} from 'antd';
import { SketchPicker } from 'react-color';
import { Editor } from '@tinymce/tinymce-react';
import {BgColorsOutlined
} from '@ant-design/icons';



class ButtonsEvent extends React.Component{
    constructor(props){
        super(props);
       
        this.state = {
          
            visible: false,
       
            content :"wellcome",
            showColor:false,
            background: '#FF00FF',
          

        }
    }
  


   
      showModal = () => {
        this.setState({
          visible: true,
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

    
  handleEditorChange=(content) =>{
    this.setState({ content });
   
  }
 
  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });

  };
  
    render(){
        
    const { content,background,showColor  }=this.state;
      
    const divStyle ={
      backgroundColor :background,
    
      
  
  }
        return(
           
           <div className="edittext">
               <div className="d-flex flex-row mt-4">
               <Button style={{borderRadius: '50px'}}  onClick={this.showModal}>Change Text</Button>
               <BgColorsOutlined style={{height:'50px',width:'50px'}}  onClick={this.onClickColor} /> 
     {
    showColor ?  <SketchPicker  color={this.state.background}  
    onChangeComplete={ this.handleChangeComplete } /> 
  : ' '

  }
               </div>
              <Button style={divStyle}
                   >{ ReactHtmlParser(content) } </Button>
       
        <Modal
          title="Text settings"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
       
 
 
 
 
   
 <div >
   <h2>content</h2>
   <Editor value={content} onEditorChange={this.handleEditorChange} 
  apiKey="6vfxhgd1k6ab1xopelmn5p5nygco7vcmx1c5sl6nu4w8bwun"
  init={{ plugins: 'link table' }}
/>
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
  