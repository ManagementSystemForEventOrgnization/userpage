import React from 'react';
import { connect } from 'react-redux';
import { Modal, Select, InputNumber, Button } from 'antd';
import { SketchPicker } from 'react-color';
import { buttonWidth, Option } from '../../constants/atom.constant';
import { TimerState } from '../stateInit/TimerState';

import { eventActions } from 'action/event.action';
import IconsHandle from '../shares/IconsHandle';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    const { style } = this.props;

    this.state = style
      ? { ...style }
      : {
          ...TimerState(this.props),
        };
  }

  componentDidMount() {
    let startCount = '';
    const currentDay = new Date();
    this.props.session.forEach((infor) => {
      if (new Date(infor.day) > currentDay) {
        startCount = infor.day;
        return;
      }
    });

    if (startCount === '') return;
    this.setState({
      ...this.calculateTimeLeft(startCount),
    });

    this.myInterval = setInterval(() => {
      this.setState((prevState) => ({
        prevState,
        ...this.calculateTimeLeft(startCount),
      }));
    }, 999);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  calculateTimeLeft = (startCount) => {
    const difference = +new Date(startCount) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  timerComponents = () => {
    const timerComponents = [];

    Object.keys(this.state).forEach((interval) => {
      if (!this.state[interval]) {
        return;
      }

      timerComponents.push(
        <div className="col">
          <h2> {this.state[interval]}</h2>
          {interval}
        </div>
      );
    });
    return timerComponents;
  };

  // common function
  onChangeValue(newValue, valueParam) {
    this.setState({
      [valueParam]: newValue,
    });
  }

  closeModal = () => {
    this.setState({ visible: false });
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

  handleDuplicate = () => {
    const { id, duplicateBlock } = this.props;
    if (duplicateBlock) {
      duplicateBlock(id);
    }
  };

  handleDelete = () => {
    const { id, deleteBlock } = this.props;
    if (deleteBlock) {
      deleteBlock(id);
    }
  };

  render() {
    const { key, style, editable } = this.props;
    const {
      topButton,
      leftButton,
      rightButton,
      bottomButton,
      positionButton,
      backgroundColor,
    } = this.state;
    const divStyle = style
      ? style
      : {
          position: positionButton,
          top: topButton,
          marginLeft: leftButton,
          marginRight: rightButton,
          marginTop: topButton,
          marginBottom: bottomButton,
          alignContent: 'center',
          backgroundColor,
          width: '100%',
        };

    const countDownStyle = {
      backgroundColor: '#18478b',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '25px',
      borderRadius: ' 6px',
    };
    const timeStyle = {
      fontWeight: 'bolder',
      fontSize: '35px',
    };
    return (
      <div className="child-block" key={this.props.key}>
        <div key={key} style={divStyle} className="d-flex ">
          <div
            className="d-flex justify-content-around  border  flex-fill mr-1 p-2 pl-5 pr-5"
            style={countDownStyle}
          >
            <div className="">
              <h2
                style={{
                  ...timeStyle,
                  color: 'yellow',
                }}
              >
                {' '}
                {this.state.days}{' '}
              </h2>
              DAYS
            </div>
            <div className="">
              <h2
                style={{
                  ...timeStyle,
                  color: '#ff5808',
                }}
              >
                {' '}
                {this.state.hours}
              </h2>
              HOURS
            </div>
            <div className="">
              <h2
                style={{
                  ...timeStyle,
                  color: '#0df3e8',
                }}
              >
                {' '}
                {this.state.minutes}
              </h2>
              MINUTES
            </div>
            <div className="">
              <h2
                style={{
                  ...timeStyle,
                  color: '#08ff26',
                }}
              >
                {' '}
                {this.state.seconds}
              </h2>
              SECONDS
            </div>
          </div>

          {editable && (
            <IconsHandle
              collapseModal={() => this.onChangeValue(true, 'visible')}
              handleDuplicate={this.handleDuplicate}
              handleDelete={this.handleDelete}
            />
          )}
        </div>

        {editable && (
          <Modal
            title="Text"
            visible={this.state.visible}
            onCancel={this.closeModal}
            width={500}
            className="float-right mr-3 mt-3"
            style={{ top: 40 }}
            footer={[
              <Button key="ok" onClick={this.closeModal} type="primary">
                OK
              </Button>,
            ]}
          >
            <div className="mt-2">
              <div className="d-flex mb-3">
                <h6>Vị trí : </h6>
                <Select
                  defaultValue={style ? 'absolute' : 'relative'}
                  className="ml-auto"
                  style={{ width: '60%' }}
                  onChange={(value) =>
                    this.onChangeValue(value, 'positionButton')
                  }
                >
                  <Option value="static">static</Option>
                  <Option value="relative">relative</Option>
                  <Option value="absolute">absolute</Option>
                  <Option value="sticky">sticky</Option>
                  <Option value="fixed">fixed</Option>
                </Select>
              </div>
            </div>
            <div className="mt-2 ">
              <h6 className="mr-2">Căn chỉnh :</h6>

              <div className="ml-5">
                <div style={{ marginLeft: buttonWidth, whiteSpace: 'nowrap' }}>
                  <InputNumber
                    placeholder="top"
                    value={topButton}
                    style={{ width: 72, textAlign: 'center' }}
                    min={0}
                    max={1500}
                    onChange={(value) => this.onChangeValue(value, 'topButton')}
                  ></InputNumber>
                </div>

                <div style={{ width: buttonWidth, float: 'left' }}>
                  <InputNumber
                    placeholder="left"
                    value={leftButton}
                    style={{ width: 72, textAlign: 'center' }}
                    min={0}
                    max={1500}
                    onChange={(value) =>
                      this.onChangeValue(value, 'leftButton')
                    }
                  ></InputNumber>
                </div>

                <div
                  style={{
                    width: buttonWidth,
                    marginLeft: buttonWidth * 2 + 3,
                  }}
                >
                  <InputNumber
                    placeholder="right"
                    value={rightButton}
                    style={{ width: 72, textAlign: 'center' }}
                    min={0}
                    max={1500}
                    onChange={(value) =>
                      this.onChangeValue(value, 'rightButton')
                    }
                  ></InputNumber>
                </div>

                <div
                  style={{
                    marginLeft: buttonWidth,
                    clear: 'both',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <InputNumber
                    placeholder="bottom"
                    value={bottomButton}
                    style={{ width: 72, textAlign: 'center' }}
                    min={0}
                    max={1500}
                    onChange={(value) =>
                      this.onChangeValue(value, 'bottomButton')
                    }
                  ></InputNumber>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h6>Background Color:</h6>
              <SketchPicker
                className="mx-auto"
                color="red"
                onChangeComplete={(value) =>
                  this.onChangeValue(value.hex, 'backgroundColor')
                }
              />
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // map state of store to props
  session: state.event.session,
  blocks: state.event.blocks,
});

const mapDispatchToProps = (dispatch) => ({
  storeBlocksWhenCreateEvent: (blocks) =>
    dispatch(eventActions.storeBlocksWhenCreateEvent(blocks)),
  deleteBlock: (id) => dispatch(eventActions.deleteBlock(id)),
  duplicateBlock: (id) => dispatch(eventActions.duplicateBlock(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Timer);
