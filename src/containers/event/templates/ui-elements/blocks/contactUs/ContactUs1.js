import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';

import Text from '../../atoms/Text';
import { eventActions } from 'action/event.action';
import IconsHandle from '../../shares/IconsHandle';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 14,
    span: 10,
  },
};

class ContactUs1 extends Component {
  constructor(props) {
    super(props);
    const { style } = this.props;
    this.state = style
      ? { ...style }
      : {
          margin: [1, 1, 1, 1],
          padding: [1, 1, 1, 1],
        };
  }

  componentDidMount = () => {
    const { editable } = this.props;
    if (editable) {
      this.handleStoreBlock();
    }
  };
  onFinish = (values) => {};

  onFinishFailed = (errorInfo) => {};

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
    const { editable } = this.props;
    const { margin, padding } = this.state;
    const style = {
      marginTop: `${margin[0]}%`,
      marginLeft: `${margin[1]}%`,
      marginRight: `${margin[2]}%`,
      marginBottom: `${margin[3]}%`,
      paddingTop: `${padding[0]}%`,
      paddingLeft: `${padding[1]}%`,
      paddingRight: `${padding[2]}%`,
      paddingBottom: `${padding[3]}%`,
    };

    const titleStyle = {
      fontWeight: 'bolder',
      fontSize: '40',
    };
    return (
      <div className="child-block d-flex" style={style}>
        <div className="row flex-fill">
          <div className="col-sm-5">
            <Text
              content="Contact Us"
              newStyle={titleStyle}
              child={true}
              editable={editable}
            />
            <Text editable={editable} child={true} />
          </div>

          <div className=" col-sm-7 pt-5 pr-5">
            <Form
              {...layout}
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
            >
              <Form.Item
                label="Fullname"
                name="fullname"
                rules={[
                  {
                    required: true,
                    message: 'Please input your name!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Content"
                name="content"
                rules={[
                  {
                    required: true,
                    message: 'Please input content!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Send
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        {editable && (
          <div className="ml-auto">
            <IconsHandle
              collapseModal={this.collapseModal}
              handleDuplicate={this.handleDuplicate}
              handleDelete={this.handleDelete}
            />
          </div>
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
  deleteBlock: (id) => dispatch(eventActions.deleteBlock(id)),
  duplicateBlock: (id) => dispatch(eventActions.duplicateBlock(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs1);
