import React from 'react';
import { connect } from 'react-redux';
import { Modal, Radio, Divider } from 'antd';
import { orientation } from '../../constants/atom.constant';
import { DividerState } from '../stateInit/DividerState';

import { eventActions } from 'action/event.action';

class DividersBlock extends React.Component {
  constructor(props) {
    super(props);
    const { style } = this.props;

    this.state = style
      ? { ...style }
      : {
          ...DividerState(orientation),
        };
  }

  componentDidMount = () => {
    const { editable } = this.props;
    this.setState({
      orientationList: orientation,
    });
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
    const { orientationList, styleFormat } = this.state;
    const { editable } = this.props;

    return (
      <div className=" child-block">
        <div
          className="mt-2"
          onClick={() => this.onChangeValue(true, 'isDesign')}
        >
          <Divider orientation={styleFormat}>Text </Divider>
        </div>

        {editable && (
          <Modal
            title="TimePicker design"
            visible={this.state.isDesign}
            onOk={this.handleOk}
            onCancel={() => this.onChangeValue(false, 'isDesign')}
            width={900}
            footer={[]}
          >
            {/* list timepicker in modal */}
            <div>
              <Radio.Group
                value={styleFormat}
                onChange={(e) =>
                  this.onChangeValue(e.target.value, 'styleFormat')
                }
              >
                {orientationList.map((orienformat) => (
                  <Radio value={orienformat} key={orienformat}>
                    <Divider orientation={orienformat}>{orienformat} </Divider>
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

export default connect(mapStateToProps, mapDispatchToProps)(DividersBlock);
