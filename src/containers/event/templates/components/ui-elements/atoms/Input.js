import React from 'react';
import { connect } from 'react-redux'
import ReactHtmlParser from 'react-html-parser';
import { Button, Modal, Select, Slider, InputNumber, Row, Col, Input, Tooltip, Radio } from 'antd';
import { SketchPicker } from 'react-color';
import { Editor } from '@tinymce/tinymce-react';
import {
  CheckCircleOutlined, BgColorsOutlined, EditOutlined
} from '@ant-design/icons';
import FontPicker from "font-picker-react";
import TextareaAutosize from 'react-textarea-autosize';

const { Option } = Select;

class InputBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      background: '#FF00FF',
      visible: false,
      inputValue: 13,
      content: "wellcome",
      showColor: false,
      isDesign: false,
      activeFontFamily: "Open Sans",
      lineText: 80,
      letterText: -2,
      align: '',
      tranform: ' ',
    }
  }

  //color
  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
  };
  // modal
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  // textalign
  onChangeTextAlign = (value) => {
    console.log(`selected ${value}`);
    this.setState({
      align: value
    })
    console.log(this.state.align);
  }

  // tranform
  onChangeTextTranform = (value) => {
    console.log(`selected ${value}`);
    this.setState({
      tranform: value
    })
  }

  // open color
  onClickColor = e => {
    console.log(e);
    this.state.showColor = !this.state.showColor
    this.setState({
      showColor: this.state.showColor
    });
  };

  // cancel
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

  // change font size
  onInputValueChange = event => {
    this.setState({
      content: event.target.value
    })
  }

  // edit text
  handleEditorChange = (e) => {
    this.setState({ content: e.target.value });
    console.log(this.state.content);

  }

  handleCancelDesign = e => {
    console.log(e);
    this.setState({
      isDesign: false,
    });
  };

  showModalButton = () => {
    this.setState({
      isDesign: true,
    });
  };

  // textline
  onChangeLineHeight = value => {
    this.setState({
      lineText: value,
    });
  };

  // letter space
  onChangeLetterSpace = value => {
    this.setState({
      letterText: value,
    });

  };
  render() {

    const { background, inputValue, content, showColor, activeFontFamily, lineText, letterText, align, tranform } = this.state;
    const divStyle = {
      color: background,
      fontFamily: activeFontFamily,
      fontSize: inputValue,
      lineHeight: lineText + "%",
      letterSpacing: letterText,
      textAlign: align,
      textTransform: tranform,
    }
    return (

      <div className="edittext child-block">
        <div className="d-flex flex-row mt-4">
          <Button style={{ borderRadius: '50px' }} onClick={this.showModal}>Change Text</Button>
          <Tooltip placement="topLeft" title="Design">
            <Button className="ml-2" shape="circle" onClick={this.showModalButton}
            >
              <span><EditOutlined className="social-network-icon " /></span></Button>
          </Tooltip>
        </div>
        <div className="mt-2">
          <TextareaAutosize value={content}
            onChange={this.handleEditorChange}
            style={divStyle}
          ></TextareaAutosize >
        </div>
        <div style={{}} >
          <Modal
            title="Text settings"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            width={280}
            bodyStyle={{ height: '400px', overflow: 'scroll' }}
            footer={[
            ]}
          >
            <div >

              <div className="mt-2" >
                <h6>Fonts</h6>
                <div className=" d-flex flex-row">

                  <FontPicker style={{ width: '100%' }}
                    apiKey="AIzaSyB8e2BPKdZDsrXUC4sPv9gG6IzMpwf9GtY"
                    activeFontFamily={this.state.activeFontFamily}
                    onChange={nextFont =>
                      this.setState({
                        activeFontFamily: nextFont.family,
                      })
                    }
                  />

                </div>
                <div className="mt-2">
                  <h6>Font size(px)</h6>
                  <Row>
                    <Col span={12}>
                      <Slider
                        min={6}
                        max={176}
                        onChange={this.onChange}
                        value={typeof inputValue === 'number' ? inputValue : 0}
                      />
                    </Col>
                    <Col span={2}>
                      <InputNumber
                        min={6}
                        max={176}
                        style={{ margin: '0 16px', borderRadius: '15px' }}
                        value={inputValue}
                        onChange={this.onChange}
                      />
                    </Col>
                  </Row>
                </div>

                <div className="mt-2">
                  <h6>Line Height(%)</h6>
                  <Row>
                    <Col span={12}>
                      <Slider
                        min={80}
                        max={200}
                        onChange={this.onChangeLineHeight}
                        value={typeof lineText === 'number' ? lineText : 0}
                      />
                    </Col>
                    <Col span={2}>
                      <InputNumber
                        min={80}
                        max={200}
                        style={{ margin: '0 16px', borderRadius: '15px' }}
                        value={lineText}
                        onChange={this.onChangeLineHeight}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="mt-2">
                  <p>Letter Spacing (px) </p>
                  <Row>
                    <Col span={12}>
                      <Slider
                        min={-2}
                        max={10}
                        onChange={this.onChangeLetterSpace}
                        value={typeof letterText === 'number' ? letterText : 0}
                      />
                    </Col>
                    <Col span={2}>
                      <InputNumber
                        min={-2}
                        max={10}
                        style={{ margin: '0 16px', borderRadius: '15px' }}
                        value={letterText}
                        onChange={this.onChangeLetterSpaceChange}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="mt-2">
                  <h6>Text Align</h6>
                  <Select style={{ width: '100%' }} onChange={this.onChangeTextAlign}>
                    <Option value="left">left</Option>
                    <Option value="center">center</Option>
                    <Option value="right">right</Option>
                    <Option value="justify">justify</Option>
                  </Select>
                </div>
                <div className="mt-2"  >
                  <h6>Text Tranform</h6>
                  <Select style={{ width: '100%' }} onChange={this.onChangeTextTranform}>
                    <Option value="none">none</Option>
                    <Option value="uppercase">uppercase</Option>
                    <Option value="lowercase">lowercase</Option>
                    <Option value="capitalize">capitalize</Option>
                  </Select>
                </div>

              </div>
              <div className="mt-2 d-flex flex-row">
                <h6>Color</h6>
                <BgColorsOutlined style={{ height: '50px', width: '50px' }} onClick={this.onClickColor} />
                {
                  showColor ? <SketchPicker color={this.state.background}
                    onChangeComplete={this.handleChangeComplete} />
                    : ' '

                }
              </div>
            </div>
          </Modal>


        </div>

        <Modal
          title="Text design"
          visible={this.state.isDesign}
          onOk={this.handleOk}
          onCancel={this.handleCancelDesign}
          width={300}
          footer={[
          ]}

        >

          <div>


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


export default connect(mapStateToProps, mapDispatchToProps)(InputBlock)
