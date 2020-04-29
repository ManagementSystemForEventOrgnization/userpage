import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Radio, DatePicker } from 'antd';

import moment from 'moment';
import { eventActions } from '../../../../../../action/event.action';

const dateFormat = ['YYYY/MM/DD', 'DD/MM/YYYY', 'MM/DD/YYYY'];

class DatepickersBlock extends React.Component {
  constructor(props) {
    super(props);
    const { style } = this.props;
    this.state = style
      ? { ...style }
      : {
          visible: false,
          isDesign: false,
          isButton: false,
          dateFormatList: dateFormat,
        };
  }

  componentDidMount = () => {
    const { editable } = this.props;
    if (editable) {
      this.handleStoreBlock();
    }
    this.setState({
      dateFormatList: dateFormat,
    });
  };

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

  handleCollapse = () => {
    const { isDesign } = this.props;
    this.setState({
      isDesign: !isDesign,
    });
  };

  render() {
    const { dateFormatList, styleFormat, isDesign } = this.state;
    const { editable } = this.props;

    return (
      <div className="edittext child-block">
        <div
          className="mt-2"
          onClick={() => this.onChangeValue(true, 'isDesign')}
        >
          <DatePicker
            format={styleFormat}
            defaultValue={moment('2020/04/08')}
          ></DatePicker>
        </div>
        {editable && (
          <Modal
            title="Datepicker design"
            visible={isDesign}
            onCancel={this.handleCollapse}
            width={500}
            footer={[
              <Button key="ok" onClick={this.handleCollapse} type="primary">
                OK
              </Button>,
            ]}
          >
            {/* list datepicker in modal */}
            <div>
              <Radio.Group
                value={styleFormat}
                onChange={(e) =>
                  this.onChangeValue(e.target.value, 'styleFormat')
                }
              >
                {dateFormatList.map((dateformat, index) => (
                  <Radio value={dateformat} key={index}>
                    <DatePicker
                      key={dateformat}
                      format={dateformat}
                      placeholder={dateFormat}
                    ></DatePicker>
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
export default connect(mapStateToProps, mapDispatchToProps)(DatepickersBlock);
