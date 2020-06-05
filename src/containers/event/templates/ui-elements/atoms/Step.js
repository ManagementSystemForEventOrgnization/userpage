import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Steps, Modal, Timeline } from 'antd';

import { v4 as uuid } from 'uuid';
import moment from 'moment';

import EditText from '../shares/EditText';
import { StepState } from '../stateInit/StepState';
import { Step } from '../../constants/atom.constant';
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
    setTimeout(this.handleStoreBlock(), 3000);
  }

  removeOption = (item) => {
    const steps = this.state.steps.filter((e) => e.id !== item.id);
    this.setState({
      steps,
    });

    setTimeout(this.handleStoreBlock(), 3000);
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
    steps.push({
      id: uuid(),
      title: item.title,
      description: item.description,
    });
    this.setState({
      steps,
    });
    setTimeout(this.handleStoreBlock(), 3000);
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
    setTimeout(this.handleStoreBlock(), 3000);
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

    setTimeout(this.handleStoreBlock(), 3000);
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
    const { key, editable, session } = this.props;
    const {
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
      <div className="child-block mt-5 mb-5 pt-5" style={divStyle}>
        {session.map((ss) => (
          <div className="child-block mt-2 mb-2">
            <h6>Session {moment(ss.day).format('LLLL')}</h6>

            <Timeline mode="left" key={ss.id}>
              {ss.detail.map((item) => (
                <Timeline.Item label={`From ${item.from} to ${item.to}`}>
                  {item.description}
                </Timeline.Item>
              ))}
            </Timeline>
          </div>
        ))}

        {/* 
        <Steps
          size="small"
          current={current}
          key={key}
          onClick={() => this.onChangeValue(true, 'visible')}
        >
          {session.map((ss) => (
            <Step
              key={ss.id}
              title={moment(ss.day).format('DD/MM/YYYY')}
              description={ss.name}
            />
          ))}
        </Steps> */}

        {editable && (
          <Modal
            title="Step Modal"
            visible={this.state.visible}
            onOk={() => this.onChangeValue(false, 'visible')}
            onCancel={() => this.onChangeValue(false, 'visible')}
          >
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
          </Modal>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  blocks: state.event.blocks,
  session: state.event.session,
});

const mapDispatchToProps = (dispatch) => ({
  storeBlocksWhenCreateEvent: (blocks) =>
    dispatch(eventActions.storeBlocksWhenCreateEvent(blocks)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepBlock);
