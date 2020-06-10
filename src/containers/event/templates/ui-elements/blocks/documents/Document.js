import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Button, Divider, List, Drawer, Form, Input } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import { eventActions } from 'action/event.action';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

class Document extends Component {
  constructor(props) {
    super(props);
    const { session } = this.props;
    this.state = {
      session,
      visible: true,
      document: [],
    };
  }

  collapseModal = () => {
    const { visible } = this.state;
    this.setState({
      visible: !visible,
    });
  };

  addDocument = () => {
    const { document, session } = this.state;
    const newSS = {
      id: uuid(),
      document,
      day: `Session ${session.length + 1}`,
    };

    session.push(newSS);
    this.setState({ session, visible: false, document: [] });
  };

  render() {
    const { session } = this.state;
    const numSS = session.length;

    return (
      <div className="child-block">
        {numSS !== 0 ? (
          <div>
            {session.map((ss) => (
              <div key={ss.id}>
                <Divider orientation="left">
                  {moment(ss.day).format('LLL')}
                </Divider>
                <List
                  size="large"
                  // header={<div>Header</div>}
                  // footer={<div>Footer</div>}
                  bordered
                  dataSource={ss.document}
                  renderItem={(item) => (
                    <List.Item>
                      <a href={`${item.title}`}>{item.url}</a>
                    </List.Item>
                  )}
                />
              </div>
            ))}
          </div>
        ) : (
          <p>No link to visit</p>
        )}

        <Button onClick={this.collapseModal}>Add </Button>

        <Drawer
          title="Create a new account"
          width={720}
          onClose={this.collapseModal}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={this.collapseModal} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={this.addDocument} type="primary">
                Done
              </Button>
            </div>
          }
        >
          <Form layout="vertical" name="dynamic_form_item" hideRequiredMark>
            <Form.List name="names">
              {(fields, { add, remove }) => {
                return (
                  <div>
                    {fields.map((field, index) => (
                      <Form.Item
                        {...(index === 0
                          ? formItemLayout
                          : formItemLayoutWithOutLabel)}
                        label={index === 0 ? 'Passengers' : ''}
                        required={false}
                        key={field.key}
                      >
                        <Form.Item
                          {...field}
                          validateTrigger={['onChange', 'onBlur']}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message:
                                "Please input passenger's name or delete this field.",
                            },
                          ]}
                          noStyle
                        >
                          <Input
                            placeholder="passenger name"
                            style={{ width: '60%' }}
                          />
                        </Form.Item>
                        {fields.length > 1 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            style={{ margin: '0 8px' }}
                            onClick={() => {
                              remove(field.name);
                            }}
                          />
                        ) : null}
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                        }}
                        style={{ width: '60%' }}
                      >
                        <PlusOutlined /> Add field
                      </Button>
                    </Form.Item>
                  </div>
                );
              }}
            </Form.List>
          </Form>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  session: state.event.session,
});

const mapDispatchToProps = (dispatch) => ({
  storeBlocksWhenCreateEvent: (blocks) =>
    dispatch(eventActions.storeBlocksWhenCreateEvent(blocks)),
  duplicateBlock: (id) => dispatch(eventActions.duplicateBlock(id)),
  deleteBlock: (id) => dispatch(eventActions.deleteBlock(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Document);
