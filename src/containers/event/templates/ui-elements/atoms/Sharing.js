import React, { Component } from 'react';
import { Select, Modal, Button, Input, InputNumber, Form } from 'antd';
import { connect } from 'react-redux';

import { listIcon, nameIcon, layout } from '../../constants/atom.constant';
import IconsHandle from '../shares/IconsHandle';
import { eventActions } from 'action/event.action';

const { Option } = Select;

class Sharing extends Component {
  constructor(props) {
    super(props);
    const { style } = props;
    this.state = style
      ? { ...style }
      : {
          icons: ['Facebook', 'Email'],
          collapse: false,
          url: 'http://github.com',
          title: 'Github',
          size: 32,
        };
  }

  handleChange = (value) => {
    this.setState({
      icons: value,
    });
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

  onChange = (type, value) => {
    this.setState({
      [type]: value,
    });
  };

  collapseModal = () => {
    const { collapse } = this.state;
    this.setState({
      collapse: !collapse,
    });
  };

  onCloseModal = () => {
    this.setState({
      collapse: false,
    });

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
    const { icons, collapse, title, url, size } = this.state;
    const { editable } = this.props;
    return (
      <div className="child-block">
        <hr />
        <div className="d-flex flex-wrap p-5">
          {icons.map((item, index) => (
            <div className="mr-2 ml-2" key={index}>
              {listIcon[item](url, title, size)}{' '}
            </div>
          ))}

          {editable && (
            <IconsHandle
              collapseModal={this.collapseModal}
              handleDuplicate={this.handleDuplicate}
              handleDelete={this.handleDelete}
            />
          )}
        </div>

        <Modal
          title="Edit Icon List"
          visible={collapse && editable}
          onCancel={this.onCloseModal}
          className=" mt-3 float-left ml-5"
          footer={[
            <Button key="ok" onClick={this.onCloseModal} type="primary">
              OK
            </Button>,
          ]}
        >
          <div>
            <Form
              {...layout}
              initialValues={{
                title: title,
                url: url,
                size: size,
              }}
            >
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  {
                    required: true,
                    message: 'Please input title of url!',
                  },
                ]}
              >
                <Input
                  value={title}
                  name="title"
                  onChange={(e) => this.onChange('title', e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Url"
                name="url"
                rules={[
                  {
                    required: true,
                    message: 'Please input url!',
                  },
                ]}
              >
                <Input
                  value={url}
                  name="url"
                  onChange={(e) => this.onChange('url', e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Size icon"
                name="size"
                rules={[
                  {
                    required: true,
                    message: 'Please input size of icon!',
                  },
                ]}
              >
                <InputNumber
                  value={size}
                  name="size"
                  onChange={(value) => this.onChange('size', value)}
                />
              </Form.Item>

              <Form.Item
                label="Choose Icon"
                name="Icons"
                rules={[
                  {
                    required: true,
                    message: 'Please choose icon!',
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Please select"
                  defaultValue={icons}
                  onChange={this.handleChange}
                >
                  {nameIcon.map((item) => (
                    <Option key={item}>{item}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>

            <hr />
            <div className="d-flex flex-wrap">
              {icons.map((item, index) => (
                <div className="mr-2 ml-2" key={index}>
                  {listIcon[item](url, title, size)}{' '}
                </div>
              ))}
            </div>

            <hr />
          </div>
        </Modal>
        <hr />
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

export default connect(mapStateToProps, mapDispatchToProps)(Sharing);
