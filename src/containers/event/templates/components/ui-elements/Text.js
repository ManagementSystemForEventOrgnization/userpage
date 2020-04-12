import React from 'react';
import { connect } from 'react-redux'
import ReactHtmlParser from 'react-html-parser';
import { Modal, Select, InputNumber, Button } from 'antd';
import { Editor } from '@tinymce/tinymce-react';

const buttonWidth = 83;
const { Option } = Select;

class TextsBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      visible: false,

      content: this.props.content || "wellcome",
      positionButton: '',
      leftButton: 0,
      rightButton: 0,
      topButton: 0,
      bottomButton: 0,
      width: 100

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

    this.setState({ content });

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
  }

  handeChangeText = (e) => {
    this.setState({
      content: e.targe.value,
    })
  }

  render() {

    const { key, style } = this.props;
    const { content, topButton, leftButton, rightButton, bottomButton, positionButton, width } = this.state;
    const divStyle = style ? style : {
      position: positionButton,
      top: topButton,
      left: leftButton,
      right: rightButton,
      bottom: bottomButton,
      wordBreak: 'break-all',
      width,

    }
    return (

      <div className="edittext" style={{
        height: 50,
        width: 50
      }}
      >
        < div key={key} style={divStyle} onClick={this.showModal}
          onChange={this.handeChangeText}

        >
          {ReactHtmlParser(content)}
        </ div>




        <Modal
          title="Text"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={700}

          footer={[
            <Button key="ok" onClick={this.handleOk} type="primary">
              OK
          </Button>,
          ]}
        >
          <div className="mt-2">
            {/* <h6>Điều chính vị trí</h6> */}
            <div className="d-flex mb-3">
              <h6 >Vị trí : </h6>
              <Select defaultValue={style ? 'absolute' : 'relative'}
                className="ml-auto" style={{ width: '80%' }} onChange={this.onChangePosition} >
                <Option value="static">static</Option>
                <Option value="relative">relative</Option>
                <Option value="absolute">absolute</Option>
                <Option value="sticky">sticky</Option>
                <Option value="fixed">fixed</Option>
              </Select>
            </div>

          </div>
          <div className="mt-2 d-flex">
            <h6 className="mr-2">
              Căn chỉnh :
            </h6>

            <div className="ml-5">
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


          </div>

          <div className="mt-2">
            <h6>Nội dung :</h6>

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