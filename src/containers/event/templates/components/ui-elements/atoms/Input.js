import React from 'react';
import { connect } from 'react-redux'

import { Button, Modal, Select, Slider, InputNumber, Row, Col, Input, Tabs } from 'antd';
import { SketchPicker } from 'react-color';
import {
  BgColorsOutlined
} from '@ant-design/icons';
import FontPicker from "font-picker-react";

const { TabPane } = Tabs;
const { Option } = Select;
const buttonWidth = 70;

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
      borderRadiusText: 0,
      positionButton: '',
      leftButton: 0,
      rightButton: 0,
      topButton: 0,
      bottomButton: 0,
      marginLeftButton: 0,
      marginRightButton: 0,
      marginTopButon: 0,
      marginBottomButton: 0,
      paddingTopButton: 0,
      paddingLeftButton: 0,
      paddingRightButton: 0,
      paddingBottomButton: 0,
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
    this.setState({
      visible: false,
    });
  };


  onChange = value => {
    this.setState({
      inputValue: value,
    });
  };
  onChangeBorderRadius = value => {
    this.setState({
      borderRadiusText: value,
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

  }

  handleCancelDesign = e => {
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
  onChangePosition = (value) => {
    this.setState({
      positionButton: value
    })

  }
  // margin
  onChangemarginLeft = (value) => {
    this.setState({ marginLeftButton: value });
  }

  onChangeMarginTop = (value) => {
    this.setState({ marginTopButon: value });
  }

  onChangeMarginRight = (value) => {
    this.setState({ marginRightButton: value });
  }

  onChangeMarginBottom = (value) => {
    this.setState({ marginBottomButton: value });
  }
  // padding
  onChangePaddingLeft = (value) => {
    this.setState({ paddingLeftButton: value });
  }

  onChangePaddingTop = (value) => {
    this.setState({ paddingTopButton: value });
  }

  onChangePaddingRight = (value) => {
    this.setState({ paddingRightButton: value });
  }

  onChangePaddingBottom = (value) => {
    this.setState({ paddingBottomButton: value });
  }

  onChangeLeft = (value) => {
    this.setState({ leftButton: value });
  }


  onChangeTop = (value) => {
    this.setState({ topButton: value });
  }


  onChangeRight = (value) => {
    this.setState({ rightButton: value });
  }


  onChangeBottom = (value) => {
    this.setState({ bottomButton: value });
  }




  callback = (key) => {
    console.log(key);
  }
  render() {
    const { key } = this.props;
    const { background, inputValue, content, borderRadiusText, activeFontFamily, lineText,
      letterText, align, tranform,
      leftButton, topButton, rightButton, bottomButton,
      paddingBottomButton, paddingLeftButton, paddingTopButton, paddingRightButton,
      marginRightButton, marginLeftButton, marginBottomButton, marginTopButon, positionButton

    } = this.state;
    const divStyle = {
      color: background,
      fontFamily: activeFontFamily,
      fontSize: inputValue,
      lineHeight: lineText + "%",
      letterSpacing: letterText,
      textAlign: align,
      textTransform: tranform,
      borderRadius: borderRadiusText,
      width: 200,
      paddingLeft: paddingLeftButton,
      paddingRight: paddingRightButton,
      paddingTop: paddingTopButton,
      paddingBottom: paddingBottomButton,
      marginLeft: marginLeftButton,
      marginRight: marginRightButton,
      marginTop: marginTopButon,
      marginBottom: marginBottomButton,
      position: positionButton,
      left: leftButton,
      right: rightButton,
      top: topButton,
      bottom: bottomButton,
    }
    return (



      <div className="edittext child-block">
        <div className="mt-2">
          <Input value={content}
            key={key}
            onChange={this.handleEditorChange}
            style={divStyle}
            onClick={this.showModal}
          ></Input >
        </div>

        <Modal
          title="Text settings"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={500}
          bodyStyle={{ height: '400px', overflow: 'scroll' }}
          footer={[
          ]}
        >

          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="Text" key="1">
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
                <BgColorsOutlined style={{ height: '50px', width: '50px' }} onClick={this.showModalButton} />

              </div>
              <div className="mt-2">
                <h6>border radius(px)</h6>
                <Row>
                  <Col span={12}>
                    <Slider
                      min={0}
                      max={999}
                      onChange={this.onChangeBorderRadius}
                      value={typeof borderRadiusText === 'number' ? borderRadiusText : 0}
                    />
                  </Col>
                  <Col span={2}>
                    <InputNumber
                      min={0}
                      max={999}
                      style={{ margin: '0 16px', borderRadius: '15px' }}
                      value={borderRadiusText}
                      onChange={this.onChangeBorderRadius}
                    />
                  </Col>
                </Row>
              </div>

            </TabPane>
            <TabPane tab="Position" key="2">
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

                  <InputNumber placeholder="top" value={topButton} style={{ width: 72, textAlign: 'center' }} min={0} max={1500} onChange={this.onChangeTop}  ></InputNumber >

                </div>
                <div style={{ width: buttonWidth, float: 'left' }}>
                  <InputNumber placeholder="left" value={leftButton} style={{ width: 72, textAlign: 'center' }} min={0} max={1500} onChange={this.onChangeLeft} ></InputNumber >
                </div>
                <div style={{ width: buttonWidth, marginLeft: buttonWidth * 2 + 3 }}>
                  <InputNumber placeholder="right" value={rightButton} style={{ width: 72, textAlign: 'center' }} min={0} max={1500} onChange={this.onChangeRight}  ></InputNumber >
                </div>
                <div style={{ marginLeft: buttonWidth, clear: 'both', whiteSpace: 'nowrap' }}>
                  <InputNumber placeholder="bottom" value={bottomButton} style={{ width: 72, textAlign: 'center' }} min={0} max={1500} onChange={this.onChangeBottom} ></InputNumber >
                </div>
              </div>
              <div className="mt-2 d-flex">
                <h6 className="mr-2">
                  Margin:
            </h6>

                <div className="ml-5">
                  <div style={{ marginLeft: buttonWidth, whiteSpace: 'nowrap' }}>

                    <InputNumber placeholder="top" value={marginTopButon} style={{ width: 72, textAlign: 'center' }}
                      min={0} max={1500} onChange={this.onChangeMarginTop}  ></InputNumber >

                  </div>

                  <div style={{ width: buttonWidth, float: 'left' }}>
                    <InputNumber placeholder="left" value={marginLeftButton} style={{ width: 72, textAlign: 'center' }}
                      min={0} max={1500} onChange={this.onChangemarginLeft} ></InputNumber >
                  </div>

                  <div style={{ width: buttonWidth, marginLeft: buttonWidth * 2 + 3 }}>
                    <InputNumber placeholder="right" value={marginRightButton} style={{ width: 72, textAlign: 'center' }}
                      min={0} max={1500} onChange={this.onChangeMarginRight}  ></InputNumber >
                  </div>

                  <div style={{ marginLeft: buttonWidth, clear: 'both', whiteSpace: 'nowrap' }}>
                    <InputNumber placeholder="bottom" value={marginBottomButton} style={{ width: 72, textAlign: 'center' }}
                      min={0} max={1500} onChange={this.onChangeMarginBottom} ></InputNumber >
                  </div>


                </div>


              </div>

              <div className="mt-2 d-flex">
                <h6 className="mr-2">
                  padding :
            </h6>

                <div className="ml-5">
                  <div style={{ marginLeft: buttonWidth, whiteSpace: 'nowrap' }}>

                    <InputNumber placeholder="top" value={paddingTopButton} style={{ width: 72, textAlign: 'center' }}
                      min={0} max={1500} onChange={this.onChangePaddingTop}  ></InputNumber >

                  </div>

                  <div style={{ width: buttonWidth, float: 'left' }}>
                    <InputNumber placeholder="left" value={paddingLeftButton} style={{ width: 72, textAlign: 'center' }}
                      min={0} max={1500} onChange={this.onChangePaddingLeft} ></InputNumber >
                  </div>

                  <div style={{ width: buttonWidth, marginLeft: buttonWidth * 2 + 3 }}>
                    <InputNumber placeholder="right" value={paddingRightButton} style={{ width: 72, textAlign: 'center' }}
                      min={0} max={1500} onChange={this.onChangePaddingRight}  ></InputNumber >
                  </div>

                  <div style={{ marginLeft: buttonWidth, clear: 'both', whiteSpace: 'nowrap' }}>
                    <InputNumber placeholder="bottom" value={paddingBottomButton} style={{ width: 72, textAlign: 'center' }}
                      min={0} max={1500} onChange={this.onChangePaddingBottom} ></InputNumber >
                  </div>


                </div>


              </div>

          
            </TabPane>
          </Tabs>
        </Modal>




        <Modal
          title="Text design"
          visible={this.state.isDesign}

          onCancel={this.handleCancelDesign}
          width={300}
          style={{ marginLeft: 820 }}
          footer={[
            <Button key="ok" onClick={this.handleCancelDesign} type="primary">
              OK
        </Button>,
          ]}

        >

          <SketchPicker color={this.state.background}
            onChangeComplete={this.handleChangeComplete} />

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
