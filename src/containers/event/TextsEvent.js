import React from 'react';
import { connect } from 'react-redux'
import ReactHtmlParser from 'react-html-parser';
import { Button,Modal} from 'antd';
import { Editor } from '@tinymce/tinymce-react';




class TextsEvent extends React.Component{
    constructor(props){
        super(props);
       
        this.state = {
          
            visible: false,
       
            content :"wellcome",
        
            
          

        }
    }
  


   
      showModal = () => {
        this.setState({
          visible: true,
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
 
  
    render(){
        
    const { content }=this.state;
      
        return(
           
           <div className="edittext">
               <div className="d-flex flex-row mt-4">
               <Button style={{borderRadius: '50px'}}  onClick={this.showModal}>Edit Text</Button>
               
              
              <div
                   >{ ReactHtmlParser(content) } </div>
            
        </div>
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
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(TextsEvent)
  