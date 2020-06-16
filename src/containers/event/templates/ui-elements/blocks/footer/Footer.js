import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'antd';
import { FooterState } from '../../stateInit/FooterState';
import TextsBlock from '../../atoms/Text';
import ButtonsBlock from '../../atoms/Button';
import IconsHandle from '../../shares/IconsHandle';
import ChangeParentBlockStyle from '../../shares/ChangeParentBlockStyle';
import IconsSocial from '../Social/social';
import { eventActions } from 'action/event.action';

class footer1 extends Component {
  constructor(props) {
    super(props);
    const { style } = this.props;
    this.state = style
      ? { ...style }
      : {
          ...FooterState(this.props),
        };
  }

  openModal = () => this.setState({ collapse: true });
  closeModal = () => {
    this.setState({ collapse: false });
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

  render() {
    const { editable } = this.props;
    const { collapse, padding, url, bgColor, opacity, margin } = this.state;
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
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: bgColor,

      width: '100%',
    };
    const bg = {
      position: 'absolute',
      left: '0',
      top: '0',
      width: '100%',
      height: '100%',
      opacity: opacity,
      backgroundColor: bgColor,
    };
    const titleStyle = {
      color: 'white',
    };

    const styleRow = {
      padding: '6%',
    };

    const styleButton = {
      textAlign: 'left',
      color: 'white',
      borderColor: 'white',
      borderWidth: '0px',
    };

    return (
      <div className="child-block d-flex  " style={{ height: 300 }}>
        <div style={style}>
          {url && <div style={bg}></div>}
          <div className="row  " style={styleRow}>
            <div className="col">
              <TextsBlock
                content="© 2018 All rights reserved."
                child={true}
                newStyle={titleStyle}
              />
            </div>
            <div className="col">
              <TextsBlock
                content="Support 24/7"
                child={true}
                newStyle={titleStyle}
              />
              <span className="mt-3">
                <ButtonsBlock
                  content="+458 669 221"
                  newStyle={styleButton}
                  child={true}
                  editable={editable}
                />
              </span>
            </div>

            <div className="col">
              <TextsBlock
                content="Follow Us"
                child={true}
                newStyle={titleStyle}
              />
              <IconsSocial />
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
  // map state of store to props
  blocks: state.event.blocks,
});

const mapDispatchToProps = (dispatch) => ({
  storeBlocksWhenCreateEvent: (blocks) =>
    dispatch(eventActions.storeBlocksWhenCreateEvent(blocks)),

  deleteBlock: (id) => dispatch(eventActions.deleteBlock(id)),
  duplicateBlock: (id) => dispatch(eventActions.duplicateBlock(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(footer1);
