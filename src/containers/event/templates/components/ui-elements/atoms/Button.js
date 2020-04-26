import React from 'react';
import { connect } from 'react-redux'
import ReactHtmlParser from 'react-html-parser';
import { Button, Modal, Input, Tabs, Slider, InputNumber, Row, Col, } from 'antd';
import { SketchPicker } from 'react-color';
import EditText from '../shares/EditText';
import PaddingAndMargin from '../shares/PaddingAndMargin';
import ChangeColorModal from '../shares/ChangeColorModal';
import {
  BgColorsOutlined,
} from '@ant-design/icons';
// import { IconContext } from "react-icons";

import { ButtonState } from '../stateInit/ButtonState'
import {TabPane} from '../../../constants/atom.constant'

class ButtonBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...ButtonState(this.props)
    }
  }


  // common function
  onChangeValue(newValue, valueParam) {
    this.setState({
      [valueParam]: newValue,
    });
  }


  handleEditorChange = (e) => {
    const { id, handleOnChangeButtonTextBlock } = this.props;
    this.setState({ content: e.target.value });
    if (id) {
      handleOnChangeButtonTextBlock(id, this.state.content);
    }
  }

  //not work
  handleChangeCompleteBorder = (color) => {
    this.setState({
      borderColorButton: color.hex
    });
  };

  render() {
    const { key, leftModal } = this.props;
    const { content, borderColorButton, borderWidthButton,
      margin, padding, isButton,
      background, fontSize, fonts, lineText,
      letterSpacing, textAlign, tranform, color, borderRadius,
      fontWeight
    } = this.state;
    const divStyle = {
      textAlign: textAlign,
      fontSize: fontSize,
    }
    const styleButton = {
      marginTop: `${margin[0]}%`,
      marginLeft: `${margin[1]}%`,
      marginRight: `${margin[2]}%`,
      marginBottom: `${margin[3]}%`,
      paddingTop: `${padding[0]}%`,
      paddingLeft: `${padding[1]}%`,
      paddingRight: `${padding[2]}%`,
      paddingBottom: `${padding[3]}%`,
      color: color,
      wordBreak: 'break-word',
      alignContent: 'center',
      background: background,
      fontSize: `${fontSize}px`,
      fontFamily: fonts,
      lineHeight: `${lineText}%`,
      letterSpacing: letterSpacing,
      textAlign: textAlign,
      textTransform: tranform,
      fontWeight: fontWeight,
      borderColor: borderColorButton,
      borderWidth: borderWidthButton,
      borderRadius: borderRadius
    }


    return (

      <div className="edittext  child-block" style={divStyle} >
        <div onClick={() => this.onChangeValue(true, 'isDesign')}>
          <Button

            key={key}
            className="ml-3"
            style={styleButton}
            value={isButton}
          >
            <span></span>{ReactHtmlParser(content)}

          </Button>
        </div>


        <Modal
          title="Button design"
          visible={this.state.isDesign}
          onOk={this.handleOk}
          onCancel={() => this.onChangeValue(false, 'isDesign')}
          className={leftModal ? " mt-3 float-left ml-5" : "float-right mr-3 mt-3"}
          style={leftModal ? { top: 40, left: 200 } : { top: 40 }}
          width={500}
          footer={[
            <Button key="ok" onClick={() => this.onChangeValue(false, 'isDesign')} type="primary">
              OK
            </Button>,
          ]}

        >
          <Tabs defaultActiveKey="1" >
            <TabPane tab="Edit text" key="1">

              <h6>Nội dung </h6>

              <Input style={{ borderRadius: 50 }} value={content} onChange={this.handleEditorChange} ></Input>

              <h6 className="mt-3">Đường dẫn </h6>
              <div className="d-flex flex-row mt-2">
                <Input style={{ borderRadius: 50 }} placeholder="Thêm đường link" onChange={this.OnChangeLink} ></Input>
              </div>




            </TabPane>

            <TabPane tab="Design" key="2">
              <EditText
                fonts={fonts}
                fontSize={fontSize}
                lineText={lineText}
                letterSpacing={letterSpacing}

                padding={padding}
                margin={margin}
                color={color}
                background={background}

                handleChangeFonts={(value) => this.onChangeValue(value, 'fonts')}
                handleChangeFontSize={(value) => this.onChangeValue(value, 'fontSize')}
                handleChangeLetterSpacing={(value) => this.onChangeValue(value, 'letterSpacing')}
                handleChangeLineHeight={(value) => this.onChangeValue(value, 'lineText')}

                handleChangeTextAlign={(value) => this.onChangeValue(value, 'textAlign')}
                handleChangeTextTranform={(value) => this.onChangeValue(value, 'tranform')}
              />

              <div className="mt-5 pl-2">
                <PaddingAndMargin
                  padding={padding}
                  margin={margin}
                  handleChangeMargin={(value) => this.onChangeValue(value, 'margin')}
                  handleChangePadding={(value) => this.onChangeValue(value, 'padding')}
                />
              </div>
              <div className="d-flex mt-5 pl-2">
                <ChangeColorModal
                  title="Change Text Color"
                  color={color}
                  handleChangeColor={(value) => this.onChangeValue(value, 'color')}
                />
                <ChangeColorModal
                  title="Change background"
                  color={background}
                  handleChangeColor={(value) => this.onChangeValue(value, 'background')}
                />
              </div>
              <div>
                <div className="mt-2">
                  <h6>Border Width</h6>
                  <Row>
                    <Col span={12}>
                      <Slider
                        min={0}
                        max={15}
                        onChange={(value) => this.onChangeValue(value, 'borderWidthButton')}
                        value={typeof borderWidthButton === 'number' ? borderWidthButton : 0}
                      />
                    </Col>
                    <Col span={2}>
                      <InputNumber
                        min={0}
                        max={15}
                        style={{ margin: '0 16px', borderRadius: '15px' }}
                        value={borderWidthButton}
                        onChange={(value) => this.onChangeValue(value, 'borderWidthButton')}
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
                <div className="mt-2">
                  <h6> border Radius</h6>
                  <Row>
                    <Col span={12}>
                      <Slider
                        min={0}
                        max={100}
                        onChange={(value) => this.onChangeValue(value, 'borderRadius')}
                        value={typeof borderRadius === 'number' ? borderRadius : 0}
                      />
                    </Col>
                    <Col span={2}>
                      <InputNumber
                        min={0}
                        max={100}
                        style={{ margin: '0 16px', borderRadius: '15px' }}
                        value={borderRadius}
                        onChange={(value) => this.onChangeValue(value, 'borderRadius')}
                      />
                    </Col>
                  </Row>

                </div>
              </div>
            </TabPane>
          </Tabs>
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

// const mapStateToProps = state => ({
//     // map state of store to props

// })

// const mapDispatchToProps = (dispatch) => ({

// });


export default connect(null, null)(ButtonBlock)
