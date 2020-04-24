import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontPicker from "font-picker-react";
import { SketchPicker } from 'react-color';

import {
    Row, Col, Slider, InputNumber, Select,
    Modal, Button,
} from 'antd';
import {
    BgColorsOutlined
} from '@ant-design/icons';


import PaddingAndMargin from './PaddingAndMargin';

const { Option } = Select;


class EditText extends Component {

    constructor(props) {
        super(props);
        this.state = {
            textColor: '',
            backgroundColor: '',
            isShowColorModal: false,
            isShowBackgroundModal: false,
            color: this.props.color,
            background: this.props.background,
        }
    }
    showColorModal = () => {
        const { isShowColorModal } = this.state;
        this.setState({
            isShowColorModal: !isShowColorModal
        })
    }
    showBackgoundModal = () => {
        const { isShowBackgroundModal } = this.state;
        this.setState({
            isShowBackgroundModal: !isShowBackgroundModal
        })
    }
    onChangeFonts = value => {
        const { handleChangeFonts } = this.props;
        if (!handleChangeFonts) return;
        handleChangeFonts(value);
    }
    onChangeFontSize = value => {
        const { handleChangeFontSize } = this.props;
        if (!handleChangeFontSize) return;
        handleChangeFontSize(value);
    }
    onChangeLetterSpacing = value => {
        const { handleChangeLetterSpacing } = this.props;
        if (!handleChangeLetterSpacing) return;
        handleChangeLetterSpacing(value);
    }

    onChangeLineHeight = value => {
        const { handleChangeLineHeight } = this.props;
        if (!handleChangeLineHeight) return;
        handleChangeLineHeight(value);
    }

    onChangeTextAlign = value => {
        const { handleChangeTextAlign } = this.props;
        if (!handleChangeTextAlign) return;
        handleChangeTextAlign(value);
    }
    onChangeTextTranform = value => {
        const { handleChangeTextTranform } = this.props;
        if (!handleChangeTextTranform) return;
        handleChangeTextTranform(value);
    }

    onChangeTextColor = color => {
        const { handleChangeTextColor } = this.props;
        this.setState({

            color: color.hex,
            isShowColorModal: false,

        })
        handleChangeTextColor(this.state.color)

    }

    onChangeBackground = color => {
        const { handleChangeBackground } = this.props;
        this.setState({

            background: color.hex,
            isShowBackgroundModal: false,
        })
        handleChangeBackground(this.state.background)
    }

    onChangeMargin = value => {
        const { handleChangeMargin } = this.props;
        handleChangeMargin(value);
    }

    onChangePadding = value => {
        const { handleChangePadding } = this.props;
        handleChangePadding(value);
    }


