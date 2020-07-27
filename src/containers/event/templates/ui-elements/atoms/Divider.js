import React from 'react';
import { connect } from 'react-redux';
import { Modal, Radio, Divider, Input } from 'antd';
import { orientation } from '../../constants/atom.constant';
import { DividerState } from '../stateInit/DividerState';

import { eventActions } from 'action/event.action';
import IconsHandle from '../shares/IconsHandle';

class DividersBlock extends React.Component {
  constructor(props) {
    super(props);
    const { style } = this.props;

    this.state = style
      ? { ...style, isDesign: false }
      : {
          ...DividerState(orientation),
          content: 'Text',
          isDesign: false,
        };
  }

  openModal = () => this.setState({ isDesign: true });
  closeModal = () => {
    this.setState({ isDesign: false });
    this.handleStoreBlock();
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

  // common function
  onChangeValue(newValue, valueParam) {
    this.setState({
      [valueParam]: newValue,
    });
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
    const { orientationList, styleFormat, content, id } = this.state;
    const { editable } = this.props;

    return (
      <div className=" child-block d-flex" key={id}>
        <div className="mt-2 flex-full">
          <Divider orientation={styleFormat}>{content} </Divider>
        </div>

        {editable && (
          <IconsHandle
            collapseModal={this.openModal}
            handleDuplicate={this.handleDuplicate}
            handleDelete={this.handleDelete}
          />
        )}

        {editable && (
          <Modal
            title="TimePicker design"
            visible={this.state.isDesign}
            onOk={this.closeModal}
            onCancel={this.closeModal}
            width={900}
            footer={[]}
          >
            <div className="d-flex">
              <p className="mr-2">Text of divider : </p>
              <Input
                value={content}
                onChange={(e) => this.onChangeValue(e.target.value, 'content')}
              />
              <hr />
            </div>

            <div>
              <Radio.Group
                value={styleFormat}
                onChange={(e) =>
                  this.onChangeValue(e.target.value, 'styleFormat')
                }
              >
                {orientationList.map((item) => (
                  <Radio value={item} key={item}>
                    <Divider orientation={item}>{content} </Divider>
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
  deleteBlock: (id) => dispatch(eventActions.deleteBlock(id)),
  duplicateBlock: (id) => dispatch(eventActions.duplicateBlock(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DividersBlock);
