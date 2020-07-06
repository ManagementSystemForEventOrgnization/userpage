import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'antd';

import Text from '../../atoms/Text';
import IconsHandle from '../../shares/IconsHandle';
import ChangeParentBlockStyle from '../../shares/ChangeParentBlockStyle';
import { eventActions } from 'action/event.action';

import { EventDescriptionState } from '../../stateInit/EventDescriptionState';

class EventDescription extends Component {
  constructor(props) {
    super(props);
    const { style } = this.props;
    this.state =
      style && Object.keys(style).length > 0
        ? { ...style, collapse: false }
        : {
            ...EventDescriptionState(props),
          };
  }

  collapseModal = () => {
    const { collapse } = this.state;
    this.setState({
      collapse: !collapse,
    });
  };

  openModal = () => this.setState({ collapse: true });
  closeModal = () => {
    this.setState({ collapse: false });
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

  handleChangeContent = (column, type, value) => {
    let { content } = this.state;

    content[column][type] = value;
    this.setState({ content });
    setTimeout(this.handleStoreBlock(), 3000);
  };

  getCustomStyle = () => {
    const { padding, url, bgColor, margin } = this.state;
    const style = {
      marginTop: `${margin[0]}%`,
      marginLeft: `${margin[1]}%`,
      marginRight: `${margin[2]}%`,
      marginBottom: `${margin[3]}%`,
      paddingTop: `${padding[0]}%`,
      paddingLeft: `${padding[1]}%`,
      paddingRight: `${padding[2]}%`,
      paddingBottom: `${padding[3]}%`,

      position: 'relative',
      backgroundImage: url ? `url(${url})` : 'white',
      objectFit: 'cover',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100%',
      backgroundColor: url ? 'none' : bgColor,
    };

    return style;
  };

  getBGCustomStyle = () => {
    const { opacity, bgColor } = this.state;
    const bg = {
      position: 'absolute',
      left: '0',
      top: '0',
      width: '100%',
      height: '100%',
      opacity,
      backgroundColor: bgColor,
    };
    return bg;
  };

  render() {
    const {
      collapse,
      padding,
      url,
      bgColor,
      opacity,
      margin,
      content,
    } = this.state;

    const { type, editable } = this.props;
    const style = this.getCustomStyle();
    const bg = this.getBGCustomStyle();

    return (
      <div className="child-block d-flex">
        <div style={style}>
          {url && <div style={bg}></div>}

          <div className="row">
            <div className={type === 1 ? 'col-sm-6' : 'col-sm-8'}>
              <Text
                child={true}
                content={content.col1.title.value}
                newStyle={content.col1.title.style}
                editable={editable}
                handleChangeContent={(value) =>
                  this.handleChangeContent('col1', 'title', value)
                }
              />
              <Text
                editable={editable}
                child={true}
                content={content.col1.description.value}
                newStyle={content.col1.description.style}
                handleChangeContent={(value) =>
                  this.handleChangeContent('col1', 'description', value)
                }
              />
            </div>
            <div className={type === 1 ? 'col-sm-6' : 'col-sm-4'}>
              <Text
                child={true}
                leftModal={true}
                editable={editable}
                content={content.col2.title.value}
                newStyle={content.col2.title.style}
                handleChangeContent={(value) =>
                  this.handleChangeContent('col2', 'title', value)
                }
              />
              <Text
                leftModal={true}
                child={true}
                editable={editable}
                content={content.col2.description.value}
                newStyle={content.col2.description.style}
                handleChangeContent={(value) =>
                  this.handleChangeContent('col2', 'description', value)
                }
              />
              {type === 3 && (
                <div className="mt-5">
                  <Text
                    child={true}
                    leftModal={true}
                    editable={editable}
                    content={content.col2.subTitle.value}
                    newStyle={content.col2.subTitle.style}
                    handleChangeContent={(value) =>
                      this.handleChangeContent('col2', 'subTitle', value)
                    }
                  />
                  <Text
                    leftModal={true}
                    child={true}
                    editable={editable}
                    content={content.col2.subDescription.value}
                    newStyle={content.col2.subDescription.style}
                    handleChangeContent={(value) =>
                      this.handleChangeContent('col2', 'subDescription', value)
                    }
                  />
                </div>
              )}
            </div>
          </div>
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
            title="Edit Block"
            visible={collapse}
            onCancel={this.closeModal}
            width={500}
            className=" mt-3 float-left ml-5"
            style={{ top: 40, left: 200 }}
            footer={[
              <Button key="ok" onClick={this.closeModal} type="primary">
                OK
              </Button>,
            ]}
          >
            <ChangeParentBlockStyle
              padding={padding}
              margin={margin}
              opacity={opacity}
              bgColor={bgColor}
              url={url}
              handleChangePadding={(value) =>
                this.onChangeStyle('padding', value)
              }
              handleChangeMargin={(value) =>
                this.onChangeStyle('margin', value)
              }
              handleChangeOpacity={(value) =>
                this.onChangeStyle('opacity', value === 10 ? '1' : `0.${value}`)
              }
              handleChangeImage={(value) => this.onChangeStyle('url', value)}
              handleChangeColor={(value) =>
                this.onChangeStyle('bgColor', value)
              }
            />
          </Modal>
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
  duplicateBlock: (id) => dispatch(eventActions.duplicateBlock(id)),
  deleteBlock: (id) => dispatch(eventActions.deleteBlock(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDescription);
