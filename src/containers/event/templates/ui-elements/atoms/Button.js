import React from 'react';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import {
  Button,
  Modal,
  Input,
  Tabs,
  Slider,
  InputNumber,
  Row,
  Col,
  Select,
} from 'antd';

import EditText from '../shares/EditText';
import PaddingAndMargin from '../shares/PaddingAndMargin';
import ChangeColorModal from '../shares/ChangeColorModal';

import { ButtonState } from '../stateInit/ButtonState';
import { TabPane } from '../../constants/atom.constant';
import { eventActions } from 'action/event.action';

const { Option } = Select;
const borderStyles = ['dashed', 'dotted', 'solid', 'hidden'];
class ButtonBlock extends React.Component {
  constructor(props) {
    super(props);
    const { style } = this.props;
    this.state = style
      ? { ...style }
      : {
          ...ButtonState(this.props),
        };
  }
  showModalBorderColor = () => {
    const { isBorderColor } = this.state;
    this.setState({
      isBorderColor: !isBorderColor,
    });
  };

  componentDidMount = () => {
    const { editable } = this.props;
    if (editable) {
      this.handleStoreBlock();
    }
  };

  onCollapseModal = () => {
    const { isDesign } = this.state;
    this.setState({
      isDesign: !isDesign,
    });
  };
  // common function
  onChangeValue(newValue, valueParam) {
    this.setState({
      [valueParam]: newValue,
    });
    this.handleStoreBlock();
  }

  handleEditorChange = (e) => {
    this.setState({ content: e.target.value });

    // const { id, handleOnChangeButtonTextBlock } = this.props; // because buttonBlock always has id
    // if (id) {
    //   handleOnChangeButtonTextBlock(id, this.state.content);
    // }
    this.handleStoreBlock();
  };

  handleStoreBlock = () => {
    const { blocks, storeBlocksWhenCreateEvent, id } = this.props;
    const currentStyle = this.state;

    let item = blocks.find((ele) => ele.id === id);
    if (item) {
      const index = blocks.indexOf(item);
      item.style = currentStyle;
      storeBlocksWhenCreateEvent([
        ...blocks.slice(0, index),
        item,
        ...blocks.slice(index + 1, blocks.length),
      ]);
    }
  };

  render() {
    const { key, leftModal, editable } = this.props;
    const {
      content,
      borderWidthButton,
      borderColorButton,
      margin,
      padding,
      isButton,
      background,
      fontSize,
      fonts,
      lineText,
      letterSpacing,
      textAlign,
      tranform,
      color,
      borderRadius,
      fontWeight,
      isDesign,
      borderStyle,
    } = this.state;

    const divStyle = {
      textAlign: textAlign,
      fontSize: fontSize,
    };
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
      background: background,

      alignContent: 'center',
      fontSize: `${fontSize}px`,
      fontFamily: fonts,
      lineHeight: `${lineText}%`,
      letterSpacing: letterSpacing,
      textAlign: textAlign,
      textTransform: tranform,
      fontWeight: fontWeight,
      borderColor: borderColorButton,
      borderWidth: `${borderWidthButton}px`,
      borderRadius: `${borderRadius}%`,
      borderStyle: borderStyle,
    };

