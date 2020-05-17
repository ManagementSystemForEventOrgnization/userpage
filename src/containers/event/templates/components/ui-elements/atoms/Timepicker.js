import React from 'react';
import { connect } from 'react-redux';
import { Modal, Radio, TimePicker, Button } from 'antd';

import { eventActions } from '../../../../../../action/event.action';

const timeFormat = ['HH:mm:ss', 'h:mm:ss A', 'h:mm a', 'HH:mm'];

class TimepickersBlock extends React.Component {
  constructor(props) {
    super(props);
    const { style } = this.props;
    this.state = style
      ? { ...style }
      : {
          visible: false,
          isDesign: false,
          isButton: false,
          timeFormatList: timeFormat,
        };
  }

  componentDidMount = () => {
    const { editable } = this.props;
    this.setState({
      timeFormatList: timeFormat,
    });
    if (editable) {
      this.handleStoreBlock();
    }
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  showModalTimepicker = () => {
    this.setState({
      isDesign: true,
    });
  };
  OnClickButton = () => {
    this.setState({
      isButton: true,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancelDesign = (e) => {
    console.log(e);
    this.setState({
      isDesign: false,
    });
  };

  handleShapeChange = (e) => {
    this.setState({
      styleFormat: e.target.value,
    });
    console.log(this.state.styleFormat);
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
    const { timeFormatList, styleFormat } = this.state;

    const { editable } = this.props;

    return (
      <div className=" child-block">
        <div className="mt-2 " onClick={this.showModalTimepicker}>
          <TimePicker format={styleFormat}></TimePicker>
        </div>
        {editable && (
          <Modal
            title="TimePicker design"
            visible={this.state.isDesign}
            onCancel={this.handleCancelDesign}
            width={500}
            footer={[
              <Button key="ok" onClick={this.handleCancelDesign} type="primary">
                OK
              </Button>,
            ]}
          >
            {/* list timepicker in modal */}
            <div>
              <Radio.Group
                value={styleFormat}
                onChange={this.handleShapeChange}
              >
                {timeFormatList.map((timeformat, index) => (
                  <Radio value={timeformat} key={index}>
                    <TimePicker
                      key={timeformat}
                      format={timeformat}
                      placeholder={timeformat}
                    ></TimePicker>
                  </Radio>
                ))}
              </Radio.Group>
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

export default connect(mapStateToProps, mapDispatchToProps)(TimepickersBlock);
