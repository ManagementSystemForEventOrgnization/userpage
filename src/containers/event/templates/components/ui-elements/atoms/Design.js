import React, { Component } from 'react'
import TextBlocks from '../atoms/Text';
import { v4 as uuid } from "uuid";
import FontPicker from "font-picker-react";
import { SketchPicker } from 'react-color';
import {
    Modal, Button,
    Col, Slider, Row, InputNumber, Select,
} from 'antd';
import { BgColorsOutlined } from '@ant-design/icons';

const { Option } = Select;

let index = 0;
class DesignBlock extends Component {
    constructor(props) {
        super(props)
        const { inputValue, activeFontFamily, lineText, letterText, align, tranform, background, color } = this.props;
        this.state = {
            background: background ? background : "white",
            inputValue: inputValue ? inputValue : 20,
            showColor: false,
            isDesign: false,
            activeFontFamily: activeFontFamily ? activeFontFamily : "Open Sans",
            lineText: lineText ? lineText : 80,
            letterText: letterText ? letterText : -2,
            align: align ? align : '',
            tranform: tranform ? tranform : ' ',
            color: color ? color : "black",

            visible: false,
            isShowAdd: false,


        }
    }

    handleEditMenu = (e) => {
        const { visible } = this.state;
        this.setState({
            visible: !visible
        });
    }
    OnClickOption = (e) => {
        const { isShowAdd } = this.state;
        this.setState({
            isShowAdd: !isShowAdd
        });

    };

    //color
    handleChangeComplete = (color) => {
        const { onChangeBackground } = this.props;

        this.setState({ background: color.hex });
        onChangeBackground(color.hex);
        console.log("dd", color.hex);
    };
    handleChangeCompletecolor = (color) => {
        this.setState({ color: color.hex });
    };
    // textalign
    onChangeTextAlign = (value) => {
        this.setState({
            align: value
        })
    }
    // tranform
    onChangeTextTranform = (value) => {
        this.setState({
            tranform: value
        })
    }
    // open color
    onClickColor = e => {
        const { showColor } = this.state
        this.setState({
            showColor: !showColor
        });
    };
    //font size
    onChange = value => {
        this.setState({
            inputValue: value,
        });
        console.log("dd ", this.state.inputValue);
    };

    // lineheight
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
    showModalButton = () => {
        const { isDesign } = this.state;
        this.setState({
            isDesign: !isDesign
        });
    };


    render() {
        const { inputValue, lineText, letterText, } = this.state;

        return (
            <div>



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

                </div>
                <div className="mt-2 d-flex flex-row">
                    <h6>background</h6>
                    <BgColorsOutlined style={{ height: '50px', width: '50px' }} onClick={this.showModalButton} />

                </div>
                <Modal
                    title="Text design"
                    visible={this.state.isDesign}

                    onCancel={this.showModalButton}
                    width={300}
                    style={{ marginLeft: 820 }}
                    footer={[
                        <Button key="ok" onClick={this.showModalButton} type="primary">
                            OK
                               </Button>,
                    ]}

                >
                    <SketchPicker color={this.state.background}
                        onChangeComplete={this.handleChangeComplete} />

                </Modal>

                <Modal
                    title="Text design"
                    visible={this.state.showColor}

                    onCancel={this.onClickColor}
                    width={300}
                    style={{ marginLeft: 820 }}
                    footer={[
                        <Button key="ok" onClick={this.onClickColor} type="primary">
                            OK
                               </Button>,
                    ]} >

                    <SketchPicker color={this.state.color}
                        onChangeComplete={this.handleChangeCompletecolor} />

                </Modal>




            </div>
        )
    }
}

export default DesignBlock;
