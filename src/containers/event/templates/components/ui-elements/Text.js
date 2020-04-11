import React from 'react';
import { connect } from 'react-redux'
import ReactHtmlParser from 'react-html-parser';
import { Modal, Select, InputNumber } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import TextareaAutosize from 'react-textarea-autosize';
const buttonWidth = 83;
const { Option } = Select;

class TextsBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      visible: false,

      content: "wellcome",
      positionButton: '',
      leftButton: 0,
      rightButton: 0,
      topButton: 0,
      bottomButton: 0,
      width : 100

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


  handleEditorChange = (content) => {
 
    this.setState({ content});

  }

  onChangeLeft = (value) => {
    this.setState({ leftButton: value });
    console.log(this.state.leftButton);
  }

  onChangeTop = (value) => {
    this.setState({ topButton: value });
    console.log(this.state.topButton);
  }

  onChangeRight = (value) => {
    this.setState({ rightButton: value });
    console.log(this.state.rightButton);
  }

  onChangeBottom = (value) => {
    this.setState({ bottomButton: value });
    console.log(this.state.bottomButton);
  }

  onChangePosition = (value) => {
    console.log(`selected ${value}`);
    this.setState({
      positionButton: value
    })
    console.log(this.state.align);
  }
  handeChangeText=(e)=>{
    this.setState({
      content:e.targe.value,
    })
  }

  render() {

    const { key } = this.props;
    const { content, topButton, leftButton, rightButton, bottomButton, positionButton,width } = this.state;
    const divStyle = {
      position: positionButton,
      top: topButton,
      left: leftButton,
      right: rightButton,
      bottom: bottomButton,
      wordBreak: 'break-all',
      width ,
     
    }
    return (

      <div className="edittext"  style={{   height:50,
        width :50}}
  >
        < div key={key} style={divStyle}  onClick={this.showModal}
          onChange={this.handeChangeText}
        
         >
       { ReactHtmlParser(content)}
           </ div>
       
      


        <Modal
          title="Text"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={320}
          bodyStyle={{ height: '400px', overflow: 'scroll' }}

          footer={[
          ]}
        >
          <div className="mt-2">
            <h6>Điều chính vị trí</h6>
            <Select style={{ width: '100%' }} onChange={this.onChangePosition}>
              <Option value="static">static</Option>
              <Option value="relative">relative</Option>
              <Option value="fixed">absolute</Option>
              <Option value="sticky">sticky</Option>
            </Select>
          </div>
          <div className="mt-2">

            <div style={{ marginLeft: buttonWidth, whiteSpace: 'nowrap' }}>

              <InputNumber placeholder="top" value={topButton} style={{ width: 72, textAlign: 'center' }}
                min={0} max={1500} onChange={this.onChangeTop}  ></InputNumber >

            </div>
            <div style={{ width: buttonWidth, float: 'left' }}>
              <InputNumber placeholder="left" value={leftButton} style={{ width: 72, textAlign: 'center' }}
                min={0} max={1500} onChange={this.onChangeLeft} ></InputNumber >
            </div>
            <div style={{ width: buttonWidth, marginLeft: buttonWidth * 2 + 3 }}>
              <InputNumber placeholder="right" value={rightButton} style={{ width: 72, textAlign: 'center' }}
                min={0} max={1500} onChange={this.onChangeRight}  ></InputNumber >
            </div>
            <div style={{ marginLeft: buttonWidth, clear: 'both', whiteSpace: 'nowrap' }}>
              <InputNumber placeholder="bottom" value={bottomButton} style={{ width: 72, textAlign: 'center' }}
                min={0} max={1500} onChange={this.onChangeBottom} ></InputNumber >
            </div>
          </div>
          <div className="mt-2">
            <h6>Nội dung </h6>

            <Editor value={content} onEditorChange={this.handleEditorChange} style={{ width: 300 }}
              apiKey="6vfxhgd1k6ab1xopelmn5p5nygco7vcmx1c5sl6nu4w8bwun"
              init={{
                plugins: 'link   ',
                toolbar: 'undo redo | bold italic underline | alignleft aligncenter alignright insert link format textcolor  | code'
              }}
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


export default connect(mapStateToProps, mapDispatchToProps)(TextsBlock)
