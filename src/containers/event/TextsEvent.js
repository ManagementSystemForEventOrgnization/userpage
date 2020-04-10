import React from 'react';
import { connect } from 'react-redux'
import ReactHtmlParser from 'react-html-parser';
import { Button, Modal } from 'antd';
import { Editor } from '@tinymce/tinymce-react';


class TextsEvent extends React.Component{
    constructor(props){
        super(props);
       
        this.state = {
          
            visible: false,
       
            content :"wellcome",
         
        
            
          

    };
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
 
  
    render()
    {
        
    const { content }=this.state;
      
        return(
           
           <div className="edittext">
             <div style={{width:500}}>
               <Editor value={content} onEditorChange={this.handleEditorChange}  style={{width:300}}
  apiKey="6vfxhgd1k6ab1xopelmn5p5nygco7vcmx1c5sl6nu4w8bwun"
    init={{ plugins: 'link   ', 
    toolbar: 'undo redo | bold italic underline | alignleft aligncenter alignright insert link format textcolor  | code' }}
/>
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


export default connect(mapStateToProps, mapDispatchToProps)(TextsEvent)
