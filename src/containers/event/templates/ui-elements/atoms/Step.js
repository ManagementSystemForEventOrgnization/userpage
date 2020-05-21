import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Steps, Modal, Tabs, Select } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

import { v4 as uuid } from 'uuid';

import TextBlock from '../atoms/Text';
import EditText from '../shares/EditText';
import { StepState } from '../stateInit/StepState';
import { Step, TabPane, Option } from '../../constants/atom.constant';
import { eventActions } from 'action/event.action';

class StepBlock extends Component {
  constructor(props) {
    super(props);
    const { style } = this.props;
    this.state = style
      ? { ...style }
      : {
          ...StepState(this.props),
        };
  }
  componentDidMount = () => {
    const { editable } = this.props;
    if (editable) {
      this.handleStoreBlock();
    }
  };

  // common function
  onChangeValue(newValue, valueParam) {
    this.setState({
      [valueParam]: newValue,
    });
    this.handleStoreBlock();
  }

  removeOption = (item) => {
    const steps = this.state.steps.filter((e) => e.id !== item.id);
    this.setState({
      steps,
    });

    this.handleStoreBlock();
  };

  OnClickOption = (e) => {
    const { isAddOption } = this.state;
    this.setState({
      isAddOption: !isAddOption,
    });
  };

  onClickAdd = (id) => {
    const { steps } = this.state;
    const item = steps.find((ele) => ele.id === id);
    // const index = steps.indexOf(item);
    steps.push({
      id: uuid(),
      title: item.title,
      description: item.description,
    });
    this.setState({
      steps,
    });

    this.handleStoreBlock();
  };

  handleOnChangeTextBlock = (id, value) => {
    const { steps } = this.state;
    const item = steps.find((ele) => ele.id === id);
    const index = steps.indexOf(item);

    item.title = value;
    if (index === -1) return;
    else {
      this.setState({
        steps: [
          ...steps.slice(0, index),
          item,
          ...steps.slice(index + 1, steps.length),
        ],
        txtname: '',
        txtdescription: '',
      });
    }
    this.handleStoreBlock();
  };

  handleOnChangeDesTextBlock = (id, value) => {
    const { steps } = this.state;
    const item = steps.find((ele) => ele.id === id);
    const index = steps.indexOf(item);

    item.description = value;
    if (index === -1) return;
    else {
      this.setState({
        steps: [
          ...steps.slice(0, index),
          item,
          ...steps.slice(index + 1, steps.length),
        ],
        txtname: '',
        txtdescription: '',
      });
    }

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
    const { key, editable } = this.props;
    const {
      steps,
      margin,
      padding,
      background,
      fontSize,
      fonts,
      lineText,
      letterSpacing,
      color,
      current,
      textAlign,
      tranform,
    } = this.state;
    const divStyle = {
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
    };
    return (
      <div className="child-block" style={divStyle}>
        <Steps
          size="small"
          current={current}
          key={key}
          onClick={() => this.onChangeValue(true, 'visible')}
        >
          {steps.map((step) => (
            <Step
              key={step.id}
              title={step.title}
              description={step.description}
            />
          ))}
        </Steps>

        {editable && (
          <Modal
            title="Step Modal"
            visible={this.state.visible}
            onOk={() => this.onChangeValue(false, 'visible')}
            onCancel={() => this.onChangeValue(false, 'visible')}
          >
            <Tabs defaultActiveKey="1">
              <TabPane tab="Text" key="1">
                <div className="mt-3 d-flex">
                  <h6 className="mr-5">Current Step : </h6>
                  <Select
                    placeholder="Choose current step"
                    onChange={(value) => this.onChangeValue(value, 'current')}
                    className="ml-5"
                  >
                    {steps.map((item, index) => (
                      <Option key={item} value={index}>
                        {index + 1}
                      </Option>
                    ))}
                  </Select>
                </div>
                {steps.map((step) => (
                  <div key={step.id} className="mt-3">
                    <div className="d-flex row">
                      <div className="col">
                        <TextBlock
                          content={step.title}
                          id={step.id}
                          child={true}
                          handleOnChangeTextBlock={this.handleOnChangeTextBlock}
                        />
                      </div>
                      <div className="col">
                        <PlusOutlined
                          onClick={() => this.onClickAdd(step.id)}
                        />
                        <DeleteOutlined
                          className="ml-5"
                          onClick={() => this.removeOption(step)}
                        />
                      </div>
                    </div>
                    <TextBlock
                      content={step.description}
                      id={step.id}
                      child={true}
                      handleOnChangeTextBlock={this.handleOnChangeDesTextBlock}
                    />
                  </div>
                ))}
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
                  handleChangeTextColor={(value) =>
                    this.onChangeValue(value, 'color')
                  }
                  handleChangeBackground={(value) =>
                    this.onChangeValue(value, 'background')
                  }
                  handleChangeMargin={(value) =>
                    this.onChangeValue(value, 'margin')
                  }
                  handleChangePadding={(value) =>
                    this.onChangeValue(value, 'padding')
                  }
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(StepBlock);
