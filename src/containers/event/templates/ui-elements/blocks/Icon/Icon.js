/* eslint-disable react/no-array-index-key */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { PlusCircleTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { eventActions } from 'action/event.action';
import IconsHandle from '../../shares/IconsHandle';
import TextsBlock from '../../atoms/Text';
import { SocialState } from '../../stateInit/SocialState';

class IconsSocial extends Component {
  constructor(props) {
    super(props);

    const { style } = this.props;
    this.state = style
      ? { ...style }
      : {
          ...SocialState(this.props),
        };
  }

  componentDidMount = () => {
    const { editable } = this.props;
    if (editable) {
      this.handleStoreBlock();
    }
  };

  showModal = () => {
    const { visible } = this.state;
    this.setState({
      visible: !visible,
    });
  };

  addIcon = (id) => {
    const { IconSocials } = this.state;
    const item = IconSocials.find((ele) => ele.id === id);

    IconSocials.push({
      id: uuid(),
      name: item.name,
      pathLink: item.pathLink,
      options: item.options,
    });
    this.setState({
      IconSocials,
    });
  };

  removeIcon = (id) => {
    let { IconSocials } = this.state;
    IconSocials = IconSocials.filter((ele) => ele.id !== id);
    this.setState({
      IconSocials,
    });
  };

  UpdateLinkIcon = (id, value) => {
    const { IconSocials } = this.state;
    const item = IconSocials.find((ele) => ele.id === id);
    const index = IconSocials.indexOf(item);
    item.pathLink = value;

    if (index === -1) return;

    this.setState({
      IconSocials: [
        ...IconSocials.slice(0, index),
        item,
        ...IconSocials.slice(index + 1, IconSocials.length),
      ],
    });
  };

  handleStoreBlock = () => {
    const { blocks, storeBlocksWhenCreateEvent, id } = this.props;
    const currentStyle = this.state;
    const item = blocks.find((ele) => ele.id === id);
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
    const { editable } = this.props;
    const { IconSocials, visible } = this.state;

    return (
      <div>
        {IconSocials.length !== 0 ? (
          <div className="d-flex child-block social ">
            <div className="child-block" style={{ width: '100%' }}>
              <div className="mt-3">
                {IconSocials.map((item, index) =>
                  item.options({
                    pathLink: item.pathLink,
                    key: index,
                  })
                )}
              </div>
            </div>
            {editable && (
              <IconsHandle
                collapseModal={this.showModal}
                handleDuplicate={this.handleDuplicate}
                handleDelete={this.handleDelete}
              />
            )}
            {editable && (
              <Modal
                title="Social Icon"
                visible={visible}
                onOk={this.showModal}
                onCancel={this.showModal}
              >
                {IconSocials.map((item, index) => (
                  <div className="mt-3" key={index}>
                    <div className="row">
                      <div className="col">{item.name}</div>
                      <div className="col">
                        <PlusCircleTwoTone
                          className="ml-5"
                          onClick={() => this.addIcon(item.id)}
                        />
                        <DeleteTwoTone
                          className="ml-5"
                          onClick={() => this.removeIcon(item.id)}
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <TextsBlock
                        content={item.pathLink}
                        child
                        handleOnChangeTextBlock={(value) =>
                          this.UpdateLinkIcon(item.id, value)
                        }
                      />
                    </div>
                  </div>
                ))}
              </Modal>
            )}
          </div>
        ) : (
          ''
        )}{' '}
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
  deleteBlock: (id) => dispatch(eventActions.deleteBlock(id)),
  duplicateBlock: (id) => dispatch(eventActions.duplicateBlock(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(IconsSocial);
