import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import {
  Button,
  Divider,
  List,
  Drawer,
  Input,
  Tag,
  Modal,
  message,
} from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import moment from 'moment';

import { eventActions } from 'action/event.action';
import IconsHandle from '../../shares/IconsHandle';
import PaddingAndMargin from '../../shares/PaddingAndMargin';
import ChangeColorModal from '../../shares/ChangeColorModal';

class Document extends Component {
  constructor(props) {
    super(props);
    const { session, style } = this.props;
    this.state = style
      ? { ...style, visible: false, collapse: false }
      : {
          session: session.map((ss) => ({ ...ss, open: false })),
          visible: false,
          document: [],
          currentSS: {},
          title: '',
          url: '',
          collapse: false,
          padding: [1, 1, 1, 1],
          margin: [1, 1, 1, 1],
          background: 'none',
        };
  }

  openModal = (id) => {
    const { visible, session } = this.state;
    const item = session.find((ss) => ss.id === id);
    this.setState({
      visible: !visible,
      currentSS: { ...item },
    });
  };

  cancelModal = () => this.setState({ visible: false });

  closeModal = () => {
    this.setState({ visible: false, currentSS: {} });
    this.handleStoreBlock();
  };

  handleClickListItem = (item) => {
    const url = item.upload
      ? process.env.REACT_APP_BASE_URL_DEPLOY + item.url
      : item.url;

    window.open(url, '_blank');
  };

  handleClickSS = (id) => {
    let { session } = this.state;
    const index = session.findIndex((ss) => ss.id === id);
    session[index].open = !session[index].open;
    this.setState({ session });
  };

  handleAddLink = () => {
    const { url, title } = this.state;
    let { currentSS } = this.state;
    const newItem = {
      title,
      url,
      id: uuid(),
    };
    currentSS.documents.push(newItem);
    this.setState({
      currentSS,
      title: '',
      url: '',
    });
  };

  onChangeHandler = (e) => {
    const fileList = e.target.files;
    const files = [];
    if (fileList.length >= 12) {
      message.warn({
        content: 'You cannot upload more than 12 files',
        style: {
          marginTop: '20vh',
          fontSize: '16px',
          fontWeight: 'bold',
        },
      });
    } else {
      let { currentSS } = this.state;

      for (let i = 0; i < fileList.length; i++) {
        files.push(fileList[i]);
      }
      eventActions.uploadFiles(files).then((data) => {
        data.map((item) =>
          currentSS.documents.push({
            id: uuid(),
            url: item.url,
            title: item.title,
            upload: true,
          })
        );
        this.setState({
          currentSS,
        });
      });
    }
  };

