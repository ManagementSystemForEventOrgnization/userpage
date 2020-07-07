import React from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import IconsHandle from '../../shares/IconsHandle';
import { Modal, InputNumber, Tabs } from 'antd';

import PaddingAndMargin from '../../shares/PaddingAndMargin';
import UploadVideo from '../../shares/UploadVideo';
import { VideoState } from '../../stateInit/VideoState';
import { eventActions } from 'action/event.action';

const { TabPane } = Tabs;

class Video1 extends React.Component {
  constructor(props) {
    super(props);
    const { style } = this.props;
    this.state = style
      ? { ...style }
      : {
          ...VideoState(this.props),
        };
  }

  // common function
  onChangeValue(newValue, valueParam) {
    this.setState({
      [valueParam]: newValue,
    });
  }
  onImageDrop = (url) => {
    this.setState({
      uploadedFileCloudinaryUrl: url,
    });
  };

  onVideoProgress = (progress) => {
    this.setState({
      progress,
    });
  };

  closeModal = () => {
    this.setState({
      visible: false,
    });
    this.handleStoreBlock();
  };

  onChangeStyle = (type, value) => {
    this.setState({
      [type]: value,
    });
    setTimeout(this.handleStoreBlock(), 3000);
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
      progress,
    } = this.state;

    const { leftModal, editable, id } = this.props;

    const videoStyle = this.getCustomStyle();

    return (
      <div className=" child-block  d-flex" key={id}>
        <ReactPlayer
          url={`https:${uploadedFileCloudinaryUrl}`}
          controls
          style={videoStyle}
          width="100%"
        />

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
                  <UploadVideo
                    url={uploadedFileCloudinaryUrl}
                    progress={progress}
                    handleProgress={this.onVideoProgress}
                    handleImageDrop={this.onImageDrop}
                  />
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

      // </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Video1);
