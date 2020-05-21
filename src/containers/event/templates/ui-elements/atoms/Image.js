import React from 'react';
import { connect } from 'react-redux';
import { Modal, InputNumber, Tabs, Slider, Col, Row } from 'antd';

import PaddingAndMargin from '../shares/PaddingAndMargin';
import UploadImage from '../shares/UploadImage';
import { ImageState } from '../stateInit/ImageState';
import { eventActions } from 'action/event.action';

const { TabPane } = Tabs;

class ImageBlock extends React.Component {
  constructor(props) {
    super(props);
    const { style } = this.props;
    this.state = style
      ? { ...style }
      : {
          ...ImageState(this.props),
        };
  }

  componentDidMount = () => {
    const { editable } = this.props;
    if (editable) {
      this.handleStoreBlock();
    }
  };
  // common function
  onChangeValue(newValue, valueParam) {
    this.setState({
      [valueParam]: newValue,
    });
  }

  onImageDrop = (url) => {
    const { handleOnChangeUrlTextBlock } = this.props;
    this.setState({
      uploadedFileCloudinaryUrl: url,
    });
    if (handleOnChangeUrlTextBlock) {
      handleOnChangeUrlTextBlock(this.state.uploadedFileCloudinaryUrl);
    }
    setTimeout(this.handleStoreBlock(), 3000);
  };

  collapseModal = () => {
    const { visible } = this.state;
    this.setState({
      visible: !visible,
    });
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

  render() {
    const {
      uploadedFileCloudinaryUrl,
      width,
      height,
      margin,
      padding,
      borderRadius,
    } = this.state;

    const { leftModal, editable } = this.props;

    const imageStyle = {
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

    return (
      <div className="image-block child-block">
        <img
          style={imageStyle}
          alt="img"
          src={uploadedFileCloudinaryUrl}
          onClick={this.collapseModal}
        />

        {editable && (
          <Modal
            title="Edit Image"
            visible={this.state.visible}
            onOk={this.collapseModal}
            onCancel={this.collapseModal}
            width="500px"
            className={
              leftModal ? ' mt-3 float-left ml-5' : 'float-right mr-3 mt-3'
            }
            style={leftModal ? { top: 40, left: 200 } : { top: 40 }}
          >
            <Tabs defaultActiveKey="1">
              <TabPane tab="Upload" key="1">
                <UploadImage
                  url={uploadedFileCloudinaryUrl}
                  handleImageDrop={this.onImageDrop}
                />
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
                      max={1500}
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

                <div className=" mt-5">
                  <h6 className=" mr-5">Rounded image (%)</h6>
                  <Row>
                    <Col span={12} className="mr-4">
                      <Slider
                        min={0}
                        max={100}
                        onChange={(value) =>
                          this.onChangeStyle('borderRadius', value)
                        }
                        value={
                          typeof borderRadius === 'number' ? borderRadius : 0
                        }
                      />
                    </Col>
                    <Col>
                      <InputNumber
                        value={borderRadius}
                        name="width"
                        min={0}
                        max={100}
                        onChange={(value) =>
                          this.onChangeStyle('borderRadius', value)
                        }
                      ></InputNumber>
                    </Col>
                  </Row>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageBlock);
