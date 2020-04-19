import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontPicker from "font-picker-react";
import { SketchPicker } from 'react-color';

EditTextModal.propTypes = {
    fonts: PropTypes.number.isRequired,
    fontSize: PropTypes.number.isRequired,
    lineText: PropTypes.number.isRequired,
    letterText: PropTypes.number.isRequired,
    handleChangeFonts: PropTypes.func.isRequired,
    handleChangeFontSize: PropTypes.func.isRequired,
    handleChangeLetterSpacing: PropTypes.func.isRequired,
    handleChangeLineHeight: PropTypes.func.isRequired,
    handleChangeTextAlign: PropTypes.func.isRequired,
    handleChangeTextTranform: PropTypes.func.isRequired,
    handleChangeTextColor: PropTypes.func.isRequired,
    handleChangeBackground: PropTypes.func.isRequired,

};

class EditTextModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            textColor: '',
            backgroundColor: '',
            isShowColorModal: false,
            isShowBackgroundModal: false,
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
    render() {
        const {
            fonts, handleChangeFonts,
            fontSize, handleChangeFontSize,
            lineText, handleChangeLineHeight,
            letterText, handleChangeLetterSpacing,
            handleChangeTextAlign,
            handleChangeTextTranform,
            handleChangeBackground,
            handleChangeTextColor

        } = this.props;

        const { isShowColorModal, isShowBackgroundModal } = this.state;

        return (
            <div>
                <div className="mt-2" >
                    <h6>Fonts</h6>
                    <div className=" d-flex flex-row">

                        <FontPicker style={{ width: '100%' }}
                            apiKey="AIzaSyB8e2BPKdZDsrXUC4sPv9gG6IzMpwf9GtY"
                            activeFontFamily={fonts}
                            onChange={handleChangeFonts}
                        />

                    </div>

                    <div className="mt-2">
                        <h6>Font size(px)</h6>
                        <Row>
                            <Col span={12}>
                                <Slider
                                    min={6}
                                    max={176}
                                    onChange={handleChangeFontSize}
                                    value={fontSize}
                                />
                            </Col>
                            <Col span={2}>
                                <InputNumber
                                    min={6}
                                    max={176}
                                    style={{ margin: '0 16px', borderRadius: '15px' }}
                                    value={fontSize}
                                    onChange={handleChangeFontSize}
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
                                    onChange={handleChangeLineHeight}
                                    value={lineText}
                                />
                            </Col>
                            <Col span={2}>
                                <InputNumber
                                    min={80}
                                    max={200}
                                    style={{ margin: '0 16px', borderRadius: '15px' }}
                                    value={lineText}
                                    onChange={handleChangeLineHeight}
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
                                    onChange={handleChangeLetterSpacing}
                                    value={letterText}
                                />
                            </Col>
                            <Col span={2}>
                                <InputNumber
                                    min={-2}
                                    max={10}
                                    style={{ margin: '0 16px', borderRadius: '15px' }}
                                    value={letterText}
                                    onChange={handleChangeLetterSpacing}
                                />
                            </Col>
                        </Row>
                    </div>
                    <div className="mt-2">
                        <h6>Text Align</h6>
                        <Select style={{ width: '100%' }} onChange={handleChangeTextAlign}>
                            <Option value="left">left</Option>
                            <Option value="center">center</Option>
                            <Option value="right">right</Option>
                            <Option value="justify">justify</Option>
                        </Select>
                    </div>
                    <div className="mt-2"  >
                        <h6>Text Tranform</h6>
                        <Select style={{ width: '100%' }} onChange={handleChangeTextTranform}>
                            <Option value="none">none</Option>
                            <Option value="uppercase">uppercase</Option>
                            <Option value="lowercase">lowercase</Option>
                            <Option value="capitalize">capitalize</Option>
                        </Select>
                    </div>

                </div>
                <div className="mt-2 d-flex flex-row">
                    <h6>Color</h6>
                    <BgColorsOutlined style={{ height: '50px', width: '50px' }} onClick={this.showColorModal} />

                </div>
                <div className="mt-2 d-flex flex-row">
                    <h6>background</h6>
                    <BgColorsOutlined style={{ height: '50px', width: '50px' }} onClick={this.showBackgoundModal} />

                </div>

                <Modal
                    title="Text design"
                    visible={isShowColorModal}
                    onCancel={this.showColorModal}
                    width={300}
                    style={{ marginLeft: 820 }}
                    footer={[
                        <Button key="ok" onClick={handleChangeTextColor} type="primary">
                            OK
                        </Button>,
                    ]}
                >
                    <SketchPicker color={textColor}
                        onChangeComplete={handleChangeTextColor} />

                </Modal>

                <Modal
                    title="Text design"
                    visible={isShowBackgroundModal}
                    onCancel={this.showBackgoundModal}
                    width={300}
                    style={{ marginLeft: 820 }}
                    footer={[
                        <Button key="ok" onClick={handleChangeBackground} type="primary">
                            OK
                        </Button>,
                    ]}
                >
                    <SketchPicker color={textColor}
                        onChangeComplete={handleChangeBackground} />

                </Modal>

            </div>
        );
    }
}



export default EditTextModal;