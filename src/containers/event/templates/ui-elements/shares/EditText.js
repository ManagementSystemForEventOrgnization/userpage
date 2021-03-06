import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Slider, InputNumber, Select } from 'antd';

const { Option } = Select;

class EditText extends Component {
  onChangeFontSize = (value) => {
    const { handleChangeFontSize } = this.props;
    if (!handleChangeFontSize) return;
    handleChangeFontSize(value);
  };
  onChangeLetterSpacing = (value) => {
    const { handleChangeLetterSpacing } = this.props;
    if (!handleChangeLetterSpacing) return;
    handleChangeLetterSpacing(value);
  };

  onChangeLineHeight = (value) => {
    const { handleChangeLineHeight } = this.props;
    if (!handleChangeLineHeight) return;
    handleChangeLineHeight(value);
  };

  onChangeTextAlign = (value) => {
    const { handleChangeTextAlign } = this.props;
    if (!handleChangeTextAlign) return;
    handleChangeTextAlign(value);
  };
  onChangeTextTranform = (value) => {
    const { handleChangeTextTranform } = this.props;
    if (!handleChangeTextTranform) return;
    handleChangeTextTranform(value);
  };

  render() {
    const {
      fontSize,
      lineText,
      letterSpacing,
      handleChangeTextAlign,
      handleChangeTextTranform,
    } = this.props;
    return (
      <div className="pl-2">
        {fontSize && (
          <div className="mt-5">
            <Row>
              <Col span={6}>
                <h6>Font size(px)</h6>
              </Col>
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
        )}

        {lineText && (
          <div className="mt-4">
            <Row>
              <Col span={6}>
                <h6>Line Height(%)</h6>
              </Col>
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
        )}

        {typeof letterSpacing === 'number' && (
          <div className="mt-4">
            <Row>
              <Col span={6}>
                <h6>Letter Spacing (px) </h6>
              </Col>
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
        )}

        <div className="d-flex mt-4">
          {handleChangeTextAlign && (
            <div className="mr-2">
              <h6>Text Align</h6>
              <Select
                style={{ width: '200px' }}
                onChange={this.onChangeTextAlign}
                defaultValue="left"
              >
                <Option value="left">left</Option>
                <Option value="center">center</Option>
                <Option value="right">right</Option>
                <Option value="justify">justify</Option>
              </Select>
            </div>
          )}

          {handleChangeTextTranform && (
            <div className="ml-2">
              <h6>Text Tranform</h6>
              <Select
                style={{ width: '200px' }}
                onChange={this.onChangeTextTranform}
                defaultValue="none"
              >
                <Option value="none">none</Option>
                <Option value="uppercase">uppercase</Option>
                <Option value="lowercase">lowercase</Option>
                <Option value="capitalize">capitalize</Option>
              </Select>
            </div>
          )}
        </div>
      </div>
    );
  }
}

EditText.propTypes = {
  lineText: PropTypes.number,
  letterSpacing: PropTypes.number,

  handleChangeFonts: PropTypes.func,
  handleChangeFontSize: PropTypes.func,
  handleChangeLetterSpacing: PropTypes.func,
  handleChangeLineHeight: PropTypes.func,

  handleChangeTextAlign: PropTypes.func,
  handleChangeTextTranform: PropTypes.func,
};

export default EditText;
