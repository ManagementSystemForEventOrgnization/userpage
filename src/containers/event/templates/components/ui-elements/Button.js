import React from 'react';
import { connect } from 'react-redux'
import ReactHtmlParser from 'react-html-parser';
import { Button, Modal, Input, Tabs, Select, Slider, InputNumber, Row, Col, Radio } from 'antd';
import { SketchPicker } from 'react-color';

import {
  BgColorsOutlined,
} from '@ant-design/icons';


const { TabPane } = Tabs;
const { Option } = Select;
const buttonWidth = 80;
const buttons = [
  {
    background: '#6495ED',
    borderRadius: '15px',
    borderColor: '',
    borderWidth: '',
    color: 'white',
    height: '',
    width: '',
    textAlign: '',

  },
  {
    background: ' #FFC0CB',
    borderRadius: '',
    borderColor: '',
    borderWidth: '',
    color: 'black',
    height: '',
    width: '',
    textAlign: '',
  },
  {
    background: 'white',
    borderRadius: '',
    borderColor: '#FFC0CB',
    borderWidth: '3px',
    color: 'black',
    height: '',
    width: '',
    textAlign: '',


  },
  {
    background: 'white',
    borderRadius: '',
    borderColor: 'black',
    borderWidth: '3px',
    color: 'black',
    height: '',
    width: '',
    textAlign: '',

  },
  {
    background: '#8FBC8F',
    borderRadius: '',
    borderColor: '',
    borderWidth: '',
    height: '',
    width: '',
    textAlign: '',

  },
  {
    background: '#9932CC',
    borderRadius: '',
    borderColor: '',
    borderWidth: '',
    color: 'black',
    height: '',
    width: '',
    textAlign: '',

  },
  {
    background: '#483D8B',
    borderRadius: '5px',
    borderColor: '',
    borderWidth: '',
    height: '',
    width: '',
    textAlign: '',

  },
  {
    background: '#483D8B',
    borderRadius: '10px',
    borderColor: '',
    borderWidth: '',
    height: '',
    width: '',
    textAlign: '',

  },
  {
    background: '#ADD8E6',
    borderRadius: '15px',
    borderColor: '',
    borderWidth: '',
    height: '',
    width: '',
    textAlign: '',

  },
  {
    background: '#3CB371',
    borderRadius: '20px',
    borderColor: '',
    borderWidth: '',
    textAlign: 'center',


  },
  {
    background: '#F08080',
    borderRadius: '15px 50px 30px',
    borderColor: '',
    borderWidth: '',
    textAlign: 'center',


  },
  {
    background: '#F08080',
    borderRadius: '15px 50px 30px 5px',
    borderColor: '',
    borderWidth: '',
    textAlign: 'center'


  },
  {
    background: '#FF7F50',
    borderRadius: '50',
    borderColor: '',
    borderWidth: '',
    textAlign: 'center'


  },
  {
    background: '#FF7F50',
    borderRadius: '50%',
    borderColor: '',
    borderWidth: '',
    color: 'white',
    textAlign: 'center'


  },

  {
    background: '#FF7F50',
    borderRadius: '50%',
    borderColor: '',
    borderWidth: '',
    color: 'white',
    textAlign: 'center'


  },


]


class ButtonBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      visible: false,
      buttonsList: buttons,
      content: "wellcome",
      isDesign: false,
      isButton: false,
      inputValue: 13,
      align: 'center',
      textcolor: '',
      positionButton: '',
      leftButton: 0,
      rightButton: 0,
      topButton: 0,
      bottomButton: 0,
      borderWidthButton: 0,
      borderColorButton: '',
      backgrounButton: '#03a9f4',
      isBackGround: false,
      isBorderColor: false,
      borderRadiusButton: '',
      backgroundColorButton: '',

    }
  }


  componentDidMount = () => {
    this.setState({
      buttonsList: buttons
    })

  }

  onChangeTextAlign = (value) => {
    console.log(`selected ${value}`);
    this.setState({
      align: value
    })
    console.log(this.state.align);
  }

  //position
  onChangePosition = (value) => {
    console.log(`selected ${value}`);
    this.setState({
      positionButton: value
    })
    console.log(this.state.align);
  }

  onChange = value => {
    this.setState({
      inputValue: value,
    });
  };

  onChangeBorderWith = value => {
    this.setState({
      borderWidthButton: value,
    });
  };

  showModalButton = () => {
    this.setState({
      isDesign: true,
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

  handleEditorChange = (e) => {
    this.setState({ content: e.target.value });

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


  handleChangeComplete = (color) => {
    this.setState({
      textcolor: color.hex,
    });

  };


  handleChangeCompleteBackground = (color) => {
    this.setState({
      backgrounButton: color.hex,
    });
  };


  handleChangeCompleteBorder = (color) => {
    this.setState({
      borderColorButton: color.hex
    });
  };


  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  showModalBackGround = () => {
    const { isBackGround } = this.state;
    this.setState({
      isBackGround: !isBackGround,
    });
  };

  showModalBorderColor = () => {
    const { isBorderColor } = this.state;
    this.setState({
      isBorderColor: !isBorderColor
    });
  };

  handleTextChange = e => {
    this.setState({
      textButton: e.target.value
    });
    console.log(this.state.textButton);
  };



  callback = (key) => {
    console.log(key);
  }


  handleShapeChange = e => {
    this.setState({
      borderRadiusButton: e.target.value,

    });

  };



  render() {

    const { key } = this.props;
    const { content, align, isButton, inputValue,
      textcolor,
      positionButton,
      leftButton, topButton, rightButton, bottomButton, borderWidthButton,
      backgrounButton, borderColorButton, buttonsList, borderRadiusButton,
    } = this.state;

    const styleButton = {
      fontSize: inputValue,
      textAlign: align,
      color: textcolor,
      position: positionButton,
      left: leftButton,
      right: rightButton,
      top: topButton,
      bottom: bottomButton,
      borderWidth: borderWidthButton,
      background: backgrounButton,
      borderColor: borderColorButton,
      borderRadius: borderRadiusButton,

    }


    return (

      <div className="edittext">

        <div className="mt-2">
          <Button
            key={key}
            className="ml-3"
            style={styleButton}
            value={isButton}
            onClick={this.showModalButton}>
            <span></span>{ReactHtmlParser(content)}
          </Button>
        </div>


        <Modal
          title="Button design"
          visible={this.state.isDesign}
          onOk={this.handleOk}
          onCancel={this.handleCancelDesign}
          width={320}
          bodyStyle={{ height: '400px', overflow: 'scroll' }}
          footer={[
          ]}

        >
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="Edit text" key="1">
              <h6>Nội dung </h6>

              <Input style={{ borderRadius: 50 }} value={content} onChange={this.handleEditorChange} ></Input>

              <h6 className="mt-3">Đường dẫn </h6>
              <div className="d-flex flex-row mt-2">
                <Input style={{ borderRadius: 50 }} placeholder="Thêm đường link" ></Input>
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
                <h6>Text Align</h6>
                <Select style={{ width: '100%' }} onChange={this.onChangeTextAlign}>
                  <Option value="left">left</Option>
                  <Option value="center">center</Option>
                  <Option value="right">right</Option>
                  <Option value="justify">justify</Option>
                </Select>
              </div>
              <div className="mt-3 d-flex flex-row">
                <h6 className="mt-1">Color</h6>
                <Button className="ml-4" onClick={this.showModal} shape='circle'><span>
                  <BgColorsOutlined />
                </span></Button>

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
              <div className="mt-2">
                <h6>Border Width</h6>
                <Row>
                  <Col span={12}>
                    <Slider
                      min={0}
                      max={15}
                      onChange={this.onChangeBorderWith}
                      value={typeof borderWidthButton === 'number' ? borderWidthButton : 0}
                    />
                  </Col>
                  <Col span={2}>
                    <InputNumber
                      min={0}
                      max={15}
                      style={{ margin: '0 16px', borderRadius: '15px' }}
                      value={borderWidthButton}
                      onChange={this.onChangeBorderWith}
                    />
                  </Col>
                </Row>

              </div>
              <div className="mt-3 d-flex flex-row">
                <h6>Border color</h6>
                <Button className="ml-5" onClick={this.showModalBorderColor} shape='circle'><span>
                  <BgColorsOutlined />
                </span></Button>

              </div>
              <div className="mt-4 d-flex flex-row">
                <h6>Background</h6>
                <Button className="ml-5" onClick={this.showModalBackGround} shape='circle' ><span>
                  <BgColorsOutlined />
                </span></Button>

              </div>

            </TabPane>


            <TabPane tab="Design" key="3">
              <Radio.Group value={borderRadiusButton} onChange={this.handleShapeChange}>
                {buttonsList.map((item, index) =>
                  <Radio.Button key={index} className="ml-2   mt-3" style={item} value={item.borderRadius}>Button</Radio.Button>
                )}
              </Radio.Group>
            </TabPane>
          </Tabs>
        </Modal>

        <Modal
          title="Color"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={260}

          style={{ marginLeft: 820 }}
          footer={[
          ]}
        >
          <SketchPicker color={textcolor}
            onChangeComplete={this.handleChangeComplete} />
        </Modal>


        <Modal
          title="background"
          visible={this.state.isBackGround}
          onOk={this.handleOk}
          onCancel={this.showModalBackGround}
          width={260}

          style={{ marginLeft: 820 }}
          footer={[
          ]}
        >
          <SketchPicker color={backgrounButton}
            onChangeComplete={this.handleChangeCompleteBackground} />
        </Modal>


        <Modal
          title="Border Color"
          visible={this.state.isBorderColor}
          onOk={this.handleOk}
          onCancel={this.showModalBorderColor}
          width={260}

          style={{ marginLeft: 820 }}
          footer={[
          ]}
        >
          <SketchPicker color={borderColorButton}
            onChangeComplete={this.handleChangeCompleteBorder} />
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


export default connect(mapStateToProps, mapDispatchToProps)(ButtonBlock)