    return (
      <div className="edittext  child-block" style={divStyle}>
        <div onClick={this.onCollapseModal}>
          <Button
            key={key}
            className="ml-3"
            style={styleButton}
            value={isButton}
          >
            <span></span>
            {ReactHtmlParser(content)}
          </Button>
        </div>
        {editable && (
          <Modal
            title="Button design"
            visible={isDesign}
            onCancel={this.onCollapseModal}
            className={
              leftModal ? ' mt-3 float-left ml-5' : 'float-right mr-3 mt-3'
            }
            style={leftModal ? { top: 40, left: 200 } : { top: 40 }}
            width={500}
            footer={[
              <Button
                key="ok"
                onClick={() => this.onChangeValue(false, 'isDesign')}
                type="primary"
              >
                OK
              </Button>,
            ]}
          >
            <Tabs defaultActiveKey="1">
              <TabPane tab="Edit text" key="1">
                <h6>Nội dung </h6>

                <Input
                  style={{ borderRadius: 50 }}
                  value={content}
                  onChange={this.handleEditorChange}
                ></Input>

                <h6 className="mt-3">Đường dẫn </h6>
                <div className="d-flex flex-row mt-2">
                  <Input
                    style={{ borderRadius: 50 }}
                    placeholder="Thêm đường link"
                    onChange={this.OnChangeLink}
                  ></Input>
                </div>
              </TabPane>

              <TabPane tab="Design" key="2">
                <EditText
                  fonts={fonts}
                  fontSize={fontSize}
                  lineText={lineText}
                  letterSpacing={letterSpacing}
                  handleChangeFonts={(value) =>
                    this.onChangeValue(value, 'fonts')
                  }
                  handleChangeFontSize={(value) =>
                    this.onChangeValue(value, 'fontSize')
                  }
                  handleChangeLetterSpacing={(value) =>
                    this.onChangeValue(value, 'letterSpacing')
                  }
                  handleChangeLineHeight={(value) =>
                    this.onChangeValue(value, 'lineText')
                  }
                  handleChangeTextAlign={(value) =>
                    this.onChangeValue(value, 'textAlign')
                  }
                  handleChangeTextTranform={(value) =>
                    this.onChangeValue(value, 'tranform')
                  }
                />

                <div className="mt-5 pl-2">
                  <PaddingAndMargin
                    padding={padding}
                    margin={margin}
                    handleChangeMargin={(value) =>
                      this.onChangeValue(value, 'margin')
                    }
                    handleChangePadding={(value) =>
                      this.onChangeValue(value, 'padding')
                    }
                  />
                </div>

                <div className="d-flex mt-5 pl-2">
                  <ChangeColorModal
                    title="Change Text Color"
                    color={color}
                    handleChangeColor={(value) =>
                      this.onChangeValue(value, 'color')
                    }
                  />
                  <ChangeColorModal
                    title="Change background"
                    color={background}
                    handleChangeColor={(value) =>
                      this.onChangeValue(value, 'background')
                    }
                  />
                </div>

                <div className="mt-5 ">
                  <h6>Border </h6>

                  <div className="d-flex">
                    <Select
                      style={{ width: '150px', height: '40px' }}
                      onChange={(value) =>
                        this.onChangeValue(value, 'borderStyle')
                      }
                      defaultValue="solid"
                    >
                      {borderStyles.map((item, index) => (
                        <Option value={item} key={index}>
                          {item}
                        </Option>
                      ))}
                    </Select>

                    <InputNumber
                      min={0}
                      max={15}
                      value={borderWidthButton}
                      style={{
                        margin: '0 16px',
                        height: '35px',
                        borderRadius: '15px',
                      }}
                      onChange={(value) =>
                        this.onChangeValue(value, 'borderWidthButton')
                      }
                    />

                    <ChangeColorModal
                      title="Color : "
                      color={borderColorButton}
                      handleChangeColor={(value) =>
                        this.onChangeValue(value, 'borderColorButton')
                      }
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <h6> border Radius</h6>
                  <Row>
                    <Col span={12}>
                      <Slider
                        min={0}
                        max={100}
                        onChange={(value) =>
                          this.onChangeValue(value, 'borderRadius')
                        }
                        value={borderRadius}
                      />
                    </Col>
                    <Col span={2}>
                      <InputNumber
                        min={0}
                        max={100}
                        style={{ margin: '0 16px', borderRadius: '15px' }}
                        value={borderRadius}
                        onChange={(value) =>
                          this.onChangeValue(value, 'borderRadius')
                        }
                      />
                    </Col>
                  </Row>
                </div>
              </TabPane>
            </Tabs>
          </Modal>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  blocks: state.event.blocks,
});

const mapDispatchToProps = (dispatch) => ({
  storeBlocksWhenCreateEvent: (blocks) =>
    dispatch(eventActions.storeBlocksWhenCreateEvent(blocks)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonBlock);
