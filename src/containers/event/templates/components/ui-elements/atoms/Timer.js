import React from 'react';
import { connect } from 'react-redux';
import { Modal, Select, InputNumber, Button } from 'antd';
import { SketchPicker } from 'react-color';
import { buttonWidth, Option } from '../../../constants/atom.constant';
import { TimerState } from '../stateInit/TimerState';

import { eventActions } from '../../../../../../action/event.action';

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
    const { editable } = this.props;

    this.setState({
      ...this.calculateTimeLeft(),
    });

    if (editable) {
      this.handleStoreBlock();
    }

    this.myInterval = setInterval(() => {
      this.setState((prevState) => ({
        prevState,
        ...this.calculateTimeLeft(),
      }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  calculateTimeLeft = () => {
    const { startCount } = this.props;

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
    this.handleStoreBlock();
  }

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
        };

    return (
      <div className="container" key={this.props.key}>
        <div
          key={key}
          style={divStyle}
          onClick={() => this.onChangeValue(true, 'visible')}
        >
          <div className="row border border-primary ml-0 mr-0">
            <div className="col">
              <h2> {this.state.days} </h2>
              days
            </div>
            <div className="col">
              <h2> {this.state.hours}</h2>
              hours
            </div>
            <div className="col">
              <h2> {this.state.minutes}</h2>
              minutes
            </div>
            <div className="col">
              <h2> {this.state.seconds}</h2>
              seconds
            </div>
          </div>
        </div>
        {editable && (
          <Modal
            title="Text"
            visible={this.state.visible}
            onCancel={() => this.onChangeValue(false, 'visible')}
            width={500}
            className="float-right mr-3 mt-3"
            style={{ top: 40 }}
            footer={[
              <Button
                key="ok"
                onClick={() => this.onChangeValue(false, 'visible')}
                type="primary"
              >
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
  blocks: state.event.blocks,
});

const mapDispatchToProps = (dispatch) => ({
  storeBlocksWhenCreateEvent: (blocks) =>
    dispatch(eventActions.storeBlocksWhenCreateEvent(blocks)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Timer);