  handleChangeInput = (type, value) => {
    this.setState({
      [type]: value,
    });
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

  openModalEdit = () => {
    this.setState({
      collapse: true,
    });
  };

  closeModalEdit = () => {
    this.setState({ collapse: false });
    this.handleStoreBlock();
  };

  handleChangeMargin = (margin) => this.setState({ margin });
  handleChangePadding = (padding) => this.setState({ padding });

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

  getCustomStyle = () => {
    const { margin, padding, background } = this.state;
    return {
      marginTop: `${margin[0]}%`,
      marginLeft: `${margin[1]}%`,
      marginRight: `${margin[2]}%`,
      marginBottom: `${margin[3]}%`,
      paddingTop: `${padding[0]}%`,
      paddingLeft: `${padding[1]}%`,
      paddingRight: `${padding[2]}%`,
      paddingBottom: `${padding[3]}%`,
      background,
    };
  };

  render() {
    const {
      session,
      currentSS,
      title,
      url,
      padding,
      margin,
      collapse,
      background,
    } = this.state;
    const { editable, id } = this.props;

    const style = this.getCustomStyle();

    return (
      <div className="child-block d-flex " style={style} key={id}>
        <div className="mb-2 pl-2 pt-2" style={{ width: '80%' }}>
          {session.map((ss) => (
            <div key={ss.id}>
              <div
                className="d-flex "
                onClick={() => this.handleClickSS(ss.id)}
              >
                <Divider
                  orientation="left"
                  style={{
                    width: '80%',
                  }}
                >
                  Documents of session {moment(ss.day).format('LLL')}
                </Divider>
                {ss.open ? (
                  <UpOutlined
                    className="ml-auto"
                    style={{ fontSize: '25px' }}
                  />
                ) : (
                  <DownOutlined
                    className="ml-auto"
                    style={{ fontSize: '25px' }}
                  />
                )}
              </div>
              {ss.open && (
                <div className="p-5">
                  <List
                    size="small"
                    bordered
                    dataSource={ss.documents}
                    className="pl-5 list-document"
                    renderItem={(item) => (
                      <List.Item
                        key={item.id}
                        className="link-document"
                        onClick={() => this.handleClickListItem(item)}
                      >
                        <Tag
                          color="processing"
                          className="d-flex custom-tag p-2 pl-4"
                        >
                          <h6>{item.title}</h6>
                          {/* <h6>{item.upload ? <a href={`${process.env.REACT_APP_BASE_URL_DEPLOY}${item.url}`} >{item.title}</a> : }</h6> */}
                        </Tag>
                      </List.Item>
                    )}
                  />
                  {editable && (
                    <div className="d-flex justify-content-end mt-2 mb-3 ">
                      <Button
                        onClick={() => this.openModal(ss.id)}
                        type="primary"
                      >
                        Add
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {editable && (
          <IconsHandle
            collapseModal={this.openModalEdit}
            handleDuplicate={this.handleDuplicate}
            handleDelete={this.handleDelete}
          />
        )}
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
              <Button onClick={this.cancelModal} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={this.closeModal} type="primary">
                Done
              </Button>
            </div>
          }
        >
          <div>
            <List
              size="small"
              bordered
              dataSource={currentSS.documents}
              className="pl-5 list-document"
              renderItem={(item) => (
                <List.Item
                  key={item.id}
                  className="link-document"
                  onClick={() => this.handleClickListItem(item)}
                >
                  <Tag
                    color="processing"
                    className="d-flex custom-tag p-2 pl-4"
                  >
                    <h6>{item.title}</h6>
                  </Tag>
                </List.Item>
              )}
            />
            <input
              type="file"
              multiple
              accept="application/pdf"
              className="mt-3"
              onChange={this.onChangeHandler}
            />
            <div className="d-flex   p-5 ">
              <Input
                placeholder="Enter title of document"
                className="mr-2"
                value={title}
                onChange={(e) =>
                  this.handleChangeInput('title', e.target.value)
                }
              />
              <Input
                placeholder="Enter url to document"
                className="mr-2"
                value={url}
                onChange={(e) => this.handleChangeInput('url', e.target.value)}
              />
              <Button
                type="dashed"
                className="mr-2"
                disabled={!title.trim() && !url}
                onClick={this.handleAddLink}
              >
                Add
              </Button>
            </div>
          </div>
        </Drawer>

        <Modal
          title="Edit Block"
          visible={collapse}
          onCancel={this.closeModalEdit}
          width={500}
          className=" mt-3 float-left ml-5"
          style={{ top: 40, left: 200 }}
          footer={[
            <Button key="ok" onClick={this.closeModalEdit} type="primary">
              OK
            </Button>,
          ]}
        >
          <PaddingAndMargin
            padding={padding}
            margin={margin}
            handleChangePadding={this.handleChangePadding}
            handleChangeMargin={this.handleChangeMargin}
          />

          <hr className="mt-2 mb-2" />
          <ChangeColorModal
            title="Change Background Color"
            color={background}
            handleChangeColor={(value) =>
              this.handleChangeInput('background', value)
            }
          />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  session: state.event.session,
  blocks: state.event.blocks,
});

const mapDispatchToProps = (dispatch) => ({
  storeBlocksWhenCreateEvent: (blocks) =>
    dispatch(eventActions.storeBlocksWhenCreateEvent(blocks)),
  duplicateBlock: (id) => dispatch(eventActions.duplicateBlock(id)),
  deleteBlock: (id) => dispatch(eventActions.deleteBlock(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Document);
