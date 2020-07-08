import React from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import IconsHandle from '../../shares/IconsHandle';
import { Modal, InputNumber, Tabs, Input, Button } from 'antd';

import PaddingAndMargin from '../../shares/PaddingAndMargin';

import { VideoState } from '../../stateInit/VideoState';
import { eventActions } from 'action/event.action';

const { TabPane } = Tabs;

class Video2 extends React.Component {
  constructor(props) {
    super(props);

    const { style } = this.props;
    this.state = style
      ? { ...style }
      : {
          ...VideoState(this.props),
          isShowNotFound: true,
          txtInput: ' ',
          loop: false,
        };
  }

  // common function
  onChangeValue = (newValue, valueParam) => {
    this.setState({
      [valueParam]: newValue,
    });
  };

  onImageDrop = (event) => {
    this.setState({
      txtInput: event.target.value,
    });
  };

  handleSubmit = () => {
    const { txtInput } = this.state;

    let expression =
      '(?:(?:https?|ftp|file)://|www.|ftp.)(?:([-A-Z0-9+&@#/%=~_|$?!:,.]*)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:([-A-Z0-9+&@#/%=~_|$?!:,.]*)|[A-Z0-9+&@#/%=~_|$])';
    let regex = new RegExp(expression);

    if (txtInput.match(regex)) {
      this.setState({
        uploadedFileCloudinaryUrl: txtInput,
        isShowNotFound: true,
      });
    } else {
      this.setState({ isShowNotFound: false });
    }
  };

  closeModal = () => {
    const { visible, uploadedFileCloudinaryUrl } = this.state;
    this.setState({
      visible: !visible,
      txtInput: uploadedFileCloudinaryUrl,
    });

    this.handleStoreBlock();
  };

  onChangeStyle = (type, value) => {
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
    const { width, height, margin, padding, borderRadius } = this.state;

    return {
      width: `${width}%`,
      height: `${height}vh`,
      marginTop: `${margin[0]}%`,
      marginLeft: `${margin[1]}%`,
      marginRight: `${margin[2]}%`,
      marginBottom: `${margin[3]}%`,
      paddingTop: `${padding[0]}%`,
      paddingLeft: `${padding[1]}%`,
      paddingRight: `${padding[2]}%`,
      paddingBottom: `${padding[3]}%`,
      borderRadius: `${borderRadius}%`,
      maxWidth: '100%',
      maxHeight: '100%',
    };
  };

  render() {
    const {
      uploadedFileCloudinaryUrl,
      width,
      height,
      margin,
      padding,
      isShowNotFound,
      txtInput,
    } = this.state;

    const { leftModal, editable } = this.props;

    const videoStyle = this.getCustomStyle();

    return (
      <div className=" child-block  d-flex">
        {isShowNotFound ? (
          <div style={videoStyle}>
            <ReactPlayer
              url={`https:${uploadedFileCloudinaryUrl}`}
              //   playing={playing}
              controls={true}
              style={videoStyle}
              width="100%"
            />
          </div>
        ) : (
          <div style={{ textAlign: 'center', width: '100%' }}>
            <img
              src="https://res.cloudinary.com/eventinyourhand/image/upload/v1593323532/publics/not-found_ytto2w.jpg"
              alt="not-found"
            />
          </div>
        )}
        {editable && (
          <IconsHandle
            collapseModal={() => this.onChangeValue(true, 'visible')}
            handleDuplicate={this.handleDuplicate}
            handleDelete={this.handleDelete}
          />
        )}
        {editable && (
          <Modal
            title="Edit Video Style"
            visible={this.state.visible}
            onOk={this.closeModal}
            onCancel={this.closeModal}
            width="500px"
            className={
              leftModal ? ' mt-3 float-left ml-5' : 'float-right mr-3 mt-3'
            }
            style={leftModal ? { top: 40, left: 200 } : { top: 40 }}
          >
            <Tabs defaultActiveKey="1">
              <TabPane tab="Upload" key="1">
                <div className="mt-4">
                  <h6>Change url video</h6>
                  <div className="d-flex">
                    <Input value={txtInput} onChange={this.onImageDrop} />
                    <Button type="primary" onClick={this.handleSubmit}>
                      save
                    </Button>
                  </div>
                </div>
              </TabPane>

              <TabPane tab="Design" key="2">
                <div className="d-flex mt-2 ">
                  <div className=" mr-5 d-flex">
                    <h6 className=" mr-2">Width (%)</h6>
                    <InputNumber
                      value={width}
                      className="ml-3"
                      name="width"
                      min={0}
                      max={100}
                      onChange={(value) => this.onChangeStyle('width', value)}
                    ></InputNumber>
                  </div>

                  <div className=" ml-5 d-flex">
                    <h6 className=" mr-2">Height (vh)</h6>
                    <InputNumber
                      value={height}
                      className="ml-3"
                      name="height"
                      min={0}
                      max={1500}
                      onChange={(value) => this.onChangeStyle('height', value)}
                    ></InputNumber>
                  </div>
                </div>

                <PaddingAndMargin
                  margin={margin}
                  padding={padding}
                  handleChangePadding={(value) =>
                    this.onChangeStyle('padding', value)
                  }
                  handleChangeMargin={(value) =>
                    this.onChangeStyle('margin', value)
                  }
                />
              </TabPane>
            </Tabs>
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

export default connect(mapStateToProps, mapDispatchToProps)(Video2);