    render() {
        const {
            fonts,
            fontSize,
            lineText,
            letterSpacing,
            padding, margin,

        } = this.props;

        const { isShowColorModal, isShowBackgroundModal, background, color } = this.state;

        return (
            <div className="pl-5">

                <div className="mt-2 d-flex" >
                    <h6 className="mr-5">Fonts</h6>

                    <FontPicker className="ml-5" style={{ width: '100%' }}
                        apiKey="AIzaSyB8e2BPKdZDsrXUC4sPv9gG6IzMpwf9GtY"
                        activeFontFamily={fonts}
                        onChange={nextFont => this.onChangeFonts(nextFont.family)}
                    />
                </div>

                <div className="mt-4">
                    <h6>Font size(px)</h6>
                    <Row>
                        <Col span={12}>
                            <Slider
                                min={6}
                                max={176}
                                onChange={this.onChangeFontSize}
                                value={fontSize}
                            />
                        </Col>
                        <Col span={2}>
                            <InputNumber
                                min={6}
                                max={176}
                                style={{ margin: '0 16px', borderRadius: '15px' }}
                                value={fontSize}
                                onChange={this.onChangeFontSize}
                            />
                        </Col>
                    </Row>
                </div>

                <div className="mt-4">
                    <h6>Line Height(%)</h6>
                    <Row>
                        <Col span={12}>
                            <Slider
                                min={80}
                                max={200}
                                onChange={this.onChangeLineHeight}
                                value={lineText}
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

                <div className="mt-4">
                    <h6>Letter Spacing (px) </h6>
                    <Row>
                        <Col span={12}>
                            <Slider
                                min={-2}
                                max={10}
                                onChange={this.onChangeLetterSpacing}
                                value={letterSpacing}
                            />
                        </Col>
                        <Col span={2}>
                            <InputNumber
                                min={-2}
                                max={10}
                                style={{ margin: '0 16px', borderRadius: '15px' }}
                                value={letterSpacing}
                                onChange={this.onChangeLetterSpacing}
                            />
                        </Col>
                    </Row>
                </div>

                <div className="d-flex mt-4">
                    <div className="mr-5">
                        <h6>Text Align</h6>
                        <Select style={{ width: '200px' }} onChange={this.onChangeTextAlign} defaultValue="left">
                            <Option value="left">left</Option>
                            <Option value="center">center</Option>
                            <Option value="right">right</Option>
                            <Option value="justify">justify</Option>
                        </Select>
                    </div>

                    <div className="ml-5"  >
                        <h6>Text Tranform</h6>
                        <Select style={{ width: '200px' }} onChange={this.onChangeTextTranform} defaultValue="none">
                            <Option value="none">none</Option>
                            <Option value="uppercase">uppercase</Option>
                            <Option value="lowercase">lowercase</Option>
                            <Option value="capitalize">capitalize</Option>
                        </Select>
                    </div>

                </div>

                <div className="mt-4 d-flex">
                    <div className=" d-flex mr-5">
                        <h6>Color</h6>
                        <BgColorsOutlined style={{ height: '50px', width: '50px' }} onClick={this.showColorModal} />

                    </div>
                    <div className=" d-flex ml-5 ">
                        <h6>background</h6>
                        <BgColorsOutlined style={{ height: '50px', width: '50px' }} onClick={this.showBackgoundModal} />

                    </div>

                </div>


                <PaddingAndMargin
                    padding={padding}
                    margin={margin}
                    handleChangeMargin={this.onChangeMargin}
                    handleChangePadding={this.onChangePadding}
                />





                <Modal
                    title="Text design"
                    visible={isShowColorModal}
                    onCancel={this.showColorModal}
                    width={300}
                    style={{ marginLeft: 820 }}
                    footer={[
                        <Button key="ok" onClick={this.onChangeTextColor} type="primary">
                            OK
                        </Button>,
                    ]}
                >
                    <SketchPicker color={color}
                        onChangeComplete={this.onChangeTextColor} />

                </Modal>

                <Modal
                    title="Text design"
                    visible={isShowBackgroundModal}
                    onCancel={this.showBackgoundModal}
                    width={300}
                    style={{ marginLeft: 820 }}
                    footer={[
                        <Button key="ok" onClick={this.onChangeBackground} type="primary">
                            OK
                        </Button>,
                    ]}
                >
                    <SketchPicker color={background}
                        onChangeComplete={this.onChangeBackground} />

                </Modal>

            </div>
        );
    }
}


EditText.propTypes = {
    fonts: PropTypes.string,
    fontSize: PropTypes.number,
    lineText: PropTypes.number,
    letterSpacing: PropTypes.number,

    padding: PropTypes.array,
    margin: PropTypes.array,
    color: PropTypes.string,
    background: PropTypes.string,

    handleChangeFonts: PropTypes.func,
    handleChangeFontSize: PropTypes.func,
    handleChangeLetterSpacing: PropTypes.func,
    handleChangeLineHeight: PropTypes.func,

    handleChangeTextAlign: PropTypes.func,
    handleChangeTextTranform: PropTypes.func,
    handleChangeTextColor: PropTypes.func,
    handleChangeBackground: PropTypes.func,

    handleChangeMargin: PropTypes.func,
    handleChangePadding: PropTypes.func,

};




export default EditText;
